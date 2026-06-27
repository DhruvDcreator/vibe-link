import { motion } from "framer-motion";
import { ArrowLeft, Globe2 } from "lucide-react";

export default function QuestionHeader({
  question,
  answerCount,
  expiresText,
  onBack,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      relative
      overflow-hidden
      rounded-[34px]
      border
      border-cyan-300/10
      bg-white/[0.05]
      p-6
      backdrop-blur-2xl
      "
    >
      <div
        className="
        absolute
        -right-20
        -top-20
        h-56
        w-56
        rounded-full
        bg-cyan-500/10
        blur-[90px]
        "
      />

      <button
        type="button"
        onClick={onBack}
        className="
        mb-6
        flex
        items-center
        gap-2
        text-sm
        font-bold
        text-zinc-400
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>

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

          <p
            className="
            text-xs
            font-black
            tracking-[0.2em]
            text-cyan-300
            "
          >
            QUESTION ZERO
          </p>

          <p
            className="
            mt-1
            text-xs
            font-semibold
            text-zinc-500
            "
          >
            {answerCount} answered today
          </p>

        </div>

      </div>

      <h1
        className="
        mt-8
        text-[30px]
        font-black
        leading-tight
        tracking-tight
        "
      >
        {question}
      </h1>

      <div
        className="
        mt-8
        flex
        items-center
        justify-between
        "
      >
        <span
          className="
          text-sm
          font-bold
          text-zinc-400
          "
        >
          Ends in {expiresText}
        </span>

        <div
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
        </div>

      </div>
    </motion.div>
  );
}