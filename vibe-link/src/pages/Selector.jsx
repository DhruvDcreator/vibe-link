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
      px-6
      py-10
    ">

      {/* BACKGROUND */}
      <div className="
        absolute
        inset-0

        bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]
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

        <div className="
          absolute
          top-[12%]
          left-[22%]
          w-[2px]
          h-[2px]
          bg-white
          rounded-full
          animate-pulse
        "></div>

        <div className="
          absolute
          top-[28%]
          right-[18%]
          w-[3px]
          h-[3px]
          bg-cyan-300
          rounded-full
          animate-pulse
        "></div>

        <div className="
          absolute
          bottom-[22%]
          left-[16%]
          w-[2px]
          h-[2px]
          bg-purple-300
          rounded-full
          animate-pulse
        "></div>

      </div>

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
          max-w-[470px]
        "
      >

        {/* LOGO */}
        <div className="
          flex
          justify-center
          mb-8
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

        {/* TEXT */}
        <div className="
          text-center
          mb-10
        ">

          <p className="
            text-zinc-500
            tracking-[0.25em]
            text-xs
            uppercase
          ">

            Choose Your World

          </p>

          <h1 className="
            mt-4
            text-[42px]
            font-black
            leading-[1.05]
            tracking-[-0.04em]
          ">

            How do you

            <br />

            want to connect?

          </h1>

          <p className="
            mt-5
            text-zinc-400
            text-[15px]
            leading-relaxed
            max-w-[300px]
            mx-auto
          ">

            VibeLink adapts to
            who you are and
            what you seek.

          </p>

        </div>

        {/* CARDS */}
        <div className="
          space-y-5
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
                "vibes"
              )
            }

            className="
              relative
              overflow-hidden
              w-full

              rounded-[34px]

              border
              border-cyan-400/15

              bg-gradient-to-br
              from-cyan-500/10
              via-purple-500/10
              to-pink-500/10

              backdrop-blur-3xl

              p-7

              text-left

              shadow-[0_0_80px_rgba(0,212,255,0.08)]

              transition-all
              duration-300

              hover:border-cyan-300/30
            "
          >

            {/* glow */}
            <div className="
              absolute
              top-[-50px]
              right-[-40px]
              w-[160px]
              h-[160px]
              rounded-full
              bg-cyan-400/10
              blur-[70px]
            "></div>

            {/* floating orb */}
            <motion.div

              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className="
                absolute
                right-8
                top-8

                w-[72px]
                h-[72px]

                rounded-full

                bg-gradient-to-br
                from-cyan-300/30
                to-purple-400/30

                border
                border-white/10
              "
            ></motion.div>

            <div className="
              relative
              z-10
            ">

              <p className="
                text-cyan-300
                text-xs
                tracking-[0.28em]
                uppercase
              ">

                VIBE

              </p>

              <h2 className="
                mt-4
                text-4xl
                font-black
                tracking-[-0.04em]
              ">

                Find Your
                People

              </h2>

              <p className="
                mt-4
                text-zinc-300
                leading-relaxed
                max-w-[240px]
              ">

                Discover friendships,
                tribes, conversations,
                and communities that
                truly match your energy.

              </p>

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

              rounded-[34px]

              border

              backdrop-blur-3xl

              p-7

              transition-all
              duration-300

              ${
                canAccessLink

                  ? "border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-amber-400/10 shadow-[0_0_80px_rgba(59,130,246,0.08)]"

                  : "border-white/5 bg-white/[0.025] opacity-70"
              }
            `}
          >

            {/* lock overlay */}
            {
              !canAccessLink && (

                <div className="
                  absolute
                  inset-0
                  backdrop-blur-[2px]
                  bg-black/10
                "></div>

              )
            }

            {/* glow */}
            <div className="
              absolute
              top-[-50px]
              right-[-40px]
              w-[160px]
              h-[160px]
              rounded-full
              bg-blue-400/10
              blur-[70px]
            "></div>

            {/* visual */}
            <motion.div

              animate={{
                y: [0, -8, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className={`
                absolute
                right-8
                top-8

                w-[72px]
                h-[72px]

                rounded-[24px]

                border

                ${
                  canAccessLink

                    ? "bg-gradient-to-br from-blue-300/30 to-amber-300/20 border-white/10"

                    : "bg-white/[0.03] border-white/5"
                }
              `}
            >

              {
                !canAccessLink && (

                  <div className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-2xl
                  ">

                    🔒

                  </div>

                )
              }

            </motion.div>

            <div className="
              relative
              z-10
            ">

              <p className={`
                text-xs
                tracking-[0.28em]
                uppercase

                ${
                  canAccessLink
                    ? "text-blue-300"
                    : "text-zinc-500"
                }
              `}>

                LINK

              </p>

              <h2 className="
                mt-4
                text-4xl
                font-black
                tracking-[-0.04em]
              ">

                Build Your
                Future

              </h2>

              <p className="
                mt-4
                text-zinc-400
                leading-relaxed
                max-w-[250px]
              ">

                Connect with builders,
                creators, founders,
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
                      mt-6

                      px-6
                      py-3

                      rounded-[18px]

                      bg-gradient-to-r
                      from-blue-400
                      to-amber-300

                      text-black
                      text-sm
                      font-semibold
                      tracking-[0.2em]

                      cursor-pointer
                    "
                  >

                    ENTER LINK

                  </button>

                ) : (

                  <div className="
                    mt-6
                    inline-flex
                    items-center
                    gap-3

                    rounded-[18px]

                    bg-white/[0.03]

                    border
                    border-white/5

                    px-5
                    py-3
                  ">

                    <div className="
                      text-lg
                    ">

                      🔒

                    </div>

                    <div>

                      <p className="
                        text-zinc-300
                        text-sm
                        font-medium
                      ">

                        Link unlocks on

                      </p>

                      <p className="
                        text-zinc-500
                        text-xs
                        mt-1
                      ">

                        {unlockDate}

                      </p>

                    </div>

                  </div>

                )
              }

            </div>

          </motion.div>

        </div>

        {/* bottom text */}
        <p className="
          mt-8
          text-center
          text-zinc-500
          text-sm
          leading-relaxed
        ">

          You can switch between
          worlds anytime later.

        </p>

        {/* copyright */}
        <p className="
          mt-6
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