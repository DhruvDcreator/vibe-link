import { motion } from "framer-motion";
import {
  Rocket,
  Lock,
  Hammer,
  Briefcase,
  Users,
  Target,
  GraduationCap,
} from "lucide-react";

export default function LinkComingSoon({
  age,
  unlockDate,
  daysRemaining,
}) {
  const locked = age < 17;

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.05]
        p-7
        backdrop-blur-2xl
        "
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />

        <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-[70px]" />

        <div className="relative z-10">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
            {locked ? (
              <Lock size={38} className="text-cyan-300" />
            ) : (
              <Rocket size={38} className="text-cyan-300" />
            )}
          </div>

          <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
            UNDER DEVELOPMENT
          </p>

          <h2 className="mt-4 text-3xl font-black">
            LINK is Coming.
          </h2>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            Networking, collaboration,
            opportunities and professional
            circles are currently being built.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.05]
        p-6
        backdrop-blur-2xl
        "
      >
        <h3 className="text-lg font-black">
          Planned Features
        </h3>

        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3">
            <Briefcase className="text-cyan-300" size={18} />
            <span>Professional Profiles</span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="text-cyan-300" size={18} />
            <span>Networking Circles</span>
          </div>

          <div className="flex items-center gap-3">
            <Target className="text-cyan-300" size={18} />
            <span>Projects & Opportunities</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="text-cyan-300" size={18} />
            <span>Mentorship</span>
          </div>

        </div>
      </motion.div>

      {locked && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
          rounded-[30px]
          border
          border-cyan-400/15
          bg-cyan-500/10
          p-6
          "
        >
          <p className="font-black text-cyan-300">
            🔒 Unlocks On
          </p>

          <p className="mt-4 text-3xl font-black">
            {unlockDate}
          </p>

          <p className="mt-3 text-zinc-400">
            {daysRemaining} days remaining
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
          </div>
        </motion.div>
      )}

      {!locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
          rounded-[30px]
          border
          border-purple-400/15
          bg-purple-500/10
          p-6
          "
        >
          <p className="font-black text-purple-300">
            🚀 Coming Soon
          </p>

          <p className="mt-3 text-zinc-400">
            LINK will launch in a future update.
          </p>
        </motion.div>
      )}

    </div>
  );
}