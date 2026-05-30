// src/services/vibeHomeFirestore.js

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  DAILY_TASK_DURATION_MS,
  DAILY_TASK_REWARD,
  DAILY_TASKS,
} from "../data/dailyTasks";

export const FALLBACK_PROFILE = "https://i.pravatar.cc/300";

export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function flattenVibes(vibes) {
  if (!vibes) return [];

  const values = Array.isArray(vibes)
    ? vibes
    : typeof vibes === "object"
      ? Object.values(vibes)
      : [];

  const flattened = [];

  values.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string" && item.trim()) flattened.push(item.trim());
      });
    } else if (typeof value === "string" && value.trim()) {
      flattened.push(value.trim());
    }
  });

  return [...new Set(flattened)];
}

export function calculateCompatibility(myVibes, otherVibes) {
  const mine = safeArray(myVibes);
  const theirs = flattenVibes(otherVibes);

  if (mine.length === 0 || theirs.length === 0) return 0;

  const shared = theirs.filter((vibe) => mine.includes(vibe));
  return Math.min(100, Math.round((shared.length / mine.length) * 100));
}

function shuffle(values) {
  const result = [...safeArray(values)];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function taskById(taskId) {
  return DAILY_TASKS.find((task) => task.id === taskId) || null;
}

function normalizeTaskState(data) {
  const taskIds = safeArray(data?.activeTaskIds);
  const counters = data?.counters && typeof data.counters === "object" ? data.counters : {};
  const completedIds = safeArray(data?.completedTaskIds);
  const cycleCompletedIds = safeArray(data?.cycleCompletedTaskIds);

  return {
    taskIds,
    counters,
    completedIds,
    cycleCompletedIds,
    rewardClaimed: Boolean(data?.rewardClaimed),
    issuedAt: data?.issuedAt || null,
  };
}

function hydrateTasks(state) {
  return state.taskIds
    .map((taskId) => taskById(taskId))
    .filter(Boolean)
    .map((task) => {
      const progress = Math.min(task.target, Number(state.counters?.[task.type] || 0));

      return {
        ...task,
        progress,
        completed: state.completedIds.includes(task.id) || progress >= task.target,
      };
    });
}

export async function loadDailyTasks(uid) {
  if (!uid) return { tasks: [], rewardClaimed: false };

  const progressRef = doc(db, "taskProgress", uid);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    const data = snapshot.exists() ? snapshot.data() || {} : {};
    const state = normalizeTaskState(data);
    const issuedAtMs = state.issuedAt?.toMillis?.() || 0;
    const shouldRotate =
      state.taskIds.length !== 2 ||
      !issuedAtMs ||
      Date.now() - issuedAtMs >= DAILY_TASK_DURATION_MS;

    if (!shouldRotate) return;

    let cycleCompletedIds = [...state.cycleCompletedIds];

    if (cycleCompletedIds.length >= DAILY_TASKS.length) {
      cycleCompletedIds = [];
    }

    let remaining = DAILY_TASKS.filter(
      (task) => !cycleCompletedIds.includes(task.id)
    );

    if (remaining.length < 2) {
      cycleCompletedIds = [];
      remaining = [...DAILY_TASKS];
    }

    const nextTasks = shuffle(remaining).slice(0, 2);

    transaction.set(
      progressRef,
      {
        activeTaskIds: nextTasks.map((task) => task.id),
        completedTaskIds: [],
        counters: {},
        cycleCompletedTaskIds: cycleCompletedIds,
        rewardClaimed: false,
        issuedAt: Timestamp.now(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });

  const snapshot = await getDoc(progressRef);
  const state = normalizeTaskState(snapshot.data() || {});

  return {
    tasks: hydrateTasks(state),
    rewardClaimed: state.rewardClaimed,
  };
}

export async function recordTaskEvent(uid, eventType, amount = 1) {
  if (!uid || !eventType) return;

  const progressRef = doc(db, "taskProgress", uid);
  const userRef = doc(db, "users", uid);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(progressRef);
    if (!snapshot.exists()) return;

    const data = snapshot.data() || {};
    const state = normalizeTaskState(data);
    const counters = { ...state.counters };
    counters[eventType] = Number(counters[eventType] || 0) + Math.max(1, Number(amount) || 1);

    const activeTasks = state.taskIds.map(taskById).filter(Boolean);
    const completedIds = activeTasks
      .filter((task) => Number(counters[task.type] || 0) >= task.target)
      .map((task) => task.id);

    const allComplete = activeTasks.length === 2 && completedIds.length === 2;
    const shouldReward = allComplete && !state.rewardClaimed;

    transaction.set(
      progressRef,
      {
        counters,
        completedTaskIds: completedIds,
        cycleCompletedTaskIds: arrayUnion(...completedIds),
        rewardClaimed: shouldReward ? true : state.rewardClaimed,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    if (shouldReward) {
      transaction.set(
        userRef,
        {
          points: increment(DAILY_TASK_REWARD),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  });
}

export async function loadStories(uid, userVibes) {
  if (!uid) return [];

  const categories = flattenVibes(userVibes).slice(0, 10);
  const storiesQuery =
    categories.length > 0
      ? query(
          collection(db, "stories"),
          where("category", "in", categories),
          where("expiresAt", ">", Timestamp.now()),
          orderBy("expiresAt", "asc"),
          limit(20)
        )
      : query(
          collection(db, "stories"),
          where("expiresAt", ">", Timestamp.now()),
          orderBy("expiresAt", "asc"),
          limit(20)
        );

  const [storySnapshot, viewsSnapshot] = await Promise.all([
    getDocs(storiesQuery),
    getDocs(query(collection(db, "storyViews"), where("viewerId", "==", uid))),
  ]);

  const viewedStoryIds = new Set();

  viewsSnapshot.forEach((item) => {
    const storyId = item.data()?.storyId;
    if (storyId) viewedStoryIds.add(storyId);
  });

  return storySnapshot.docs
    .map((item) => ({
      id: item.id,
      ...(item.data() || {}),
      watched: viewedStoryIds.has(item.id),
    }))
    .slice(0, 4);
}

export async function markStoryViewed(uid, storyId) {
  if (!uid || !storyId) return;

  await setDoc(
    doc(db, "storyViews", `${storyId}_${uid}`),
    {
      storyId,
      viewerId: uid,
      viewedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await recordTaskEvent(uid, "storiesViewed");
}

export async function createStory(uid, story) {
  if (!uid || !story?.category || !story?.type) return;

  const allowedTypes = ["photo", "poll", "question", "meme", "video"];

  if (!allowedTypes.includes(story.type)) {
    throw new Error("Unsupported story type");
  }

  await addDoc(collection(db, "stories"), {
    ownerId: uid,
    category: story.category,
    type: story.type,
    caption: String(story.caption || "").slice(0, 220),
    mediaUrl: String(story.mediaUrl || ""),
    pollOptions: safeArray(story.pollOptions).slice(0, 4),
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromMillis(Date.now() + DAILY_TASK_DURATION_MS),
  });

  await recordTaskEvent(uid, "stories");
  await recordTaskEvent(uid, `${story.type}Stories`);
}

export async function createAnonymousRoom(uid) {
  if (!uid) throw new Error("Authentication required");

  const roomRef = await addDoc(collection(db, "anonymousRooms"), {
    participantIds: [uid],
    status: "waiting",
    revealConsentIds: [],
    durationSeconds: 180,
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromMillis(Date.now() + 3 * 60 * 1000),
  });

  await recordTaskEvent(uid, "anonymousStarted");

  return roomRef.id;
}

export async function revealAnonymousProfile(roomId, uid) {
  if (!roomId || !uid) return;

  await updateDoc(doc(db, "anonymousRooms", roomId), {
    revealConsentIds: arrayUnion(uid),
    updatedAt: serverTimestamp(),
  });
}

export async function loadRouletteUsers(uid, category) {
  if (!uid || !category) return [];

  const snapshot = await getDocs(
    query(
      collection(db, "users"),
      where("vibes.interests", "array-contains", category),
      limit(16)
    )
  );

  return snapshot.docs
    .filter((item) => item.id !== uid)
    .map((item) => ({ id: item.id, ...(item.data() || {}) }));
}

export async function saveRouletteSpin(uid, category, selectedUserId) {
  if (!uid || !category) return;

  await addDoc(collection(db, "rouletteHistory"), {
    userId: uid,
    category,
    selectedUserId: selectedUserId || null,
    createdAt: serverTimestamp(),
  });

  await recordTaskEvent(uid, "rouletteSpins");
  await recordTaskEvent(uid, `${category.toLowerCase()}Spins`);
}

export async function loadPins(uid) {
  if (!uid) return { people: [], tribes: [] };

  const [peopleSnapshot, tribesSnapshot] = await Promise.all([
    getDoc(doc(db, "pinnedPeople", uid)),
    getDoc(doc(db, "pinnedTribes", uid)),
  ]);

  return {
    people: safeArray(peopleSnapshot.data()?.items).slice(0, 2),
    tribes: safeArray(tribesSnapshot.data()?.items).slice(0, 2),
  };
}

export async function savePins(uid, type, items) {
  if (!uid || !["people", "tribes"].includes(type)) return;

  const collectionName = type === "people" ? "pinnedPeople" : "pinnedTribes";

  await setDoc(
    doc(db, collectionName, uid),
    {
      items: safeArray(items).slice(0, 2),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await recordTaskEvent(uid, type === "people" ? "peoplePinned" : "tribesPinned");
}

export async function loadLeaderboard(uid, metric = "points") {
  if (!uid) return { topUsers: [], currentUser: null, rank: null };

  const safeMetric = ["tribeBuilderPoints", "points", "streak"].includes(metric)
    ? metric
    : "points";

  const snapshot = await getDocs(
    query(collection(db, "users"), orderBy(safeMetric, "desc"), limit(100))
  );

  const users = snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() || {}),
  }));

  const rankIndex = users.findIndex((user) => user.id === uid);

  return {
    topUsers: users.slice(0, 3),
    currentUser: rankIndex >= 0 ? users[rankIndex] : null,
    rank: rankIndex >= 0 ? rankIndex + 1 : null,
  };
}