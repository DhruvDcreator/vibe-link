import { motion } from "framer-motion";

export default function DropProgress({
  current = 1,
  total = 20,
}) {
  const percent = (current / total) * 100;

  return (
    <div className="mb-8">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-black">
          Today's Deck
        </h2>

        <span className="text-sm font-bold text-zinc-400">
          {current}/{total}
        </span>

      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${percent}%`,
          }}
          transition={{
            duration: 0.45,
          }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500"
        />

      </div>

    </div>
  );
}