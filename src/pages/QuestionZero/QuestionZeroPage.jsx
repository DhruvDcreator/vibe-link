import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/firebase";

import QuestionHeader from "../../components/q0/QuestionHeader";
import AnswerComposer from "../../components/q0/AnswerComposer";
import AnswerList from "../../components/q0/AnswerList";
import UserPreview from "../../components/q0/UserPreview";

import {
  getCurrentQuestion,
  getAnswers,
  submitAnswer,
  updateAnswer,
  toggleMe,
  hasAnswered,
} from "../../services/questionZeroService";

export default function QuestionZeroPage({
  setCurrentTab,
}) {
  const currentUser = auth.currentUser;

  const uid = currentUser?.uid || "";

  const [question, setQuestion] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [answered, setAnswered] = useState(false);

  const [editing, setEditing] = useState(false);

  const [myAnswer, setMyAnswer] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);

  const [previewUser, setPreviewUser] = useState(null);

  const [expiresText, setExpiresText] =
    useState("24h");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    const q =
      await getCurrentQuestion();

    if (!q) {
      setLoading(false);
      return;
    }

    setQuestion(q);

    const already =
      await hasAnswered(
        uid,
        q.currentQuestionId
      );

    setAnswered(already);

    if (already) {
      const { answers } =
  await getAnswers(
    q.currentQuestionId
  );

setAnswers(answers);

      const mine =
        list.find(
          (a) => a.uid === uid
        );

      if (mine) {
        setMyAnswer(
          mine.answer
        );
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    const interval =
      setInterval(() => {
        const now =
          new Date();

        const midnight =
          new Date();

        midnight.setHours(
          24,
          0,
          0,
          0
        );

        const diff =
          midnight - now;

        const hrs =
          Math.floor(
            diff /
              1000 /
              60 /
              60
          );

        const mins =
          Math.floor(
            (diff /
              1000 /
              60) %
              60
          );

        setExpiresText(
          `${hrs}h ${mins}m`
        );
      }, 30000);

    return () =>
      clearInterval(
        interval
      );
  }, []);

  async function handleSubmit(
    value
  ) {
    if (!question) return;

    setSaving(true);

    if (!answered) {
      await submitAnswer({
        uid,

        username:
          currentUser.displayName ||
          "User",

        profilePic:
          currentUser.photoURL ||
          "",

        answer: value,

        questionId:
          question.currentQuestionId,
      });

      setAnswered(true);
    } else {
      await updateAnswer(
        uid,
        question.currentQuestionId,
        value
      );

      setEditing(false);
    }

    await load();

    setSaving(false);
  }

  async function handleToggleMe(
    answer
  ) {
    const already =
      Array.isArray(
        answer.meBy
      ) &&
      answer.meBy.includes(
        uid
      );

    await toggleMe({
      answerId:
        answer.id,

      uid,

      alreadyMe:
        already,
    });

    const { answers } =
  await getAnswers(
    question.currentQuestionId
  );

setAnswers(answers);
  }

  function openPreview(
    user
  ) {
    setPreviewUser(user);

    setPreviewOpen(true);
  }

  function closePreview() {
    setPreviewOpen(false);
  }
    const answerCount = useMemo(() => {
    if (question?.answerCount != null) {
      return question.answerCount;
    }

    return answers.length;
  }, [question, answers]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-[#03040A] flex items-center justify-center text-white">
        Loading Question Zero...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-dvh bg-[#03040A] flex items-center justify-center text-white">
        Question unavailable.
      </div>
    );
  }

  return (
    <>
      <div className="min-h-dvh bg-[#03040A] text-white">

        <main
          className="mx-auto max-w-3xl px-4 pb-32"
          style={{
            paddingTop:
              "max(18px, env(safe-area-inset-top))",
          }}
        >

          <QuestionHeader
            question={question.question}
            answerCount={answerCount}
            expiresText={expiresText}
            onBack={() => setCurrentTab("home")}
          />

          <div className="mt-8">

            {(!answered || editing) && (
              <AnswerComposer
                initialValue={myAnswer}
                editing={editing}
                loading={saving}
                onSubmit={handleSubmit}
              />
            )}

            {answered && !editing && (

              <div
                className="
                rounded-[28px]
                border
                border-cyan-400/20
                bg-cyan-400/10
                p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-black">
                      Your Answer
                    </p>

                    <p className="mt-3 text-zinc-200 whitespace-pre-wrap leading-7">
                      {myAnswer}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setEditing(true)
                    }
                    className="
                    rounded-full
                    bg-white/10
                    px-4
                    py-2
                    text-sm
                    font-black
                    "
                  >
                    Edit
                  </button>

                </div>

              </div>

            )}

          </div>

          {answered && (

            <div className="mt-10">

              <AnswerList
                answers={answers}
                loading={loading}
                currentUid={uid}
                onUserClick={openPreview}
                onToggleMe={handleToggleMe}
              />

            </div>

          )}

        </main>

      </div>

      <UserPreview
        open={previewOpen}
        user={previewUser}
        commonVibes={
          previewUser?.commonVibes || []
        }
        commonGround={[
          "Answered today's Question Zero",
          "Share similar vibes",
        ]}
        onClose={closePreview}
        onChat={() => {}}
        onGame={() => {}}
        onProfile={() => {}}
      />
    </>
  );
}