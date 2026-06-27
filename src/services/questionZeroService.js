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
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/*
|--------------------------------------------------------------------------
| Current Question
|--------------------------------------------------------------------------
*/

export async function getCurrentQuestion() {
  const ref = doc(db, "q0", "current");

  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
}

/*
|--------------------------------------------------------------------------
| Has User Answered?
|--------------------------------------------------------------------------
*/

export async function hasAnswered(uid, questionId) {
  const answerRef = doc(
    db,
    "q0Answers",
    `${questionId}_${uid}`
  );

  const snap = await getDoc(answerRef);

  return snap.exists();
}

/*
|--------------------------------------------------------------------------
| Submit Answer
|--------------------------------------------------------------------------
*/

export async function submitAnswer({
  uid,
  username,
  profilePic,
  answer,
  questionId,
}) {
  const answerRef = doc(
    db,
    "q0Answers",
    `${questionId}_${uid}`
  );

  await setDoc(answerRef, {
    uid,
    username,
    profilePic: profilePic || "",
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

/*
|--------------------------------------------------------------------------
| Edit Answer
|--------------------------------------------------------------------------
*/

export async function updateAnswer(
  uid,
  questionId,
  answer
) {
  const ref = doc(
    db,
    "q0Answers",
    `${questionId}_${uid}`
  );

  await updateDoc(ref, {
    answer,
    editedAt: serverTimestamp(),
  });
}

/*
|--------------------------------------------------------------------------
| Get Community Answers
|--------------------------------------------------------------------------
*/

export async function getAnswers(
  questionId
) {
  const q = query(
    collection(db, "q0Answers"),
    where(
      "questionId",
      "==",
      questionId
    ),
    orderBy(
      "meCount",
      "desc"
    )
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data(),
    })
  );
}

/*
|--------------------------------------------------------------------------
| Toggle ME
|--------------------------------------------------------------------------
*/

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
  } else {
    await updateDoc(ref, {
      meCount: increment(1),
      meBy: arrayUnion(uid),
    });
  }
}