import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  MessageSquareQuote,
  UsersRound,
  Clock3,
} from "lucide-react";
import {
  getCurrentQuestion,
  getRemainingTime,
  hasAnswered,
} from "../../services/questionZeroService";

import { auth } from "../../firebase/firebase";
function formatAnswerCount(count) {
  return `${count || 0} answered`;
}

function formatTimeLeft(time) {
  return `${time.hours}h ${time.minutes}m left`;
}



export default function QuestionZeroCard({ setCurrentTab }) {
  const [question, setQuestion] = useState(null);
const [answeredToday, setAnsweredToday] = useState(false);
const [time, setTime] = useState(getRemainingTime());
  useEffect(() => {
    loadQuestion();

    const interval = setInterval(() => {
      setTime(getRemainingTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadQuestion() {
  const q = await getCurrentQuestion();

  if (!q) return;

  setQuestion(q);

  const uid = auth.currentUser?.uid;

  if (uid) {
    const answered = await hasAnswered(
      uid,
      q.currentQuestionId
    );

    setAnsweredToday(answered);
  }
}

  if (!question) return null;


  return (
    <motion.button
      type="button"
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 360,
        damping: 28,
      }}
      onClick={() => setCurrentTab("questionZero")}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-[36px]
        border
        border-white/12
        bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.045)_46%,rgba(168,85,247,0.08))]
        p-7
        text-left
        shadow-[0_24px_80px_rgba(0,0,0,0.24)]
        backdrop-blur-2xl
        transition
        duration-300
        hover:border-cyan-200/20
        hover:shadow-[0_28px_90px_rgba(34,211,238,0.16)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-cyan-300/70
        focus-visible:ring-offset-2
        focus-visible:ring-offset-zinc-950
        sm:p-8
      "
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/14 blur-[96px] transition duration-300 group-hover:bg-cyan-300/20" />
      <div className="pointer-events-none absolute -bottom-28 left-8 h-56 w-56 rounded-full bg-fuchsia-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-70" />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-[22px]
                border
                border-white/12
                bg-white/[0.08]
                text-cyan-200
                shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_36px_rgba(0,0,0,0.18)]
                backdrop-blur-xl
              "
            >
              <MessageSquareQuote size={26} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
                Question Zero
              </p>

              <p className="mt-2 text-[15px] font-semibold text-zinc-300">
                Today's Conversation
              </p>
            </div>
          </div>

          <ChevronRight
            size={22}
            strokeWidth={2.4}
            className="
              mt-4
              shrink-0
              text-zinc-500
              transition
              duration-300
              group-hover:translate-x-0.5
              group-hover:text-white
            "
          />
        </div>

        <h2
          className="
            mt-9
            max-w-3xl
            text-[28px]
            font-black
            leading-[1.12]
            tracking-normal
            text-white
            sm:text-[34px]
            sm:leading-[1.08]
          "
        >
          {question.question}
        </h2>

        <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-4
                py-2.5
                text-sm
                font-bold
                text-zinc-200
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                backdrop-blur-xl
              "
            >
              <UsersRound size={16} strokeWidth={2.3} className="text-cyan-200" />
              {formatAnswerCount(question.answerCount)}
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.07]
                px-4
                py-2.5
                text-sm
                font-bold
                text-zinc-200
                shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                backdrop-blur-xl
              "
            >
              <Clock3 size={16} strokeWidth={2.3} className="text-cyan-200" />
              {formatTimeLeft(time)}
            </span>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            {answeredToday && (
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-100">
                <Check size={16} strokeWidth={2.6} />
                You've answered today
              </span>
            )}

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-cyan-300
                px-5
                py-3
                text-sm
                font-black
                text-zinc-950
                shadow-[0_14px_40px_rgba(34,211,238,0.28)]
                transition
                duration-300
                group-hover:bg-cyan-200
              "
            >
              {answeredToday ? "View Community" : "Answer Now"}
              <ChevronRight size={17} strokeWidth={2.8} />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}