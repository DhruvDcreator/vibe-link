import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnswerCard from "./AnswerCard";

const TABS = [
  {
    id: "popular",
    label: "🔥 Popular",
  },
  {
    id: "new",
    label: "🆕 New",
  },
  {
    id: "random",
    label: "🎲 Random",
  },
];

export default function AnswerList({
  answers = [],
  loading = false,
  currentUid,
  onUserClick,
  onToggleMe,
}) {
  const [tab, setTab] =
    useState("popular");

  const sortedAnswers =
    useMemo(() => {
      const list = [...answers];

      switch (tab) {
        case "new":
          return list.sort(
            (a, b) => {
              const da =
                a.createdAt?.seconds ||
                0;
              const db =
                b.createdAt?.seconds ||
                0;

              return db - da;
            }
          );

        case "random":
          return list.sort(
            () => Math.random() - 0.5
          );

        default:
          return list.sort(
            (a, b) =>
              (b.meCount || 0) -
              (a.meCount || 0)
          );
      }
    }, [answers, tab]);

  return (
    <section>

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-black">
          Community
        </h2>

        <div className="flex gap-2">

          {TABS.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setTab(item.id)
              }
              className={`
              rounded-full
              px-3
              py-2
              text-xs
              font-black
              transition

              ${
                tab === item.id
                  ? "bg-cyan-400 text-black"
                  : "bg-white/8 text-zinc-400"
              }
              `}
            >
              {item.label}
            </button>
          ))}

        </div>

      </div>

      {loading && (

        <div className="space-y-4">

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
              h-44
              animate-pulse
              rounded-[28px]
              bg-white/5
              "
            />
          ))}

        </div>

      )}

      {!loading &&
        sortedAnswers.length ===
          0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.05]
            p-8
            text-center
            "
          >
            <h3 className="text-xl font-black">
              You're one of the first.
            </h3>

            <p className="mt-3 text-zinc-500">
              No community answers
              yet.
            </p>

          </motion.div>
        )}

      <div className="space-y-5">

        {sortedAnswers.map(
          (answer) => (
            <AnswerCard
              key={answer.id}
              answer={answer}
              currentUid={
                currentUid
              }
              onUserClick={
                onUserClick
              }
              onToggleMe={
                onToggleMe
              }
            />
          )
        )}

      </div>

    </section>
  );
}