import {
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

export default function Success({
  setScreen,
}) {

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setScreen(
          "profilePicture"
        );

      }, 2500);

    return () =>
      clearTimeout(
        timer
      );

  }, [setScreen]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative text-white">

      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-cyan-500/10"></div>

      <div className="absolute w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[160px] top-[-180px] left-[-150px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] bottom-[-180px] right-[-150px]"></div>

      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
        }}
        className="relative z-10 flex flex-col items-center"
      >

        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="w-44 h-44 rounded-full border-[8px] border-green-400 flex items-center justify-center shadow-[0_0_100px_rgba(34,197,94,0.8)] bg-green-500/10 backdrop-blur-xl"
        >

          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="text-8xl text-green-400"
          >
            ✓
          </motion.div>

        </motion.div>

        <motion.h1
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
          }}
          className="text-6xl font-black mt-10 bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text"
        >
          VERIFIED
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="text-zinc-400 mt-5 text-center text-xl leading-relaxed"
        >
          Your account has been
          <br />
          successfully verified 
        </motion.p>

      </motion.div>

    </div>
  );
}