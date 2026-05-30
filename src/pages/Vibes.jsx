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
  Laugh,
  Ghost,
  Flame,
  Stars,
  Zap,
  Headphones,
  Clapperboard,
  Laptop,
  Mountain,
  Sun,
  CloudMoon,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

const sections = [

  {
    title: "Your Core Vibe",
    subtitle: "What defines your personality?",
    limit: 3,

    options: [

      {
        name: "Chaotic",
        icon: Zap,
      },

      {
        name: "Deep",
        icon: Brain,
      },

      {
        name: "Funny",
        icon: Laugh,
      },

      {
        name: "Chill",
        icon: CloudMoon,
      },

      {
        name: "Creative",
        icon: Palette,
      },

      {
        name: "Romantic",
        icon: Heart,
      },

      {
        name: "Ambitious",
        icon: Trophy,
      },

      {
        name: "Night Owl",
        icon: Moon,
      },

    ],
  },

  {
    title: "Your Interests",
    subtitle: "Choose what you genuinely enjoy",
    limit: 6,

    options: [

      {
        name: "Music",
        icon: Music,
      },

      {
        name: "Gaming",
        icon: Gamepad2,
      },

      {
        name: "Coding",
        icon: Code2,
      },

      {
        name: "Movies",
        icon: Film,
      },

      {
        name: "Travel",
        icon: Plane,
      },

      {
        name: "Photography",
        icon: Camera,
      },

      {
        name: "Reading",
        icon: BookOpen,
      },

      {
        name: "Anime",
        icon: Sparkles,
      },

      {
        name: "Sports",
        icon: Dumbbell,
      },

      {
        name: "Fashion",
        icon: Shirt,
      },

      {
        name: "Food",
        icon: Pizza,
      },

      {
        name: "Startups",
        icon: Laptop,
      },

    ],
  },

  {
    title: "Social Energy",
    subtitle: "How do you connect with people?",
    limit: 2,

    options: [

      {
        name: "Introvert",
        icon: Headphones,
      },

      {
        name: "Extrovert",
        icon: Flame,
      },

      {
        name: "Yapper",
        icon: Mic2,
      },

      {
        name: "Listener",
        icon: Coffee,
      },

      {
        name: "Overthinker",
        icon: Brain,
      },

      {
        name: "Observer",
        icon: Stars,
      },

    ],
  },

  {
    title: "Lifestyle",
    subtitle: "Your everyday energy",
    limit: 4,

    options: [

      {
        name: "Gym",
        icon: Dumbbell,
      },

      {
        name: "Coffee Lover",
        icon: Coffee,
      },

      {
        name: "Late Nights",
        icon: Moon,
      },

      {
        name: "Travel Freak",
        icon: Mountain,
      },

      {
        name: "Aesthetic",
        icon: Sparkles,
      },

      {
        name: "Minimal",
        icon: Sun,
      },

      {
        name: "Party Person",
        icon: Flame,
      },

      {
        name: "Calm Soul",
        icon: CloudMoon,
      },

    ],
  },

  {
    title: "Entertainment",
    subtitle: "What keeps you entertained?",
    limit: 4,

    options: [

      {
        name: "Netflix",
        icon: Clapperboard,
      },

      {
        name: "Dark Humor",
        icon: Ghost,
      },

      {
        name: "Memes",
        icon: Laugh,
      },

      {
        name: "Podcasts",
        icon: Headphones,
      },

      {
        name: "Concerts",
        icon: Music,
      },

      {
        name: "Football",
        icon: Trophy,
      },

      {
        name: "Singing",
        icon: Mic2,
      },

      {
        name: "Art",
        icon: Palette,
      },

    ],
  },

];

