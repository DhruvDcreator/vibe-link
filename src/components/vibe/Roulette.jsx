import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";

const FALLBACK_PROFILE = "https://i.pravatar.cc/300";
const ROULETTE_CATEGORIES = ["Movies", "Tech", "Gaming", "Music", "Travel", "Cricket"];
const ICEBREAKERS = ["This or That", "Rapid Fire", "2 Truths and 1 Lie", "Guess My Favourite"];

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function flattenVibes(vibes) {
  if (!vibes) return [];

  const source = Array.isArray(vibes)
    ? vibes
    : typeof vibes === "object"
      ? Object.values(vibes)
      : [];

  const flattened = [];

  source.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string" && item.trim()) {
          flattened.push(item.trim());
        }
      });
      return;
    }

    if (typeof value === "string" && value.trim()) {
      flattened.push(value.trim());
    }
  });

  return [...new Set(flattened)];
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

export default function Roulette({
  userData,
  people = [],
  onSpin,
  onVibe,
}) {
  const [category, setCategory] = useState("Music");
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [icebreaker, setIcebreaker] = useState("");

  const safePeople = safeArray(people);
  const myVibes = useMemo(() => flattenVibes(userData?.vibes), [userData?.vibes]);

  const spin = async () => {
    if (spinning) return;

    setSpinning(true);
    setSelected(null);
    setIcebreaker("");
    setRotation((value) => value + 1440 + Math.floor(Math.random() * 360));

    const winner =
      typeof onSpin === "function"
        ? await onSpin(category)
        : safePeople[Math.floor(Math.random() * Math.max(1, safePeople.length))] || null;

    window.setTimeout(() => {
      setSelected(winner);
      setSpinning(false);
    }, 2400);
  };

  const sharedVibes = selected
    ? flattenVibes(selected.vibes)
        .filter((vibe) => myVibes.includes(vibe))
        .slice(0, 4)
    : [];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Vibe Roulette
        </h2>
        <p className="mt-1 text-xs font-semibold text-zinc-500">
          Choose a vibe. Let the wheel find someone interesting.
        </p>
      </div>

      <div className="rounded-[30px] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/15 via-white/[0.05] to-purple-500/15 p-5 backdrop-blur-2xl">
        <div className="flex flex-wrap gap-2">
          {ROULETTE_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-2 text-xs font-bold ${
                category === item
                  ? "bg-cyan-400 text-black"
                  : "bg-white/[0.07] text-zinc-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mt-7 flex h-60 w-60 items-center justify-center">
          <div className="absolute -top-2 z-20 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[18px] border-l-transparent border-r-transparent border-t-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 2.4, ease: [0.12, 0.8, 0.2, 1] }}
            className="absolute inset-0 rounded-full border-4 border-cyan-300/30 bg-gradient-to-br from-cyan-400/15 to-purple-500/20 shadow-[0_0_45px_rgba(34,211,238,0.18)]"
          >
            {Array.from({ length: 8 }).map((_, index) => {
              const person = safePeople[index % Math.max(1, safePeople.length)];

              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${index * 45}deg) translateY(-94px)`,
                  }}
                >
                  <Avatar
                    src={person?.profilePic}
                    name={person?.username}
                    className="h-10 w-10 -translate-x-1/2 rounded-full border-2 border-white/30"
                  />
                </div>
              );
            })}
          </motion.div>

          <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#10111a] text-center text-xs font-black text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
            {spinning ? "VIBING..." : "SPIN"}
          </div>
        </div>

        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3.5 text-sm font-black disabled:opacity-50"
        >
          <RefreshCw size={17} className={spinning ? "animate-spin" : ""} />
          SPIN
        </button>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.06] p-4 text-center"
            >
              <Avatar
                src={selected.profilePic}
                name={selected.username}
                className="mx-auto h-24 w-24 rounded-[28px] border-2 border-cyan-300/40"
              />

              <h3 className="mt-4 text-xl font-black">
                {selected.username || "Vibe Seeker"}
              </h3>

              <p className="mt-1 text-sm font-black text-cyan-300">
                {Number(selected.compatibility || 0)}% Vibed
              </p>

              <p className="mt-2 text-xs font-bold text-emerald-300">
                {selected.online ? "Online now" : "Recently active"}
              </p>

              <p className="mt-3 text-xs font-bold text-zinc-400">
                {sharedVibes.length > 0
                  ? sharedVibes.join(" • ")
                  : "A new perspective awaits"}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onVibe?.(selected)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-xs font-black"
                >
                  <MessageCircle size={15} />
                  Let&apos;s Vibe
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIcebreaker(
                      ICEBREAKERS[Math.floor(Math.random() * ICEBREAKERS.length)]
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] py-3 text-xs font-black"
                >
                  <Zap size={15} />
                  Icebreaker
                </button>
              </div>

              {icebreaker && (
                <p className="mt-4 rounded-xl bg-purple-400/10 p-3 text-xs font-black text-purple-200">
                  <Sparkles size={14} className="mr-1 inline" />
                  {icebreaker}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}