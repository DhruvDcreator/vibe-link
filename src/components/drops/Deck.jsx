import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import dummyDrops from "./dummyDrops";
import DropProgress from "./DropProgress";
import DropCard from "./DropCard";
import DropReactionBar from "./DropReactionBar";

export default function Deck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentDrop = dummyDrops[currentIndex];

  const total = dummyDrops.length;

  function handleReaction() {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  if (!currentDrop) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        text-center
        "
      >
        <div>

          <h1 className="text-4xl font-black">
            🎉
          </h1>

          <h2 className="mt-5 text-3xl font-black">
            Deck Complete
          </h2>

          <p className="mt-3 text-zinc-400">
            Come back tomorrow for a new deck.
          </p>

        </div>
      </motion.div>
    );
  }

  return (
    <div>

      <DropProgress
        current={currentIndex + 1}
        total={total}
      />

      <AnimatePresence mode="wait">

        <motion.div
          key={currentDrop.id}
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -40,
            scale: 0.97,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <DropCard
            drop={currentDrop}
          />

          <DropReactionBar
            onReact={handleReaction}
          />
        </motion.div>

      </AnimatePresence>

    </div>
  );
}