export default function Vibes({

  setScreen,

}) {

  const [selected, setSelected] = useState(() => {

  try {

    return (
      JSON.parse(
        localStorage.getItem(
          "vibelink-vibes"
        )
      ) || {}
    );

  } catch {

    return {};

  }

});

  const toggleOption = (
    sectionTitle,
    optionName,
    limit
  ) => {

    const current =
      selected[sectionTitle] || [];

    let updated;

    if (
      current.includes(optionName)
    ) {

      updated =
        current.filter(
          (item) =>
            item !== optionName
        );

    } else {

      if (
        current.length >= limit
      ) {

        return;

      }

      updated = [
        ...current,
        optionName,
      ];

    }

    const newSelected = {

  ...selected,

  [sectionTitle]:
    updated,

};

setSelected(
  newSelected
);

localStorage.setItem(

  "vibelink-vibes",

  JSON.stringify(
    newSelected
  )

);

    

  };

  const canContinue =
    sections.every(

      (section) =>

        (
          selected[
            section.title
          ] || []
        ).length >= 1

    );

  return (

    <div className="min-h-screen bg-[#03040A] text-white overflow-hidden relative">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-purple-500/10"></div>

      <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-5 md:px-10 py-12 max-w-7xl mx-auto">

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

        >

          <h1 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

            BUILD YOUR VIBE

          </h1>

          <p className="text-center text-zinc-400 mt-5 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">

            Your vibe shapes the people, tribes, and conversations you’ll discover on VibeLink.

          </p>

        </motion.div>

        <div className="mt-16 space-y-16">

          {sections.map(
            (
              section,
              sectionIndex
            ) => {

              const selectedItems =
                selected[
                  section.title
                ] || [];

              return (

                <motion.div

                  key={sectionIndex}

                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay:
                      sectionIndex *
                      0.1,
                  }}

                >

                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">

                    <div>

                      <h2 className="text-2xl md:text-3xl font-black">

                        {section.title}

                      </h2>

                      <p className="text-zinc-400 mt-2">

                        {section.subtitle}

                      </p>

                    </div>

                    <div className="text-cyan-400 font-bold text-sm md:text-base">

                      {selectedItems.length}/{section.limit} selected

                    </div>

                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                    {section.options.map(
                      (
                        option,
                        index
                      ) => {

                        const Icon =
                          option.icon;

                        const isSelected =
                          selectedItems.includes(
                            option.name
                          );

                        return (

                          <motion.button

                            key={index}

                            whileHover={{
                              y: -5,
                              scale: 1.02,
                            }}

                            whileTap={{
                              scale: 0.97,
                            }}

                            onClick={() =>
                              toggleOption(
                                section.title,
                                option.name,
                                section.limit
                              )
                            }

                            className={`relative overflow-hidden rounded-[28px] border p-5 min-h-[150px] md:min-h-[170px] flex flex-col items-center justify-center gap-4 transition-all duration-300 backdrop-blur-xl

                            ${
                              isSelected

                                ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.18)]"

                                : "bg-white/5 border-white/10 hover:border-cyan-400/40"
                            }
                            `}

                          >

                            <div

                              className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300

                              ${
                                isSelected

                                  ? "bg-green-400 text-black scale-100"

                                  : "bg-white/10 scale-0"
                              }
                              `}

                            >

                              <Check
                                size={15}
                              />

                            </div>

                            <div

                              className={`p-4 rounded-2xl transition-all duration-300

                              ${
                                isSelected

                                  ? "bg-cyan-400/20"

                                  : "bg-white/5"
                              }
                              `}

                            >

                              <Icon

                                size={32}

                                className={
                                  isSelected

                                    ? "text-cyan-300"

                                    : "text-zinc-200"
                                }

                              />

                            </div>

                            <h3 className="text-center font-bold text-sm md:text-base">

                              {option.name}

                            </h3>

                          </motion.button>

                        );

                      }
                    )}

                  </div>

                </motion.div>

              );

            }
          )}

        </div>

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
            delay: 0.5,
          }}

          className="flex justify-center mt-20"

        >

          <button

            disabled={!canContinue}

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
                      selected,
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

            className={`px-12 py-5 rounded-3xl text-white font-black text-lg md:text-xl transition-all duration-300

            ${
              canContinue

                ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 shadow-[0_0_40px_rgba(0,255,255,0.25)]"

                : "bg-zinc-700 cursor-not-allowed"
            }
            `}

          >

            ENTER VIBE →

          </button>

        </motion.div>

      </div>

    </div>

  );

}