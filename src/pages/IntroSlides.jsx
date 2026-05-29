import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import slide1 from "../assets/onboarding/slide1.png";
import slide2 from "../assets/onboarding/slide2.png";
import slide3 from "../assets/onboarding/slide3.png";
import slide4 from "../assets/onboarding/slide4.png";
import slide5 from "../assets/onboarding/slide5.png";

const slides = [

{
image: slide1,

title:
  "Your Vibe.\nYour Tribe.",

description:
  "The people around you shape your world. Find the ones who feel right.",

},

{
image: slide2,

title:
  "Less Scrolling.\nMore Connecting.",

description:
  "Not followers. Not numbers. Just real people, real conversations, and shared energy.",

},

{
image: slide3,

title:
  "Built Around\nWho You Are.",

description:
  "Your personality, interests, and vibe matter. Discover people who genuinely connect with who you are.",

},

{
image: slide4,

title:
  "Find People\nWho Get You.",

description:
  "From movie lovers and music addicts to dreamers, creators, and late-night thinkers — every vibe belongs here.",

},

{
image: slide5,

title:
  "Welcome To\nVibeLink.",

description:
  "Discover your people. Build your tribe.",

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

  return (

    <div className="
      relative
      min-h-screen
      bg-black
      overflow-hidden
      text-white
      flex
      items-center
      justify-center
      px-5
      py-8
    ">

      {/* background glow */}
      <div className="
        absolute
        inset-0

        bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_32%),radial-gradient(circle_at_center,rgba(255,0,128,0.05),transparent_45%)]
      "></div>

      {/* side glows */}
      <div className="
        absolute
        top-[5%]
        left-[-80px]

        w-[240px]
        h-[240px]

        rounded-full

        bg-cyan-500/10

        blur-[120px]
      "></div>

      <div className="
        absolute
        bottom-[5%]
        right-[-80px]

        w-[240px]
        h-[240px]

        rounded-full

        bg-purple-500/10

        blur-[120px]
      "></div>

      {/* main */}
      <div className="
        relative
        z-10

        w-full
        max-w-[460px]
      ">

        {/* card */}
        <div className="
          relative

          overflow-hidden

          rounded-[38px]

          bg-white/[0.035]

          border
          border-white/10

          backdrop-blur-3xl

          shadow-[0_0_80px_rgba(0,0,0,0.4)]

          min-h-[720px]

          flex
          flex-col
          justify-between
        ">

          <AnimatePresence mode="wait">

            <motion.div

              key={current}

              initial={{
                opacity: 0,
                scale: 0.98,
                y: 30,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.98,
                y: -20,
              }}

              transition={{
                duration: 0.45,
              }}

              className="
                flex
                flex-col
              "
            >

              {/* image */}
              <div className="
                relative
                w-full
                h-[430px]
                overflow-hidden
              ">

                <img
                  src={
                    slides[current]
                      .image
                  }

                  alt="slide"

                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* overlay */}
                <div className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-[#03040A]
                  via-black/10
                  to-transparent
                "></div>

              </div>

              {/* text */}
              <div className="
                px-7
                pt-6
                pb-2
                text-center
              ">

                <motion.h1

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.15,
                  }}

                  className="
text-[44px]
md:text-[56px]
leading-[0.95]
tracking-[-0.08em]
font-black
whitespace-pre-line
"

                >

                  {
                    slides[current]
                      .title
                  }

                </motion.h1>

                <motion.p

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.25,
                  }}

                  className="
                    mt-5

                    text-zinc-400

                    text-[15px]
                    leading-relaxed

                    max-w-[310px]
                    mx-auto
                  "
                >

                  {
                    slides[current]
                      .description
                  }

                </motion.p>

              </div>

            </motion.div>

          </AnimatePresence>

          {/* bottom */}
          <div className="
            px-7
            pb-7
            pt-5
          ">

            {/* dots */}
            <div className="
              flex
              justify-center
              items-center
              gap-3
              mb-9
            ">

              {
                slides.map(
                  (_, index) => (

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

                  )
                )
              }

            </div>

            {/* buttons */}
            <div className="
              flex
              items-center
              justify-between
            ">

              <button

                onClick={
                  prevSlide
                }

                disabled={
                  current === 0
                }

                className={`
                  text-sm

                  tracking-[0.22em]

                  transition-all
                  duration-300

                  ${
                    current === 0

                      ? "text-zinc-700"

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

                onClick={
                  nextSlide
                }

                className="
                  px-8
                  py-4

                  rounded-[22px]

                  bg-gradient-to-r
                  from-cyan-400
                  via-purple-500
                  to-pink-400

                  text-white
                  text-sm
                  font-semibold

                  tracking-[0.22em]

                  shadow-[0_0_50px_rgba(168,85,247,0.28)]
                "
              >

                {
                  current ===
                  slides.length - 1

                    ? "GET STARTED"

                    : "NEXT"
                }

              </motion.button>

            </div>

          </div>

        </div>

        {/* copyright */}
        <p className="
          mt-7

          text-center

          text-xs
          text-zinc-600

          tracking-wide
          leading-relaxed
        ">

          © 2026 VibeLink™ — Dhruv Dhanuka.

        </p>

      </div>

    </div>

  );

}