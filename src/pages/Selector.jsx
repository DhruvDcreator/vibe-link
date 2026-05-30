import {
  motion,
} from "framer-motion";

import {
  useMemo,
} from "react";

import welcomeLogo from "../assets/vllogo.png";

export default function Selector({

  setScreen,

}) {

  const birthDate =
    localStorage.getItem(
      "vibeLinkDOB"
    );

  const unlockDate =
    useMemo(() => {

      if (!birthDate) {
        return null;
      }

      const dob =
        new Date(
          birthDate
        );

      dob.setFullYear(
        dob.getFullYear() +
        17
      );

      return dob.toLocaleDateString(
        "en-IN",
        {

          day: "numeric",

          month: "long",

          year: "numeric",

        }
      );

    }, [birthDate]);

  const age =
    useMemo(() => {

      if (!birthDate) {
        return 13;
      }

      const dob =
        new Date(
          birthDate
        );

      const today =
        new Date();

      let calculatedAge =
        today.getFullYear() -
        dob.getFullYear();

      const monthDifference =
        today.getMonth() -
        dob.getMonth();

      if (

        monthDifference < 0 ||

        (
          monthDifference === 0 &&

          today.getDate() <
          dob.getDate()
        )

      ) {

        calculatedAge--;

      }

      return calculatedAge;

    }, [birthDate]);

  const canAccessLink =
    age >= 17;

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
      px-5
      py-8
    "style={{
  paddingTop: "env(safe-area-inset-top)"
}}>

      {/* BACKGROUND */}
      <div className="
        absolute
        inset-0

        bg-[#03040A]
      "></div>

      {/* GLOWS */}
      <div className="
        absolute
        top-[-120px]
        left-[-120px]

        w-[320px]
        h-[320px]

        rounded-full

        bg-cyan-500/10

        blur-3xl
      "></div>

      <div className="
        absolute
        bottom-[-120px]
        right-[-120px]

        w-[320px]
        h-[320px]

        rounded-full

        bg-purple-500/10

        blur-3xl
      "></div>

      {/* MAIN */}
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
          duration: 0.8,
        }}

        className="
          relative
          z-10
          w-full
          max-w-[450px]
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
              w-[125px]
              object-contain

              drop-shadow-[0_0_60px_rgba(168,85,247,0.18)]
            "
          />

        </div>

        {/* HEADER */}
        <div className="
          text-center
          mb-8
        ">

          <p className="
            text-cyan-300
            text-xs
            tracking-[0.32em]
            uppercase
          ">

            ENTER VIBELINK

          </p>

          <h1 className="
            mt-5

            text-[46px]

            font-black

            leading-[0.98]

            tracking-[-0.06em]
          ">

            Choose Your

            <br />

            Universe

          </h1>

          <p className="
            mt-5

            text-zinc-400

            text-[15px]

            leading-relaxed

            max-w-[300px]
            mx-auto
          ">

            Two worlds.
            Two energies.
            One identity.

          </p>

        </div>

        {/* SWITCH TEXT */}
        <div className="
          mb-7

          text-center
        ">

          <div className="
            inline-flex

            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-white/[0.03]

            px-5
            py-3

            backdrop-blur-xl
          ">

            <p className="
              text-sm

              text-zinc-300

              tracking-wide
            ">

              You can switch between
              Vibe & Link anytime later.

            </p>

          </div>

        </div>

        {/* CARDS */}
        <div className="
          space-y-6
        ">

          {/* VIBE */}
          <motion.button

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.985,
            }}

            onClick={() =>
              setScreen(
                "vibeIntro"
              )
            }

            className="
              relative
              overflow-hidden

              w-full

              rounded-[36px]

              border
              border-cyan-400/15

              bg-[linear-gradient(145deg,rgba(0,212,255,0.10),rgba(168,85,247,0.10),rgba(255,0,128,0.08))]

              backdrop-blur-xl

              p-7

              text-left

              shadow-[0_0_90px_rgba(0,212,255,0.07)]

              transition-all
              duration-300

              hover:border-cyan-300/30
            "
          >

            {/* GLOW */}
            <div className="
              absolute
              top-[-60px]
              right-[-40px]

              w-[180px]
              h-[180px]

              rounded-full

              bg-cyan-400/10

              blur-[80px]
            "></div>

            {/* SMALL LABEL */}
            <p className="
              relative
              z-10

              text-cyan-300

              text-xs

              tracking-[0.3em]

              uppercase
            ">

              SOCIAL • TRIBES • ENERGY

            </p>

            {/* TITLE */}
            <h2 className="
              relative
              z-10

              mt-5

              text-[44px]

              font-black

              tracking-[-0.05em]
            ">

              VIBE

            </h2>

            {/* DESCRIPTION */}
            <p className="
              relative
              z-10

              mt-4

              text-zinc-300

              text-[15px]

              leading-relaxed

              max-w-[250px]
            ">

              Meet people,
              discover tribes,
              and build genuine
              connections through
              shared energy.

            </p>

            {/* BUTTON */}
            <div className="
              relative
              z-10

              mt-7
            ">

              <div className="
                inline-flex

                items-center
                justify-center

                rounded-[20px]

                bg-gradient-to-r
                from-cyan-400
                via-purple-500
                to-pink-400

                px-6
                py-4

                text-sm
                font-semibold

                tracking-[0.25em]

                shadow-[0_0_45px_rgba(168,85,247,0.22)]
              ">

                ENTER VIBE

              </div>

            </div>

          </motion.button>

          {/* LINK */}
          <motion.div

            whileHover={{
              scale:
                canAccessLink
                  ? 1.02
                  : 1.01,
            }}

            className={`
              relative
              overflow-hidden

              w-full

              rounded-[36px]

              border

              backdrop-blur-xl

              p-7

              transition-all
              duration-300

              ${
                canAccessLink

                  ? "border-blue-400/20 bg-[linear-gradient(145deg,rgba(59,130,246,0.12),rgba(14,165,233,0.10),rgba(251,191,36,0.08))] shadow-[0_0_90px_rgba(59,130,246,0.08)]"

                  : "border-white/5 bg-white/[0.03] opacity-75"
              }
            `}
          >

            {/* GLOW */}
            <div className="
              absolute
              top-[-60px]
              right-[-40px]

              w-[180px]
              h-[180px]

              rounded-full

              bg-blue-400/10

              blur-[80px]
            "></div>

            {/* LOCK */}
            {
              !canAccessLink && (

                <div className="
                  absolute
                  top-5
                  right-5

                  px-4
                  py-2

                  rounded-full

                  bg-white/[0.04]

                  border
                  border-white/5

                  text-xs
                  text-zinc-400

                  tracking-[0.2em]
                ">

                  LOCKED

                </div>

              )
            }

            {/* LABEL */}
            <p className={`
              relative
              z-10

              text-xs

              tracking-[0.3em]

              uppercase

              ${
                canAccessLink
                  ? "text-blue-300"
                  : "text-zinc-500"
              }
            `}>

              BUILD • CREATE • GROW

            </p>

            {/* TITLE */}
            <h2 className="
              relative
              z-10

              mt-5

              text-[44px]

              font-black

              tracking-[-0.05em]
            ">

              LINK

            </h2>

            {/* DESCRIPTION */}
            <p className="
              relative
              z-10

              mt-4

              text-zinc-400

              text-[15px]

              leading-relaxed

              max-w-[260px]
            ">

              Connect with founders,
              creators, collaborators,
              and opportunities that
              move your ambitions forward.

            </p>

            {

              canAccessLink ? (

                <button

                  onClick={() =>
                    setScreen(
                      "link"
                    )
                  }

                  className="
                    relative
                    z-10

                    mt-7

                    px-7
                    py-4

                    rounded-[20px]

                    bg-gradient-to-r
                    from-blue-400
                    to-amber-300

                    text-black
                    text-sm
                    font-bold

                    tracking-[0.25em]

                    cursor-pointer

                    shadow-[0_0_50px_rgba(59,130,246,0.22)]
                  "
                >

                  ENTER LINK

                </button>

              ) : (

                <div className="
                  relative
                  z-10

                  mt-7

                  rounded-[24px]

                  bg-white/[0.03]

                  border
                  border-white/5

                  px-5
                  py-4
                ">

                  <p className="
                    text-zinc-300
                    text-sm
                    font-medium
                  ">

                    Link unlocks automatically on

                  </p>

                  <p className="
                    mt-2

                    text-blue-300

                    text-lg
                    font-semibold
                  ">

                    {unlockDate}

                  </p>

                </div>

              )
            }

          </motion.div>

        </div>

        {/* COPYRIGHT */}
        <p className="
          mt-8

          text-xs
          text-zinc-600

          text-center

          tracking-wide
        ">

          © 2026 VibeLink™ — Dhruv Dhanuka.

        </p>

      </motion.div>

    </div>

  );

}