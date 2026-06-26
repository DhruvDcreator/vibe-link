import { motion } from "framer-motion";

const reactions = [
  {
    id: "me",
    emoji: "✨",
    label: "ME",
    color: "from-cyan-500/25 to-cyan-400/10",
  },
  {
    id: "neutral",
    emoji: "😐",
    label: "NEUTRAL",
    color: "from-white/15 to-white/5",
  },
  {
    id: "notMe",
    emoji: "🙅",
    label: "NOT ME",
    color: "from-purple-500/20 to-purple-400/10",
  },
];

export default function DropReactionBar({
  onReact,
}) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-3">

      {reactions.map((reaction) => (
        <motion.button
          key={reaction.id}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() =>
            onReact?.(reaction.id)
          }
          className={`
            rounded-[22px]
            border
            border-white/10
            bg-gradient-to-br
            ${reaction.color}
            backdrop-blur-2xl
            py-5
            transition-all
          `}
        >
          <p className="text-2xl">
            {reaction.emoji}
          </p>

          <p className="mt-2 text-xs font-black tracking-wide">
            {reaction.label}
          </p>
        </motion.button>
      ))}

    </div>
  );
}