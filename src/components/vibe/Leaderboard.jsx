import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Trophy,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

const FALLBACK_PROFILE = "https://i.pravatar.cc/300";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function Avatar({ src, name, className = "" }) {
  return (
    <img
      src={src || FALLBACK_PROFILE}
      alt={`${name || "VibeLink user"} profile`}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_PROFILE;
      }}
      className={`object-cover ${className}`}
    />
  );
}

const TABS = [
  { id: "friends", label: "Friends", icon: UserPlus },
  { id: "points", label: "Points", icon: Zap },
  { id: "streak", label: "Streaks", icon: Flame },
];

export default function Leaderboard({
  uid,
  users = [],
  currentUser = null,
  rank = null,
  preview = false,
  onOpen,
  onClose,
}) {
  const [tab, setTab] = useState("points");
  const safeUsers = safeArray(users).slice(0, 3);

  if (preview) {
    return (
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-black tracking-tight sm:text-2xl">
              Leaderboard
            </h2>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              See who is leading this week
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="text-xs font-black text-cyan-300"
          >
            View
          </button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
          {safeUsers.length === 0 ? (
            <p className="text-sm font-semibold text-zinc-500">
              Rankings will appear here soon.
            </p>
          ) : (
            <div className="space-y-3">
              {safeUsers.map((user, index) => (
                <div
                  key={user.id || index}
                  className={`flex items-center gap-3 rounded-2xl p-3 ${
                    user.id === uid
                      ? "border border-cyan-300/30 bg-cyan-400/10"
                      : "bg-white/[0.05]"
                  }`}
                >
                  <span className="w-7 text-center font-black text-cyan-300">
                    #{index + 1}
                  </span>

                  <Avatar
                    src={user.profilePic}
                    name={user.username}
                    className="h-10 w-10 rounded-xl"
                  />

                  <span className="flex-1 truncate text-sm font-black">
                    {user.username || "Vibe Seeker"}
                  </span>

                  <span className="text-xs font-black text-purple-300">
                    {Number(user.points || 0).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[30px] border border-white/10 bg-[#10111a] p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Leaderboard</h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {TABS.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center justify-center gap-1 rounded-2xl px-3 py-3 text-xs font-black ${
                  active
                    ? "bg-cyan-400 text-black"
                    : "bg-white/[0.07] text-zinc-300"
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          {safeUsers.length === 0 && (
            <div className="rounded-2xl bg-white/[0.05] p-4 text-sm font-semibold text-zinc-500">
              No leaderboard data yet.
            </div>
          )}

          {safeUsers.map((user, index) => (
            <div
              key={user.id || index}
              className={`flex items-center gap-3 rounded-2xl p-3 ${
                user.id === uid
                  ? "border border-cyan-300/30 bg-cyan-400/10"
                  : "bg-white/[0.05]"
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                {index === 0 ? <Trophy size={18} /> : `#${index + 1}`}
              </div>

              <Avatar
                src={user.profilePic}
                name={user.username}
                className="h-10 w-10 rounded-xl"
              />

              <span className="flex-1 truncate text-sm font-black">
                {user.username || "Vibe Seeker"}
              </span>

              <span className="text-xs font-black text-purple-300">
                {Number(user[tab] || user.points || 0).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="rounded-2xl bg-gradient-to-r from-cyan-500/15 to-purple-500/15 p-4 text-xs font-black">
            <p>Your Rank: #{rank || "—"}</p>
            <p className="mt-2 text-cyan-300">
              Your Points: {Number(currentUser?.points || 0).toLocaleString()}
            </p>
            <p className="mt-3 text-zinc-500">
              Weekly rewards: #1 +30 • #2 +20 • #3 +10
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}