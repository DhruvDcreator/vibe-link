import { useState } from "react";
import { motion } from "framer-motion";
import {
  Ghost,
  LoaderCircle,
  Lock,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export default function AnonymousVibe({
  onStart,
  onReveal,
  onLeave,
  onExtend,
}) {
  const [status, setStatus] = useState("idle");

  const start = async () => {
    setStatus("searching");

    if (typeof onStart === "function") {
      await onStart();
    }
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Anonymous Vibe
        </h2>
        <p className="mt-1 text-xs font-semibold text-zinc-500">
          No profile. No judgement. Just vibes.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-purple-300/15 bg-gradient-to-br from-purple-500/20 via-white/[0.055] to-cyan-500/10 p-5 backdrop-blur-2xl">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/20 blur-[70px]" />

        <div className="relative">
          <Ghost size={29} className="text-purple-200" />

          <h3 className="mt-4 text-xl font-black">
            Talk anonymously for 3 minutes.
          </h3>

          <p className="mt-3 text-sm font-semibold leading-relaxed text-zinc-400">
            No profile.
            <br />
            No judgement.
            <br />
            Just vibes.
          </p>

          {status === "searching" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.055] p-3 text-sm font-bold text-cyan-200"
            >
              <LoaderCircle size={18} className="animate-spin" />
              Searching for someone on your wavelength...
            </motion.div>
          )}

          {status === "matched" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={19} className="text-emerald-300" />
                <p className="text-sm font-black text-emerald-200">
                  Match found. Your anonymous room is ready.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={onExtend}
                  className="rounded-xl bg-white/[0.07] px-3 py-2 text-xs font-black"
                >
                  Extend
                </button>

                <button
                  type="button"
                  onClick={onReveal}
                  className="rounded-xl bg-cyan-400/15 px-3 py-2 text-xs font-black text-cyan-200"
                >
                  Reveal
                </button>

                <button
                  type="button"
                  onClick={onLeave}
                  className="rounded-xl bg-red-400/10 px-3 py-2 text-xs font-black text-red-200"
                >
                  Leave
                </button>
              </div>
            </motion.div>
          )}

          <button
            type="button"
            onClick={start}
            disabled={status !== "idle"}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 py-3.5 text-sm font-black disabled:opacity-50"
          >
            {status === "idle" ? (
              <>
                <Sparkles size={17} />
                Start Anonymous Vibe
              </>
            ) : (
              <>
                <Lock size={17} />
                Matching...
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}