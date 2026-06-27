import { useState } from "react";
import { motion } from "framer-motion";
import { PencilLine, Send } from "lucide-react";

export default function AnswerComposer({
  initialValue = "",
  editing = false,
  loading = false,
  onSubmit,
}) {
  const [answer, setAnswer] = useState(initialValue);

  const MAX = 200;

  async function handleSubmit() {
    const value = answer.trim();

    if (!value) return;

    if (typeof onSubmit === "function") {
      await onSubmit(value);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      rounded-[32px]
      border
      border-white/10
      bg-white/[0.05]
      p-5
      backdrop-blur-2xl
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-purple-500/10
          text-purple-300
          "
        >
          <PencilLine size={20} />
        </div>

        <div>

          <p className="font-black">
            {editing ? "Edit your answer" : "Your Answer"}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Keep it genuine. Max 200 characters.
          </p>

        </div>

      </div>

      <textarea
        value={answer}
        maxLength={MAX}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
        placeholder="Type your answer..."
        className="
        mt-5
        min-h-[130px]
        w-full
        resize-none
        rounded-[24px]
        border
        border-white/10
        bg-black/20
        p-4
        text-base
        leading-relaxed
        outline-none
        transition
        focus:border-cyan-400/40
        "
      />

      <div className="mt-3 flex items-center justify-between">

        <span
          className={`
          text-xs
          font-bold
          ${
            answer.length > 180
              ? "text-orange-300"
              : "text-zinc-500"
          }
          `}
        >
          {answer.length}/{MAX}
        </span>

        <motion.button
          whileTap={{
            scale: 0.97,
          }}
          whileHover={{
            scale: 1.02,
          }}
          disabled={
            loading ||
            answer.trim().length === 0
          }
          onClick={handleSubmit}
          className="
          flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          px-5
          py-3
          font-black
          text-white
          disabled:opacity-50
          "
        >
          <Send size={18} />

          {editing
            ? "Save"
            : "Submit"}
        </motion.button>

      </div>

    </motion.div>
  );
}