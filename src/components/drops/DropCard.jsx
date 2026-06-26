import { motion } from "framer-motion";

export default function DropCard({ drop }) {
  return (
    <motion.div
      layout
      className="
      relative
      overflow-hidden
      rounded-t-[36px]
      border
      border-white/10
      bg-white/[0.045]
      backdrop-blur-3xl
      min-h-[52vh]
      px-8
      py-10
      "
    >
      {/* Background Glow */}

      <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-purple-500/10 blur-[140px]" />

      <div className="relative z-10 flex h-full flex-col justify-between">

        {/* Content */}

        <div className="flex flex-1 items-center justify-center">

          {drop.type === "thought" && (
            <p
              className="
              max-w-md
              text-center
              text-[34px]
              font-black
              leading-[1.3]
              tracking-tight
              text-white
              "
            >
              {drop.content}
            </p>
          )}

          {drop.type !== "thought" && (
            <p
              className="
              text-center
              text-2xl
              font-black
              text-zinc-500
              "
            >
              {drop.type}
              <br />
              coming soon
            </p>
          )}

        </div>

        {/* Bottom Hint */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
          mt-8
          flex
          justify-center
          "
        >
          <div
            className="
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-5
            py-2
            text-xs
            font-bold
            tracking-[0.18em]
            text-zinc-400
            uppercase
            "
          >
            Choose what fits you best
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}