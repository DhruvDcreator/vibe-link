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
          "radial-gradient(circle at center, rgba(0,255,255,0.15), black 60%)",
      }}
    >

      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px] top-[-150px] left-[-100px] animate-pulse"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px] bottom-[-150px] right-[-100px] animate-pulse"></div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 text-center"
      >

        <div className="w-full flex justify-center items-center">

          <img
            src={welcomeLogo}
            alt="Vibe Link"
            className="
              w-[340px]
              md:w-[420px]
              object-contain
              drop-shadow-[0_0_60px_rgba(168,85,247,0.35)]
              select-none
            "
          />

        </div>

        <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-4">
          VIBE LINK
        </h1>

        <p className="text-zinc-300 text-xl mb-10">
          Your vibe. Your tribe.
        </p>

        <button
          onClick={() =>
            setScreen(
              "loginOrSignup"
            )
          }
          className="bg-gradient-to-r from-cyan-500 to-purple-600 px-12 py-5 rounded-3xl text-2xl font-bold cursor-pointer hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.35)] hover:shadow-[0_0_70px_rgba(168,85,247,0.5)]"
        >
          CONTINUE
        </button>

      </motion.div>

    </div>
  );
}