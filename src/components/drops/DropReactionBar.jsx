import { motion } from "framer-motion";

const reactions = [
  {
    id: "me",
    emoji: "✨",
    label: "ME",
    glow: "shadow-[0_0_25px_rgba(34,211,238,0.25)]",
  },
  {
    id: "neutral",
    emoji: "😐",
    label: "NEUTRAL",
    glow: "",
  },
  {
    id: "different",
    emoji: "🌍",
    label: "DIFFERENT",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.18)]",
  },
];

export default function DropReactionBar({ onReact }) {
  return (
    <div
      className="
      -mt-1
      rounded-b-[36px]
      border-x
      border-b
      border-white/10
      bg-white/[0.045]
      backdrop-blur-3xl
      px-5
      pb-6
      pt-5
      shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
    >
      <div className="mb-5 h-px bg-white/10" />

      <div className="grid grid-cols-3 gap-3">

        {reactions.map((reaction) => (
          <motion.button
            key={reaction.id}
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.18,
            }}
            onClick={() => onReact(reaction.id)}
            className={`
              ${reaction.glow}
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              py-5
              transition-all
              duration-300
              hover:bg-white/[0.07]
            `}
          >
            <div className="text-3xl">
              {reaction.emoji}
            </div>

            <div
              className="
              mt-3
              text-[11px]
              font-black
              tracking-[0.18em]
              text-white/90
              "
            >
              {reaction.label}
            </div>
          </motion.button>
        ))}

      </div>
    </div>
  );
}