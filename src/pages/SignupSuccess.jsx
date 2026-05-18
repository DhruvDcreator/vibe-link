import {
  useEffect,
} from "react";

import {
  motion,
} from "framer-motion";

import welcomeLogo from "../assets/vllogo.png";

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

    <div className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#03040A]
      flex
      items-center
      justify-center
      text-white
      px-6
    ">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]"></div>

      {/* PLANET RINGS */}
      <div className="
        absolute
        top-[-240px]
        left-[-240px]
        w-[520px]
        h-[520px]
        rounded-full
        border
        border-cyan-400/10
      "></div>

      <div className="
        absolute
        bottom-[-260px]
        right-[-260px]
        w-[560px]
        h-[560px]
        rounded-full
        border
        border-purple-400/10
      "></div>

      {/* GLOWS */}
      <div className="
        absolute
        top-[10%]
        left-[5%]
        w-[320px]
        h-[320px]
        bg-cyan-500/10
        rounded-full
        blur-[120px]
      "></div>

      <div className="
        absolute
        bottom-[10%]
        right-[5%]
        w-[320px]
        h-[320px]
        bg-purple-500/10
        rounded-full
        blur-[120px]
      "></div>

      {/* STARS */}
      <div className="
        absolute
        inset-0
        opacity-70
        pointer-events-none
      ">

        <div className="absolute top-[12%] left-[22%] w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>

        <div className="absolute top-[28%] right-[18%] w-[3px] h-[3px] bg-cyan-300 rounded-full animate-pulse"></div>

        <div className="absolute bottom-[22%] left-[16%] w-[2px] h-[2px] bg-purple-300 rounded-full animate-pulse"></div>

      </div>

      {/* MAIN */}
      <motion.div

        initial={{
          opacity: 0,
          y: 30,
          scale: 0.98,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
          relative
          z-10
          w-full
          max-w-[430px]
          pt-10
          pb-8
        "
      >

        {/* LOGO */}
        <div className="
          flex
          justify-center
          mb-7
        ">

          <img
            src={welcomeLogo}
            alt="VibeLink"
            className="
              w-[135px]
              object-contain
              select-none
              drop-shadow-[0_0_70px_rgba(168,85,247,0.16)]
            "
          />

        </div>

        {/* CARD */}
        <div className="
          bg-white/[0.035]
          border
          border-white/10
          rounded-[34px]
          p-7
          backdrop-blur-3xl
          shadow-[0_0_80px_rgba(0,212,255,0.06)]
        ">

          {/* SUCCESS ICON */}
          <div className="
            flex
            justify-center
            mb-8
          ">

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

              className="
                relative
                w-[120px]
                h-[120px]
                rounded-full
                flex
                items-center
                justify-center

                bg-gradient-to-br
                from-cyan-500/20
                to-green-400/20

                border
                border-cyan-400/30

                shadow-[0_0_60px_rgba(0,212,255,0.22)]
              "
            >

              {/* rotating ring */}
              <motion.div

                animate={{
                  rotate: 360,
                }}

                transition={{
                  repeat: Infinity,
                  duration: 10,
                  ease: "linear",
                }}

                className="
                  absolute
                  inset-[-8px]
                  rounded-full
                  border
                  border-cyan-400/20
                  border-dashed
                "
              />

              {/* check */}
              <motion.div

                initial={{
                  scale: 0,
                  rotate: -40,
                }}

                animate={{
                  scale: 1,
                  rotate: 0,
                }}

                transition={{
                  delay: 0.25,
                  type: "spring",
                }}

                className="
                  text-6xl
                  text-cyan-300
                "
              >

                ✓

              </motion.div>

            </motion.div>

          </div>

          {/* TITLE */}
          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.3,
            }}

            className="text-center"
          >

            <h1 className="
              text-5xl
              font-black
              leading-tight
            ">

              Verification

              <br />

              <span className="
                bg-gradient-to-r
                from-cyan-300
                via-green-300
                to-cyan-400
                text-transparent
                bg-clip-text
              ">

                Successful!

              </span>

            </h1>

            <p className="
              mt-5
              text-zinc-400
              text-lg
              leading-relaxed
            ">

              Your account has been

              <br />

              successfully verified.

            </p>

          </motion.div>

          {/* SECURITY BOX */}
          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.55,
            }}

            className="
              mt-8
              rounded-[26px]
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              p-5
              flex
              items-center
              gap-4
            "
          >

            <div className="
              w-[52px]
              h-[52px]
              rounded-full
              flex
              items-center
              justify-center
              bg-cyan-500/10
              border
              border-cyan-400/20
              text-2xl
            ">

              🛡️

            </div>

            <div>

              <p className="
                text-white
                font-medium
              ">

                Your account is secure

              </p>

              <p className="
                text-sm
                text-zinc-400
                mt-1
              ">

                Redirecting to profile setup...

              </p>

            </div>

          </motion.div>

          {/* LOADING BAR */}
          <motion.div

            initial={{
              width: 0,
            }}

            animate={{
              width: "100%",
            }}

            transition={{
              duration: 2.3,
              ease: "linear",
            }}

            className="
              mt-8
              h-[6px]
              rounded-full

              bg-gradient-to-r
              from-cyan-400
              via-green-300
              to-cyan-400

              shadow-[0_0_30px_rgba(0,212,255,0.25)]
            "
          />

        </div>

        {/* COPYRIGHT */}
        <p className="
          mt-8
          text-xs
          text-zinc-500
          text-center
          tracking-wide
          leading-relaxed
        ">

          © 2026 VibeLink™ — Dhruv Dhanuka.

          <br />

          All rights reserved.

        </p>

      </motion.div>

    </div>

  );

}