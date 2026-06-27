import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, ChevronRight } from "lucide-react";
import {
  getCurrentQuestion,
  getRemainingTime,
} from "../../services/questionZeroService";

export default function QuestionZeroCard({
  setCurrentTab,
}) {  const [question, setQuestion] = useState(null);

  const [time, setTime] = useState(
    getRemainingTime()
  );

  useEffect(() => {
    loadQuestion();

    const interval = setInterval(() => {
      setTime(getRemainingTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  async function loadQuestion() {
    const q = await getCurrentQuestion();

    setQuestion(q);
  }

  if (!question) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      onClick={() =>
  setCurrentTab("questionZero")
}
      className="
      relative
      w-full
      overflow-hidden
      rounded-[34px]
      border
      border-cyan-400/15
      bg-gradient-to-br
      from-cyan-500/10
      via-white/[0.05]
      to-purple-500/10
      p-6
      text-left
      backdrop-blur-2xl
      "
    >
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-500/15 blur-[90px]" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-cyan-400/10
              text-cyan-300
              "
            >
              <Globe2 size={24} />
            </div>

            <div>

              <p className="text-xs font-black tracking-[0.22em] text-cyan-300">
                QUESTION ZERO
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {question.answerCount || 0} answered today
              </p>

            </div>

          </div>

          <ChevronRight className="text-zinc-500" />

        </div>

        <h2
          className="
          mt-7
          text-[26px]
          font-black
          leading-tight
          tracking-tight
          "
        >
          {question.question}
        </h2>

        <div className="mt-8 flex items-center justify-between">

          <span className="text-sm text-zinc-400">
            Ends in {time.hours}h {time.minutes}m
          </span>

          <span
            className="
            rounded-full
            bg-cyan-400/10
            px-3
            py-2
            text-xs
            font-black
            text-cyan-300
            "
          >
            LIVE
          </span>

        </div>

      </div>
    </motion.button>
  );
}