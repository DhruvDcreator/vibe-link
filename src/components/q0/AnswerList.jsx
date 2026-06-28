import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnswerCard from "./AnswerCard";

const TABS = [
  {
    id: "everyone",
    label: "🌍 Everyone",
  },
  {
    id: "circle",
    label: "👥 Circle",
  },
];

export default function AnswerList({
  answers = [],
  loading = false,
  currentUid,
  onUserClick,
  onToggleMe,
  onChat,
  onEdit,
}) {
  const [tab, setTab] = useState("everyone");

  const displayedAnswers = useMemo(() => {
    // Circle will use the friends system later.
    // For now both tabs show the same answers.

    return [...answers].sort((a, b) => {
      const meDiff = (b.meCount || 0) - (a.meCount || 0);

      if (meDiff !== 0) return meDiff;

      const da = b.createdAt?.seconds || 0;
      const db = a.createdAt?.seconds || 0;

      return da - db;
    });
  }, [answers, tab]);

  return (
    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-black">
          Community
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          See what everyone is thinking today.
        </p>

      </div>

      <div
        className="
        mb-8
        flex
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        p-1
        backdrop-blur-xl
        "
      >
        {TABS.map((item) => {

          const active = tab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className="
              relative
              flex-1
              overflow-hidden
              rounded-xl
              py-3
              text-sm
              font-black
              transition-all
              "
            >
              {active && (
                <motion.div
                  layoutId="communityTab"
                  className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  "
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                  }}
                />
              )}

              <span
                className={`relative ${
                  active
                    ? "text-white"
                    : "text-zinc-400"
                }`}
              >
                {item.label}
              </span>

            </button>
          );
        })}
      </div>

      {loading && (

        <div className="space-y-5">

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
              h-40
              animate-pulse
              rounded-[30px]
              bg-white/5
              "
            />
          ))}

        </div>

      )}

      {!loading &&
        displayedAnswers.length === 0 && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
          rounded-[30px]
          border
          border-white/10
          bg-white/[0.05]
          p-10
          text-center
          backdrop-blur-xl
          "
        >

          <div className="text-5xl">
            🌍
          </div>

          <h3 className="mt-5 text-2xl font-black">
            Be the first voice.
          </h3>

          <p className="mt-3 text-zinc-500">
            Nobody has answered today's
            Question Zero yet.
          </p>

        </motion.div>

      )}

      <div className="space-y-5">

        {displayedAnswers.map((answer) => (
          <AnswerCard
  key={answer.id}
  answer={answer}
  currentUid={currentUid}
  onUserClick={onUserClick}
  onToggleMe={onToggleMe}
  onChat={onChat}
  onEdit={onEdit}
/>
        ))}

      </div>

    </section>
  );
}