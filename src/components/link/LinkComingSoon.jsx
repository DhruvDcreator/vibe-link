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
    <div className="mt-9 space-y-6">
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
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />

        <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-500/20 blur-[70px]" />

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

          <h2 className="mt-4 text-3xl font-black">
            LINK is Under Development
          </h2>

          <p className="mt-4 text-zinc-400 leading-relaxed">
            We're building networking, collaboration,
            opportunities and professional connections.
          </p>
        </div>
      </motion.div>

      {/* Features Card */}
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
            <Briefcase
              size={18}
              className="text-cyan-300"
            />
            <span>Professional Profiles</span>
          </div>

          <div className="flex items-center gap-3">
            <Users
              size={18}
              className="text-cyan-300"
            />
            <span>Networking Circles</span>
          </div>

          <div className="flex items-center gap-3">
            <Target
              size={18}
              className="text-cyan-300"
            />
            <span>Projects & Opportunities</span>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap
              size={18}
              className="text-cyan-300"
            />
            <span>Mentorship</span>
          </div>
        </div>
      </motion.div>

      {/* Age Restriction */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
            17+ PROFESSIONAL SECTION
          </p>

          <p className="mt-4 leading-relaxed text-zinc-300">
            LINK is designed for networking,
            professional opportunities,
            collaboration and mentorship.

            <br />
            <br />

            This section is intended for
            users aged 17 and above.

            <br />
            <br />

            It is currently under development
            and will launch in a future update.
          </p>
        </motion.div>
      )}

      {/* 17+ Users */}
      {!isLocked && (
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
            EARLY ACCESS COMING SOON
          </p>

          <p className="mt-4 text-zinc-300">
            LINK will launch in a future
            VibeLink update.
          </p>
        </motion.div>
      )}
    </div>
  );
}