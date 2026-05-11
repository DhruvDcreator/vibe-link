import { motion } from "framer-motion";

export default function LoginOrSignup({
  setScreen,
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px] top-[-120px] left-[-120px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] bottom-[-120px] right-[-120px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-6 shadow-[0_0_60px_rgba(0,255,255,0.12)]"
      >

        <h1 className="text-5xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          VIBE LINK
        </h1>

        <p className="text-center text-zinc-400">
          Choose your path
        </p>

        <button
          onClick={() =>
            setScreen("login")
          }
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-5 rounded-3xl text-xl font-bold cursor-pointer hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
        >
          LOGIN
        </button>

        <button
          onClick={() =>
            setScreen("signup")
          }
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-5 rounded-3xl text-xl font-bold cursor-pointer hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
        >
          CREATE ACCOUNT
        </button>

      </motion.div>

    </div>
  );
}