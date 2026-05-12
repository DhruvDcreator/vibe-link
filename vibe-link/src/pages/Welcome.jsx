import { motion } from "framer-motion";

import welcomeLogo from "../assets/logo.png";

export default function Welcome({
  setScreen,
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, rgba(0,255,255,0.15), #050510 60%)",
      }}
    >

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* glowing background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-100px] animate-pulse"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-100px] animate-pulse"></div>

      {/* main content */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.9,
        }}
        className="relative z-10 flex flex-col items-center"
      >

        {/* logo */}
        <motion.img
          src={welcomeLogo}
          alt="Vibe Link"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
          className="
            w-[340px]
            md:w-[430px]
            object-contain
            drop-shadow-[0_0_60px_rgba(168,85,247,0.35)]
            select-none
          "
        />

        {/* button */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          onClick={() =>
            setScreen(
              "loginOrSignup"
            )
          }
          className="
            mt-2
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            px-12
            py-5
            rounded-3xl
            text-2xl
            font-bold
            cursor-pointer
            hover:scale-105
            transition-all
            duration-300
            shadow-[0_0_40px_rgba(0,255,255,0.35)]
            hover:shadow-[0_0_70px_rgba(168,85,247,0.5)]
          "
        >
          CONTINUE
        </motion.button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-600 tracking-wide text-center z-20">

  © 2026 Vibe Link™ — Dhruv Dhanuka. All rights reserved.

</p>
      </motion.div>

    </div>
  );
}