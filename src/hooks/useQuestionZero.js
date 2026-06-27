import { useCallback, useEffect, useState } from "react";

import { auth } from "../firebase/firebase";

import {
  getCurrentQuestion,
  getAnswers,
  hasAnswered,
  submitAnswer,
  updateAnswer,
  toggleMe,
} from "../services/questionZeroService";

export default function useQuestionZero() {
  const uid = auth.currentUser?.uid || "";

  const [question, setQuestion] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [myAnswer, setMyAnswer] = useState("");

  const [answered, setAnswered] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    const current =
      await getCurrentQuestion();

    if (!current) {
      setLoading(false);
      return;
    }

    setQuestion(current);

    const already =
      await hasAnswered(
        uid,
        current.currentQuestionId
      );

    setAnswered(already);

    if (already) {
      const { answers } =
  await getAnswers(
    current.currentQuestionId
  );

setAnswers(answers);

      const mine =
        list.find(
          (item) =>
            item.uid === uid
        );

      if (mine) {
        setMyAnswer(
          mine.answer
        );
      }
    }

    setLoading(false);
  }, [uid]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(value) {
    if (!question) return;

    setSaving(true);

    await submitAnswer({
      uid,

      username:
        auth.currentUser
          ?.displayName ||
        "User",

      profilePic:
        auth.currentUser
          ?.photoURL || "",

      answer: value,

      questionId:
        question.currentQuestionId,
    });

    await load();

    setSaving(false);
  }

  async function edit(value) {
    if (!question) return;

    setSaving(true);

    await updateAnswer(
      uid,
      question.currentQuestionId,
      value
    );

    await load();

    setSaving(false);
  }

  async function react(answer) {
    const already =
      answer.meBy?.includes(uid);

    await toggleMe({
      answerId: answer.id,

      uid,

      alreadyMe: already,
    });

    const { answers } =
  await getAnswers(
    question.currentQuestionId
  );

setAnswers(answers);
  }

  return {
    question,

    answers,

    answered,

    myAnswer,

    loading,

    saving,

    submit,

    edit,

    react,

    refresh: load,
  };
}