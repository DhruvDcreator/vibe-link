import { motion } from "framer-motion";
import { useState } from "react";
import welcomeLogo from "../assets/vllogo.png";

export default function Welcome({ setScreen }) {

  const [loading, setLoading] = useState(false);

  const handleContinue = () => {

    if (loading) return;

    setLoading(true);

    setTimeout(() => {

      setScreen("loginOrSignup");

    }, 300);

  };

  return (

    <div className="relative min-h-screen overflow-hidden bg-[#03040A] flex items-center justify-center text-white px-6">

      {/* BACKGROUND BASE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.06),transparent_45%)]"></div>

      {/* GOLD AMBIENT GLOW */}
      <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[500px] h-[220px] bg-yellow-400/5 blur-[120px] rounded-full"></div>

      {/* PLANET RINGS */}
      <div className="absolute top-[-240px] left-[-240px] w-[520px] h-[520px] rounded-full border border-cyan-400/10"></div>

      <div className="absolute bottom-[-260px] right-[-260px] w-[560px] h-[560px] rounded-full border border-purple-400/10"></div>

      {/* AMBIENT BLOBS */}
      <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-[10%] right-[5%] w-[320px] h-[320px] bg-purple-500/10 rounded-full blur-[120px]"></div>

      <div className="absolute top-[40%] left-[35%] w-[250px] h-[250px] bg-pink-500/5 rounded-full blur-[100px]"></div>

      {/* STARS */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">

        <div className="absolute top-[12%] left-[22%] w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>

        <div className="absolute top-[28%] right-[18%] w-[3px] h-[3px] bg-cyan-300 rounded-full animate-pulse"></div>

        <div className="absolute bottom-[22%] left-[16%] w-[2px] h-[2px] bg-purple-300 rounded-full animate-pulse"></div>

        <div className="absolute top-[45%] right-[10%] w-[2px] h-[2px] bg-pink-300 rounded-full animate-pulse"></div>

        <div className="absolute top-[62%] left-[30%] w-[2px] h-[2px] bg-yellow-200 rounded-full animate-pulse"></div>

      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="relative z-10 flex flex-col items-center"
      >

        {/* LOGO */}
        <motion.img
          src={welcomeLogo}
          alt="VibeLink"
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
            w-[320px]
            md:w-[400px]
            object-contain
            select-none
            drop-shadow-[0_0_90px_rgba(168,85,247,0.18)]
          "
        />

        {/* TAGLINE */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.45,
          }}
          className="
            mt-5
            text-[11px]
            md:text-sm
            tracking-[0.42em]
            uppercase
            font-medium
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-cyan-300
            via-white
            to-pink-300
            opacity-90
          "
        >

          YOUR VIBE. YOUR TRIBE.

        </motion.p>

        {/* CONTINUE BUTTON */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
          onClick={handleContinue}
          disabled={loading}
          className={`
            mt-8
            relative
            overflow-hidden
            px-14
            py-5
            rounded-[30px]
            text-lg
            font-medium
            tracking-[0.28em]
            border
            border-white/10
            backdrop-blur-2xl
            transition-all
            duration-300
            cursor-pointer
            hover:cursor-pointer

            ${
              loading
                ? "bg-white/[0.08] opacity-70"
                : "bg-white/[0.05] hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:shadow-[0_0_70px_rgba(168,85,247,0.22)]"
            }
          `}
        >

          {/* GLASS SHINE */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

          <span className="relative z-10 flex items-center gap-4">

            {loading ? "LOADING..." : "CONTINUE"}

            <span className="text-yellow-300 text-2xl">

              →

            </span>

          </span>

        </motion.button>

        {/* COPYRIGHT */}
        <p className="mt-10 text-sm text-zinc-400 text-center tracking-wide whitespace-nowrap">

          © 2026 VibeLink™ — Dhruv Dhanuka. All rights reserved.

        </p>

      </motion.div>

    </div>

  );

}