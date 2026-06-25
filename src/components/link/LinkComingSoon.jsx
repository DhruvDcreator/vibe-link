import { motion } from "framer-motion";
import { Lock, Rocket, Hammer } from "lucide-react";

export default function LinkComingSoon({
  age,
  unlockDate,
  daysRemaining,
}) {
  const isLocked = age < 17;

  return (
    <div className="min-h-screen bg-[#03040A] text-white px-5 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6"
      >
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center">
            {isLocked ? (
              <Lock size={38} className="text-cyan-300" />
            ) : (
              <Rocket size={38} className="text-cyan-300" />
            )}
          </div>
        </div>

        <h1 className="text-3xl font-black text-center">
          LINK
        </h1>

        <p className="text-cyan-300 text-center mt-2">
          Build Your Circle.
        </p>

        <div className="mt-6 rounded-3xl bg-white/[0.04] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Hammer size={18} />
            <span className="font-bold">
              Under Development
            </span>
          </div>

          <p className="text-sm text-zinc-400">
            Networking, opportunities,
            projects and collaboration
            are currently being built.
          </p>
        </div>

        {isLocked ? (
          <div className="mt-6 rounded-3xl bg-cyan-500/10 p-5">
            <p className="text-sm text-zinc-400">
              Available when you turn 17.
            </p>

            <p className="mt-3 text-lg font-bold">
              Unlocks on:
            </p>

            <p className="text-cyan-300 font-black text-xl">
              {unlockDate}
            </p>

            <p className="mt-3 text-sm text-zinc-400">
              {daysRemaining} days remaining
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-cyan-500/10 p-5">
            <p className="font-bold">
              Coming Soon
            </p>

            <p className="text-sm text-zinc-400 mt-2">
              LINK will launch in a future update.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}