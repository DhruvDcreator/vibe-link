// src/components/link/LinkComingSoon.jsx

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Target,
  GraduationCap,
  Rocket,
  Lock,
} from "lucide-react";

export default function LinkComingSoon({ age }) {
  const isLocked = age < 17;

  return (
    <div className="space-y-6">
      {/* Hero Card */}
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
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-purple-500/20 blur-[90px]" />

        <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-[90px]" />

        <div className="relative z-10">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
            {isLocked ? (
              <Lock size={30} className="text-cyan-300" />
            ) : (
              <Rocket size={30} className="text-cyan-300" />
            )}
          </div>

          <p className="text-xs font-black tracking-[0.25em] text-cyan-300">
            COMING SOON
          </p>
          <div className="mt-3 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
  PHASE 2
</div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-black">
            LINK is Under Development
          </h2>

          <p className="mt-4 leading-relaxed text-zinc-400">
            Professional networking, opportunities,
            collaboration, mentorship and career
            communities are currently being built.
          </p>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
  rounded-[30px]
  border
  border-white/10
  bg-white/[0.05]
  p-6
  backdrop-blur-2xl
  transition-all
  duration-300
  hover:bg-white/[0.07]
"
      >
        <h3 className="text-lg font-black">
          Planned Features
        </h3>

        <div className="mt-6 space-y-5">
          <div className="flex items-center gap-4">
            <Briefcase
              size={18}
              className="text-cyan-300"
            />
            <span>Professional Profiles</span>
          </div>

          <div className="flex items-center gap-4">
            <Users
              size={18}
              className="text-cyan-300"
            />
            <span>Networking Circles</span>
          </div>

          <div className="flex items-center gap-4">
            <Target
              size={18}
              className="text-cyan-300"
            />
            <span>Projects & Opportunities</span>
          </div>

          <div className="flex items-center gap-4">
            <GraduationCap
              size={18}
              className="text-cyan-300"
            />
            <span>Mentorship</span>
          </div>
        </div>
      </motion.div>

      {/* Under 17 */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            rounded-[30px]
            border
            border-cyan-400/15
            bg-cyan-500/10
            p-6
          "
        >
          <p className="font-black text-cyan-300">
            17+ PROFESSIONAL SECTION
          </p>

          <p className="mt-4 leading-relaxed text-zinc-300">
            LINK is designed for professional
            networking, mentorship, opportunities
            and collaboration.

            <br />
            <br />

            This section is intended for users
            aged 17 and above.

            <br />
            <br />

            It is currently under development
            and will launch in a future update.
          </p>
        </motion.div>
      )}

      {/* 17+ */}
      {!isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="
            rounded-[30px]
            border
            border-purple-400/15
            bg-purple-500/10
            p-6
          "
        >
          <p className="font-black text-purple-300">
            BETA ACCESS COMING SOON
          </p>

          <p className="mt-4 text-zinc-300">
            LINK BETA will launch in a future
            VibeLink update.
          </p>
        </motion.div>
      )}
    </div>
  );
}