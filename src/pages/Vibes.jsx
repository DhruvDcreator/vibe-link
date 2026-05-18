import {
  auth,
  db,
} from "../firebase/firebase";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  Music,
  Gamepad2,
  Dumbbell,
  Camera,
  Plane,
  Film,
  Heart,
  BookOpen,
  Mic2,
  Code2,
  Pizza,
  Sparkles,
  Moon,
  Coffee,
  Palette,
  Trophy,
  Brain,
  Shirt,
  Ghost,
  Laugh,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";

const vibes = [
  {
    name: "Music",
    icon: Music,
  },
  {
    name: "Gaming",
    icon: Gamepad2,
  },
  {
    name: "Fitness",
    icon: Dumbbell,
  },
  {
    name: "Photography",
    icon: Camera,
  },
  {
    name: "Travel",
    icon: Plane,
  },
  {
    name: "Movies",
    icon: Film,
  },
  {
    name: "Dating",
    icon: Heart,
  },
  {
    name: "Reading",
    icon: BookOpen,
  },
  {
    name: "Singing",
    icon: Mic2,
  },
  {
    name: "Coding",
    icon: Code2,
  },
  {
    name: "Food",
    icon: Pizza,
  },
  {
    name: "Aesthetic",
    icon: Sparkles,
  },
  {
    name: "Night Owl",
    icon: Moon,
  },
  {
    name: "Coffee",
    icon: Coffee,
  },
  {
    name: "Art",
    icon: Palette,
  },
  {
    name: "Sports",
    icon: Trophy,
  },
  {
    name: "Deep Talks",
    icon: Brain,
  },
  {
    name: "Fashion",
    icon: Shirt,
  },
  {
    name: "Memes",
    icon: Laugh,
  },
  {
    name: "Dark Humor",
    icon: Ghost,
  },
];

export default function Vibes({

  setScreen,

  selectedVibes,

  setSelectedVibes,

}) {

  const toggleVibe =
    (vibe) => {

      if (
        selectedVibes.includes(
          vibe
        )
      ) {

        setSelectedVibes(
          selectedVibes.filter(
            (v) =>
              v !== vibe
          )
        );

      } else {

        if (
          selectedVibes.length >= 7
        ) {

          return;

        }

        setSelectedVibes([
          ...selectedVibes,
          vibe,
        ]);

      }

    };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative px-6 py-10">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] top-[-180px] left-[-150px]"></div>

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[160px] bottom-[-180px] right-[-150px]"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 max-w-6xl mx-auto"
      >

        <h1 className="text-6xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          PICK YOUR VIBES
        </h1>

        <p className="text-center text-zinc-400 mt-4 text-lg">
          Select what matches your personality
        </p>

        <p className="text-center text-cyan-400 mt-5 font-bold text-xl">
          {selectedVibes.length}/7 vibes selected
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

          {vibes.map((vibe,
            index) => {

            const Icon =
              vibe.icon;

            const isSelected =
              selectedVibes.includes(
                vibe.name
              );

            return (
              <motion.button
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() =>
                  toggleVibe(
                    vibe.name
                  )
                }
                className={`relative overflow-hidden rounded-[30px] border p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 backdrop-blur-xl min-h-[170px]

                ${
                  isSelected
                    ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
                    : "bg-white/5 border-white/10 hover:border-cyan-400/50"
                }
                `}
              >

                <div
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300

                  ${
                    isSelected
                      ? "bg-green-400 text-black scale-100"
                      : "bg-white/10 scale-0"
                  }
                  `}
                >
                  <Check
                    size={18}
                  />
                </div>

                <div
                  className={`p-5 rounded-2xl transition-all duration-300

                  ${
                    isSelected
                      ? "bg-cyan-400/20"
                      : "bg-white/5"
                  }
                  `}
                >
                  <Icon
                    size={40}
                    className={
                      isSelected
                        ? "text-cyan-300"
                        : "text-white"
                    }
                  />
                </div>

                <h2 className="text-lg font-bold text-center">
                  {vibe.name}
                </h2>

              </motion.button>
            );
          })}

        </div>

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
            delay: 0.5,
          }}
          className="flex justify-center mt-14"
        >

          <button
            disabled={
              selectedVibes.length === 0
            }
            onClick={async () => {

              try {

                const user =
                  auth.currentUser;

                if (!user) {

                  alert(
                    "No user found"
                  );

                  return;

                }

                await setDoc(
  doc(
    db,
    "users",
    user.uid
  ),

  {
    vibes:
      selectedVibes,
  },

  {
    merge: true,
  }
);

                setScreen(
                  "home"
                );

              } catch (error) {

                console.log(
                  error
                );

                alert(
                  "Failed to save vibes"
                );

              }

            }}
            className={`px-14 py-5 rounded-3xl text-white font-black text-xl transition-all duration-300

            ${
              selectedVibes.length > 0
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 shadow-[0_0_50px_rgba(0,255,255,0.3)]"
                : "bg-zinc-700 cursor-not-allowed"
            }
            `}
          >
            NEXT →
          </button>

        </motion.div>

      </motion.div>

    </div>
  );
}