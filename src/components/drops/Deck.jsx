import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import dummyDrops from "./dummyDrops";
import DropProgress from "./DropProgress";
import DropCard from "./DropCard";
import DropReactionBar from "./DropReactionBar";

export default function Deck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = dummyDrops.length;

  const currentDrop = dummyDrops[currentIndex];

  function handleReaction(type) {
    // We'll save the reaction to Firestore later.
    console.log(type);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(total);
    }
  }

  if (!currentDrop) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
        flex
        min-h-[78vh]
        items-center
        justify-center
        px-6
        text-center
        "
      >
        <div className="max-w-sm">

          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
            }}
            className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500/20
            to-purple-500/20
            "
          >
            <span className="text-5xl">
              🎉
            </span>
          </motion.div>

          <h1 className="mt-8 text-4xl font-black">
            Deck Complete
          </h1>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            You've finished today's deck.
            <br />
            Come back tomorrow for new Drops.
          </p>

        </div>
      </motion.div>
    );
  }

  return (
    <div
      className="
      mx-auto
      max-w-xl
      px-1
      pt-8
      pb-32
      "
    >
      <DropProgress
        current={currentIndex + 1}
        total={total}
      />

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={currentDrop.id}
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -60,
            scale: 0.96,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
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