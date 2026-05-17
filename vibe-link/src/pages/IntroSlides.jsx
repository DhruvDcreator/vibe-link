import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import welcomeLogo from "../assets/vllogo.png";

const slides = [

  {

    title:
      "Welcome to VibeLink",

    description:
      "A new kind of social space built around identity, belonging, and real connection.",

    visual: "logo",

  },

  {

    title:
      "Find People Who Feel Familiar",

    description:
      "Connect through personality, energy, humor, interests, and shared worlds.",

    visual: "energy",

  },

  {

    title:
      "Communities That Actually Feel Alive",

    description:
      "Join tribes filled with conversations, creativity, chaos, and culture.",

    visual: "tribes",

  },

  {

    title:
      "Express Yourself. Build Your Future.",

    description:
      "From meaningful friendships to ambitious collaborations — VibeLink grows with you.",

    visual: "duality",

  },

  {

    title:
      "Your World Starts Here",

    description:
      "Step into the next generation of connection.",

    visual: "final",

  },

];

export default function IntroSlides({
  setScreen,
}) {

  const [current, setCurrent] =
    useState(0);

  const nextSlide = () => {

    if (
      current <
      slides.length - 1
    ) {

      setCurrent(
        current + 1
      );

    } else {

      setScreen(
        "selector"
      );

    }

  };

  const prevSlide = () => {

    if (
      current > 0
    ) {

      setCurrent(
        current - 1
      );

    }

  };

  const renderVisual =
    () => {

      const visual =
        slides[current]
          .visual;

      if (
        visual ===
        "logo"
      ) {

        return (

          <motion.div

            animate={{
              y: [0, -8, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              relative
              w-[230px]
              h-[230px]
              rounded-full
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-cyan-500/10
              to-purple-500/10
              border
              border-white/10
              shadow-[0_0_70px_rgba(0,212,255,0.08)]
            "
          >

            <div className="
              absolute
              inset-[-10px]
              rounded-full
              border
              border-cyan-400/10
            "></div>

            <img
              src={welcomeLogo}
              alt="VibeLink"
              className="
                w-[140px]
                object-contain
                drop-shadow-[0_0_50px_rgba(168,85,247,0.2)]
              "
            />

          </motion.div>

        );

      }

      if (
        visual ===
        "energy"
      ) {

        return (

          <div className="
            relative
            w-[240px]
            h-[240px]
            flex
            items-center
            justify-center
          ">

            <motion.div

              animate={{
                scale: [1, 1.06, 1],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="
                absolute
                w-[180px]
                h-[180px]
                rounded-full
                bg-cyan-400/10
                blur-[10px]
              "
            ></motion.div>

            <motion.div

              animate={{
                scale: [1.08, 1, 1.08],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="
                absolute
                w-[120px]
                h-[120px]
                rounded-full
                bg-purple-400/20
                blur-[8px]
              "
            ></motion.div>

            <div className="
              absolute
              w-[14px]
              h-[14px]
              rounded-full
              bg-cyan-300
              top-[35px]
              left-[45px]
            "></div>

            <div className="
              absolute
              w-[10px]
              h-[10px]
              rounded-full
              bg-pink-300
              bottom-[40px]
              right-[50px]
            "></div>

            <div className="
              absolute
              w-[8px]
              h-[8px]
              rounded-full
              bg-purple-300
              top-[55px]
              right-[55px]
            "></div>

          </div>

        );

      }

      if (
        visual ===
        "tribes"
      ) {

        return (

          <div className="
            relative
            w-[240px]
            h-[240px]
            flex
            items-center
            justify-center
          ">

            <motion.div

              animate={{
                rotate: 360,
              }}

              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}

              className="
                absolute
                w-[200px]
                h-[200px]
                rounded-full
                border
                border-cyan-400/10
              "
            ></motion.div>

            <motion.div

              animate={{
                rotate: -360,
              }}

              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}

              className="
                absolute
                w-[140px]
                h-[140px]
                rounded-full
                border
                border-purple-400/10
              "
            ></motion.div>

            <div className="
              w-[80px]
              h-[80px]
              rounded-full
              bg-gradient-to-br
              from-cyan-400/20
              to-purple-500/20
              border
              border-white/10
              backdrop-blur-xl
            "></div>

          </div>

        );

      }

      if (
        visual ===
        "duality"
      ) {

        return (

          <div className="
            relative
            w-[240px]
            h-[240px]
            flex
            items-center
            justify-center
          ">

            <motion.div

              animate={{
                x: [-10, 10, -10],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="
                absolute
                left-[35px]
                w-[100px]
                h-[180px]
                rounded-[40px]
                bg-cyan-400/10
                border
                border-cyan-300/10
                backdrop-blur-xl
              "
            ></motion.div>

            <motion.div

              animate={{
                x: [10, -10, 10],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
              }}

              className="
                absolute
                right-[35px]
                w-[100px]
                h-[180px]
                rounded-[40px]
                bg-purple-400/10
                border
                border-purple-300/10
                backdrop-blur-xl
              "
            ></motion.div>

          </div>

        );

      }

      return (

        <motion.div

          animate={{
            scale: [1, 1.04, 1],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}

          className="
            relative
            w-[220px]
            h-[220px]
            rounded-full
            bg-gradient-to-br
            from-cyan-500/10
            to-purple-500/10
            border
            border-white/10
            flex
            items-center
            justify-center
          "
        >

          <div className="
            text-6xl
            font-black
            bg-gradient-to-r
            from-cyan-300
            via-purple-300
            to-pink-300
            text-transparent
            bg-clip-text
          ">

            VL

          </div>

        </motion.div>

      );

    };

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

      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]"></div>

      {/* glows */}
      <div className="
        absolute
        top-[8%]
        left-[5%]
        w-[320px]
        h-[320px]
        bg-cyan-500/10
        rounded-full
        blur-[120px]
      "></div>

      <div className="
        absolute
        bottom-[8%]
        right-[5%]
        w-[320px]
        h-[320px]
        bg-purple-500/10
        rounded-full
        blur-[120px]
      "></div>

      {/* stars */}
      <div className="
        absolute
        inset-0
        pointer-events-none
        opacity-70
      ">

        <div className="absolute top-[15%] left-[20%] w-[2px] h-[2px] bg-white rounded-full animate-pulse"></div>

        <div className="absolute top-[25%] right-[18%] w-[3px] h-[3px] bg-cyan-300 rounded-full animate-pulse"></div>

        <div className="absolute bottom-[20%] left-[15%] w-[2px] h-[2px] bg-purple-300 rounded-full animate-pulse"></div>

      </div>

      {/* main */}
      <div className="
        relative
        z-10
        w-full
        max-w-[430px]
      ">

        {/* card */}
        <div className="
          bg-white/[0.035]
          border
          border-white/10
          rounded-[36px]
          px-7
          pt-10
          pb-8
          backdrop-blur-3xl
          shadow-[0_0_80px_rgba(0,212,255,0.06)]
          overflow-hidden
          relative
          min-h-[620px]
          flex
          flex-col
          justify-between
        ">

          <AnimatePresence mode="wait">

            <motion.div
              key={current}

              initial={{
                opacity: 0,
                y: 30,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -30,
              }}

              transition={{
                duration: 0.45,
              }}

              className="
                flex
                flex-col
                items-center
                text-center
              "
            >

              {renderVisual()}

              <div className="mt-14">

                <h1 className="
                  text-[38px]
                  font-black
                  leading-[1.08]
                  tracking-[-0.03em]
                ">

                  {slides[current].title}

                </h1>

                <p className="
                  mt-5
                  text-zinc-400
                  text-[15px]
                  leading-relaxed
                  max-w-[300px]
                  mx-auto
                ">

                  {slides[current].description}

                </p>

              </div>

            </motion.div>

          </AnimatePresence>

          {/* bottom */}
          <div className="mt-12">

            {/* dots */}
            <div className="
              flex
              items-center
              justify-center
              gap-3
              mb-10
            ">

              {slides.map((_, index) => (

                <motion.div
                  key={index}

                  animate={{
                    width:
                      current === index
                        ? 30
                        : 8,
                  }}

                  className={`
                    h-[8px]
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      current === index
                        ? "bg-cyan-300"
                        : "bg-white/15"
                    }
                  `}
                />

              ))}

            </div>

            {/* buttons */}
            <div className="
              flex
              items-center
              justify-between
            ">

              <button
                onClick={prevSlide}
                disabled={current === 0}
                className={`
                  text-sm
                  tracking-[0.25em]
                  transition-all
                  duration-300

                  ${
                    current === 0

                      ? "text-zinc-700 cursor-default"

                      : "text-zinc-400 hover:text-white"
                  }
                `}
              >

                BACK

              </button>

              <motion.button

                whileHover={{
                  scale: 1.03,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                onClick={nextSlide}

                className="
                  px-7
                  py-4
                  rounded-[22px]

                  bg-gradient-to-r
                  from-cyan-400
                  via-purple-500
                  to-pink-400

                  text-white
                  text-sm
                  tracking-[0.22em]
                  font-semibold

                  shadow-[0_0_50px_rgba(168,85,247,0.28)]
                "
              >

                {
                  current ===
                  slides.length - 1

                    ? "ENTER"

                    : "NEXT"
                }

              </motion.button>

            </div>

          </div>

        </div>

        {/* copyright */}
        <p className="
          mt-8
          text-xs
          text-zinc-500
          text-center
          tracking-wide
          leading-relaxed
        ">

          © 2026 VibeLink™ — Dhruv Dhanuka.

        </p>

      </div>

    </div>

  );

}