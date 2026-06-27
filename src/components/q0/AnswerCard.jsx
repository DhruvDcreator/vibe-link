import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const FALLBACK =
  "https://ui-avatars.com/api/?background=111827&color=ffffff&name=V";

export default function AnswerCard({
  answer,
  currentUid,
  onUserClick,
  onToggleMe,
}) {
  const meBy = Array.isArray(answer.meBy)
    ? answer.meBy
    : [];

  const alreadyMe =
    currentUid &&
    meBy.includes(currentUid);

  return (
    <motion.div
      layout
      whileHover={{
        y: -2,
      }}
      className="
      rounded-[28px]
      border
      border-white/10
      bg-white/[0.05]
      p-5
      backdrop-blur-2xl
      "
    >
      <div className="flex items-start gap-4">

        <button
          onClick={() =>
            onUserClick?.(answer)
          }
          className="
          flex
          items-center
          gap-3
          text-left
          "
        >
          <img
            src={
              answer.profilePic ||
              FALLBACK
            }
            alt=""
            className="
            h-12
            w-12
            rounded-full
            object-cover
            "
          />

          <div>

            <p className="font-black">
              @{answer.username}
            </p>

            <p
              className="
              mt-1
              text-xs
              text-zinc-500
              "
            >
              Tap to view vibe
            </p>

          </div>

        </button>

      </div>

      <p
        className="
        mt-5
        whitespace-pre-wrap
        text-[17px]
        leading-8
        text-white
        "
      >
        {answer.answer}
      </p>

      <div className="mt-6 flex justify-end">

        <motion.button
          whileTap={{
            scale: 0.94,
          }}
          whileHover={{
            scale: 1.03,
          }}
          onClick={() =>
            onToggleMe?.(answer)
          }
          className={`
          flex
          items-center
          gap-2
          rounded-full
          px-4
          py-2
          font-black
          transition

          ${
            alreadyMe
              ? "bg-cyan-400 text-black"
              : "bg-white/10 text-cyan-300"
          }
          `}
        >
          <Sparkles size={17} />

          ME

          <span>
            {answer.meCount || 0}
          </span>

        </motion.button>

      </div>
    </motion.div>
  );
}