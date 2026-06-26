import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CreateDrop from "./CreateDrop";
import Deck from "./Deck";

export default function Drops() {
  const [stage, setStage] = useState("create");

  return (
    <div className="min-h-full">
      <AnimatePresence mode="wait">

        {stage === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.35,
            }}
          >
            <CreateDrop
              onSkip={() => setStage("feed")}
            />
          </motion.div>
        )}

        {stage === "feed" && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{
              duration: 0.35,
            }}
          >
            <Deck />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}