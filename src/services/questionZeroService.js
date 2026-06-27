import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* -------------------------------------------------------------------------- */
/*                               Helper Methods                               */
/* -------------------------------------------------------------------------- */

export function answerDocumentId(questionId, uid) {
  return `${questionId}_${uid}`;
}

export function getRemainingTime() {
  const now = new Date();

  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight - now;

  return {
    hours: Math.floor(diff / 1000 / 60 / 60),
    minutes: Math.floor((diff / 1000 / 60) % 60),
  };
}

/* -------------------------------------------------------------------------- */
/*                            Current Question                                */
/* -------------------------------------------------------------------------- */

export async function getCurrentQuestion() {
  const ref = doc(db, "q0", "current");

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

/* -------------------------------------------------------------------------- */
/*                           Has User Answered                                */
/* -------------------------------------------------------------------------- */

export async function hasAnswered(uid, questionId) {
  const ref = doc(
    db,
    "q0Answers",
    answerDocumentId(questionId, uid)
  );

  const snap = await getDoc(ref);

  return snap.exists();
}

/* -------------------------------------------------------------------------- */
/*                              Submit Answer                                 */
/* -------------------------------------------------------------------------- */

export async function submitAnswer({
  uid,
  username,
  profilePic = "",
  answer,
  questionId,
}) {
  const ref = doc(
    db,
    "q0Answers",
    answerDocumentId(questionId, uid)
  );

  await setDoc(ref, {
    uid,
    username,
    profilePic,

    answer,

    questionId,

    meCount: 0,
    meBy: [],

    createdAt: serverTimestamp(),
    editedAt: serverTimestamp(),
  });

  await updateDoc(
    doc(db, "q0", "current"),
    {
      answerCount: increment(1),
    }
  );
}

/* -------------------------------------------------------------------------- */
/*                               Edit Answer                                  */
/* -------------------------------------------------------------------------- */

export async function updateAnswer(
  uid,
  questionId,
  answer
) {
  const ref = doc(
    db,
    "q0Answers",
    answerDocumentId(questionId, uid)
  );

  await updateDoc(ref, {
    answer,
    editedAt: serverTimestamp(),
  });
}

/* -------------------------------------------------------------------------- */
/*                             Community Answers                             */
/* -------------------------------------------------------------------------- */

export async function getAnswers(
  questionId,
  lastVisible = null
) {
  let q;

  if (lastVisible) {
    q = query(
      collection(db, "q0Answers"),
      where(
        "questionId",
        "==",
        questionId
      ),
      orderBy("meCount", "desc"),
      startAfter(lastVisible),
      limit(20)
    );
  } else {
    q = query(
      collection(db, "q0Answers"),
      where(
        "questionId",
        "==",
        questionId
      ),
      orderBy("meCount", "desc"),
      limit(20)
    );
  }

  const snapshot = await getDocs(q);

  return {
    answers: snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),

    lastDoc:
      snapshot.docs.length > 0
        ? snapshot.docs[
            snapshot.docs.length - 1
          ]
        : null,
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Toggle ME                                  */
/* -------------------------------------------------------------------------- */

export async function toggleMe({
  answerId,
  uid,
  alreadyMe,
}) {
  const ref = doc(
    db,
    "q0Answers",
    answerId
  );

  if (alreadyMe) {
    await updateDoc(ref, {
      meCount: increment(-1),
      meBy: arrayRemove(uid),
    });

    return;
  }

  await updateDoc(ref, {
    meCount: increment(1),
    meBy: arrayUnion(uid),
  });
}