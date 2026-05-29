import {
  motion,
} from "framer-motion";

import vibeLogo from "../assets/vllogo.png";

export default function VibeIntro({

  setScreen,

}) {

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
      py-8
    ">

      {/* BACKGROUND */}
      <div className="
        absolute
        inset-0

        bg-[#03040A]
      "></div>

      {/* GLOW 1 */}
      <div className="
        absolute
        top-[-120px]
        left-[-100px]

        w-[320px]
        h-[320px]

        rounded-full

        bg-cyan-500/10

        blur-3xl
      "></div>

      {/* GLOW 2 */}
      <div className="
        absolute
        bottom-[-120px]
        right-[-100px]

        w-[320px]
        h-[320px]

        rounded-full

        bg-purple-500/10

        blur-3xl
      "></div>

      {/* FLOATING PARTICLES */}
      <div className="
        absolute
        inset-0
        pointer-events-none
      ">

        <motion.div

          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}

          transition={{
            duration: 5,
            repeat: Infinity,
          }}

          className="
            absolute
            top-[18%]
            left-[18%]

            w-[8px]
            h-[8px]

            rounded-full

            bg-cyan-300

            blur-[2px]
          "
        ></motion.div>

        <motion.div

          animate={{
            y: [0, 16, 0],
            opacity: [0.2, 1, 0.2],
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
          }}

          className="
            absolute
            top-[28%]
            right-[20%]

            w-[10px]
            h-[10px]

            rounded-full

            bg-pink-400

            blur-[2px]
          "
        ></motion.div>

      </div>

      {/* MAIN */}
      <motion.div

        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="
          relative
          z-10

          w-full
          max-w-[460px]
        "
      >

        {/* CARD */}
        <div className="
          relative

          overflow-hidden

          rounded-[42px]

          border
          border-cyan-400/10

          bg-white/[0.04]

          backdrop-blur-xl

          p-8

          shadow-[0_0_80px_rgba(0,212,255,0.08)]
        ">

          {/* INTERNAL GLOW */}
          <div className="
            absolute
            top-[-70px]
            right-[-50px]

            w-[220px]
            h-[220px]

            rounded-full

            bg-cyan-400/10

            blur-2xl
          "></div>

          {/* LOGO */}
          <div className="
            flex
            justify-center
          ">

            <img
              src={vibeLogo}
              alt="VibeLink"

              className="
                w-[115px]
                object-contain

                drop-shadow-[0_0_60px_rgba(168,85,247,0.2)]
              "
            />

          </div>

          {/* SMALL TEXT */}
          <div className="
            mt-8
            text-center
          ">

            <p className="
              text-cyan-300

              text-xs

              tracking-[0.35em]

              uppercase
            ">

              ENTER VIBE
            </p>

          </div>

          {/* TITLE */}
          <div className="
            mt-5
            text-center
          ">

            <h1 className="
              text-[58px]
              md:text-[68px]

              font-black

              leading-[0.92]

              tracking-[-0.07em]
            ">

              Find Your

              <br />

              Tribe

            </h1>

          </div>

          {/* DESC */}
          <div className="
            mt-6
            text-center
          ">

            <p className="
              text-zinc-300

              text-[16px]

              leading-relaxed

              max-w-[300px]
              mx-auto
            ">

              Some people instantly understand
              your humour, your energy, and the
              way you see the world.

              Vibe helps you find them.


            </p>

          </div>

          {/* FEATURES */}
          <div className="
            mt-10

            space-y-4
          ">

            <div className="
              rounded-[24px]

              border
              border-white/5

              bg-white/[0.03]

              px-5
              py-4
            ">

              <p className="
                text-white
                font-semibold
              ">

                Vibe Matching

              </p>

              <p className="
                mt-1

                text-zinc-400

                text-sm

                leading-relaxed
              ">

                Meet people who genuinely connect
                with your personality, interests,
                and vibe.


              </p>

            </div>

            <div className="
              rounded-[24px]

              border
              border-white/5

              bg-white/[0.03]

              px-5
              py-4
            ">

              <p className="
                text-white
                font-semibold
              ">

                Tribes & Communities

              </p>

              <p className="
                mt-1

                text-zinc-400

                text-sm

                leading-relaxed
              ">

                Join communities built around
                shared passions, conversations,
                and experiences.


              </p>

            </div>

            <div className="
              rounded-[24px]

              border
              border-white/5

              bg-white/[0.03]

              px-5
              py-4
            ">

              <p className="
                text-white
                font-semibold
              ">

                Chaos Feed

              </p>

              <p className="
                mt-1

                text-zinc-400

                text-sm

                leading-relaxed
              ">

                Less pressure.
                Less pretending.

                More authentic connections.

              </p>

            </div>

          </div>

          {/* BUTTON */}
          <motion.button

            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={() =>
              setScreen(
                "vibes"
              )
            }

            className="
              mt-10

              w-full

              rounded-[24px]

              bg-gradient-to-r
              from-cyan-400
              via-purple-500
              to-pink-400

              py-5

              text-white

              text-sm
              font-bold

              tracking-[0.3em]

              shadow-[0_0_60px_rgba(168,85,247,0.24)]
            "
          >

            FIND MY TRIBE

          </motion.button>

        </div>

      </motion.div>

    </div>

  );

}