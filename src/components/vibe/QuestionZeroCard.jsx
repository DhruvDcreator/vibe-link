import { motion } from "framer-motion";
import { Globe2, ChevronRight } from "lucide-react";
import useQuestionZero from "../../hooks/useQuestionZero";

export default function QuestionZeroCard({ onOpen }) {
  const {
    question,
    loading,
    error,
  } = useQuestionZero();

  function getTimeRemaining() {
    if (!question?.expiresAt) return "";

    const expiry =
      question.expiresAt.toDate();

    const diff =
      expiry.getTime() -
      Date.now();

    if (diff <= 0)
      return "Expired";

    const hours = Math.floor(
      diff / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (diff %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );

    return `${hours}h ${minutes}m left`;
  }

  if (loading) {
    return (
      <div className="animate-pulse rounded-[30px] border border-white/10 bg-white/[0.05] p-6">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-5 h-7 w-full rounded bg-white/10" />
        <div className="mt-3 h-7 w-2/3 rounded bg-white/10" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[30px] border border-red-400/20 bg-red-500/10 p-6">
        <p className="font-bold text-red-200">
          {error}
        </p>
      </div>
    );
  }

  return (
    <motion.button
      whileTap={{
        scale: 0.985,
      }}
      whileHover={{
        scale: 1.01,
      }}
      onClick={onOpen}
      className="
      relative
      w-full
      overflow-hidden
      rounded-[32px]
      border
      border-cyan-300/10
      bg-white/[0.05]
      p-6
      text-left
      backdrop-blur-2xl
      "
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-500/15 blur-[80px]" />

      <div className="relative">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Globe2 size={22} />
          </div>

          <div>

            <p className="text-xs font-black tracking-[0.18em] text-cyan-300">
              QUESTION ZERO
            </p>

            <p className="mt-1 text-xs font-semibold text-zinc-500">
              {question.answerCount || 0} answered
            </p>

          </div>

        </div>

        <h2 className="mt-6 text-2xl font-black leading-snug">
          {question.question}
        </h2>

        <div className="mt-7 flex items-center justify-between">

          <span className="text-sm font-bold text-zinc-400">
            {getTimeRemaining()}
          </span>

          <div className="flex items-center gap-2 text-cyan-300">

            <span className="text-sm font-black">
              Answer
            </span>

            <ChevronRight size={18} />

          </div>

        </div>

      </div>
    </motion.button>
  );
}