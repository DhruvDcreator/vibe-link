/*
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
*/
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CalendarCheck,
  Camera,
  Car,
  Check,
  CircleUserRound,
  Clapperboard,
  CloudMoon,
  Code2,
  Coffee,
  Compass,
  Dumbbell,
  Eye,
  Film,
  Flame,
  Gamepad2,
  Headphones,
  HeartHandshake,
  IndianRupee,
  Laugh,
  Lightbulb,
  MessageCircle,
  Mic2,
  Mountain,
  Music,
  Palette,
  PartyPopper,
  Plane,
  Podcast,
  Rocket,
  Shirt,
  Sparkles,
  Sun,
  Trophy,
  Utensils,
  WandSparkles,
  Youtube,
  Zap,
} from "lucide-react";
import { auth, db } from "../firebase/firebase";

const INITIAL_SELECTIONS = {
  coreVibe: [],
  interests: [],
  socialStyle: [],
  lifestyle: [],
  entertainment: [],
};

const SECTIONS = [
  {
    key: "coreVibe",
    title: "Your Core Vibe",
    question: "What best describes you?",
    limit: 3,
    options: [
      { name: "Chill", icon: CloudMoon },
      { name: "Funny", icon: Laugh },
      { name: "Ambitious", icon: Trophy },
      { name: "Creative", icon: Palette },
      { name: "Deep Thinker", icon: Brain },
      { name: "Curious", icon: Lightbulb },
      { name: "Adventurous", icon: Compass },
      { name: "Night Owl", icon: CloudMoon },
      { name: "Optimistic", icon: Sun },
      { name: "Calm", icon: HeartHandshake },
      { name: "Energetic", icon: Zap },
      { name: "Independent", icon: CircleUserRound },
    ],
  },
  {
    key: "interests",
    title: "Things You Enjoy",
    question: "What are you genuinely into?",
    limit: 6,
    options: [
      { name: "Music", icon: Music },
      { name: "Movies", icon: Film },
      { name: "Gaming", icon: Gamepad2 },
      { name: "Travel", icon: Plane },
      { name: "Photography", icon: Camera },
      { name: "Reading", icon: BookOpen },
      { name: "Coding", icon: Code2 },
      { name: "Cricket", icon: Trophy },
      { name: "Football", icon: Trophy },
      { name: "Fitness", icon: Dumbbell },
      { name: "Food", icon: Utensils },
      { name: "Anime", icon: Sparkles },
      { name: "Fashion", icon: Shirt },
      { name: "Art", icon: Palette },
      { name: "Business", icon: BriefcaseBusiness },
      { name: "Startups", icon: Rocket },
      { name: "Content Creation", icon: Camera },
      { name: "Tech", icon: Code2 },
      { name: "Cars", icon: Car },
      { name: "Nature", icon: Mountain },
      { name: "IPL", icon: Trophy },
      { name: "Badminton", icon: Trophy },
      { name: "Finance", icon: IndianRupee },
    ],
  },
  {
    key: "socialStyle",
    title: "How You Connect",
    question: "What feels most like you?",
    limit: 2,
    options: [
      { name: "Introvert", icon: Headphones },
      { name: "Extrovert", icon: Flame },
      { name: "Listener", icon: Coffee },
      { name: "Talkative", icon: Mic2 },
      { name: "Observer", icon: Eye },
      { name: "Social Butterfly", icon: PartyPopper },
      { name: "One-on-One Person", icon: MessageCircle },
      { name: "Small Circle Person", icon: HeartHandshake },
    ],
  },
  {
    key: "lifestyle",
    title: "Lifestyle",
    question: "What matches your everyday energy?",
    limit: 4,
    options: [
      { name: "Coffee Lover", icon: Coffee },
      { name: "Early Bird", icon: Sun },
      { name: "Late Nights", icon: CloudMoon },
      { name: "Gym", icon: Dumbbell },
      { name: "Traveler", icon: Plane },
      { name: "Minimalist", icon: Sparkles },
      { name: "Aesthetic", icon: WandSparkles },
      { name: "Planner", icon: CalendarCheck },
      { name: "Spontaneous", icon: Zap },
      { name: "Calm Soul", icon: HeartHandshake },
    ],
  },
  {
    key: "entertainment",
    title: "Entertainment",
    question: "What keeps you entertained?",
    limit: 4,
    options: [
      { name: "Memes", icon: Laugh },
      { name: "Podcasts", icon: Podcast },
      { name: "Netflix", icon: Clapperboard },
      { name: "YouTube", icon: Youtube },
      { name: "Concerts", icon: Music },
      { name: "Singing", icon: Mic2 },
      { name: "Dancing", icon: PartyPopper },
      { name: "Stand-up Comedy", icon: Laugh },
      { name: "Football", icon: Trophy },
      { name: "Cricket", icon: Trophy },
    ],
  },
];

const PAGE_VARIANTS = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 42 : -42,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -42 : 42,
  }),
};

function getSafeSelections(selected) {
  return {
    coreVibe: Array.isArray(selected?.coreVibe) ? [...selected.coreVibe] : [],
    interests: Array.isArray(selected?.interests) ? [...selected.interests] : [],
    socialStyle: Array.isArray(selected?.socialStyle)
      ? [...selected.socialStyle]
      : [],
    lifestyle: Array.isArray(selected?.lifestyle) ? [...selected.lifestyle] : [],
    entertainment: Array.isArray(selected?.entertainment)
      ? [...selected.entertainment]
      : [],
  };
}

function VibeProfileRow({ label, values }) {
  const safeValues = Array.isArray(values) ? values : [];

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold leading-relaxed text-zinc-300">
        {safeValues.length > 0 ? safeValues.join(" • ") : "Not selected yet"}
      </p>
    </div>
  );
}

export default function Vibes({ setScreen }) {
  const [selected, setSelected] = useState(() => ({
    ...INITIAL_SELECTIONS,
  }));
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const section = SECTIONS[stepIndex] || SECTIONS[0];
  const selectedItems = Array.isArray(selected?.[section.key])
    ? selected[section.key]
    : [];

  const currentStepComplete = selectedItems.length > 0;
  const isLastStep = stepIndex === SECTIONS.length - 1;

  const completedSteps = useMemo(
    () =>
      SECTIONS.filter((item) => {
        const values = selected?.[item.key];
        return Array.isArray(values) && values.length > 0;
      }).length,
    [selected]
  );

  const safeSelections = useMemo(
    () => getSafeSelections(selected),
    [selected]
  );

  const toggleOption = (optionName) => {
    if (saving || typeof optionName !== "string") return;

    setError("");

    setSelected((previousSelected) => {
      const safePreviousSelections = getSafeSelections(previousSelected);
      const currentValues = safePreviousSelections[section.key];
      const isSelected = currentValues.includes(optionName);

      if (!isSelected && currentValues.length >= section.limit) {
        return safePreviousSelections;
      }

      return {
        ...safePreviousSelections,
        [section.key]: isSelected
          ? currentValues.filter((item) => item !== optionName)
          : [...currentValues, optionName],
      };
    });
  };

  const goBack = () => {
    if (saving || stepIndex <= 0) return;

    setError("");
    setDirection(-1);
    setStepIndex((previousIndex) => Math.max(0, previousIndex - 1));
  };

  const goForward = () => {
    if (saving || !currentStepComplete || isLastStep) return;

    setError("");
    setDirection(1);
    setStepIndex((previousIndex) =>
      Math.min(SECTIONS.length - 1, previousIndex + 1)
    );
  };

  const saveVibesAndContinue = async ({ allowIncomplete = false } = {}) => {
    if (saving) return;

    const allSectionsComplete = SECTIONS.every((item) => {
      const values = safeSelections[item.key];
      return Array.isArray(values) && values.length > 0;
    });

    if (!allowIncomplete && !allSectionsComplete) {
      setError("Choose at least one vibe in every section before entering.");
      return;
    }

    const currentUser = auth?.currentUser;

    if (!currentUser?.uid) {
      setError("Your account is still loading. Please try again in a moment.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          vibes: getSafeSelections(safeSelections),
        },
        {
          merge: true,
        }
      );

      if (typeof setScreen === "function") {
        setScreen("home");
      }
    } catch (saveError) {
      console.error("Unable to save vibes:", saveError);
      setError("Something went wrong while saving your vibe. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03040A] text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none absolute -left-32 -top-24 h-[340px] w-[340px] rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[100px]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-6 md:px-10 md:pb-12 md:pt-10">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-xs font-black uppercase tracking-[0.28em] text-transparent sm:text-sm">
                VibeLink
              </p>

              <p className="mt-1 text-xs font-medium text-zinc-500">
                Your Vibe. Your Tribe.
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-cyan-300 backdrop-blur-xl sm:text-sm">
              {stepIndex + 1} of {SECTIONS.length}
            </div>
          </div>

          <div className="mt-7 flex gap-2">
            {SECTIONS.map((item, index) => {
              const values = selected?.[item.key];
              const isComplete = Array.isArray(values) && values.length > 0;
              const isActive = index === stepIndex;

              return (
                <div
                  key={item.key}
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      width: isComplete || isActive ? "100%" : "0%",
                      opacity: isComplete || isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className={`h-full rounded-full ${
                      isComplete
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500"
                        : "bg-cyan-400/70"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-zinc-500 sm:text-xs">
            <span>{completedSteps} sections shaped</span>
            <span>Pick up to {section.limit}</span>
          </div>
        </motion.header>

        <section className="mt-10 flex flex-1 flex-col md:mt-14">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={section.key}
              custom={direction}
              variants={PAGE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="flex flex-1 flex-col"
            >
              <div className="mb-7 sm:mb-9">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
                  Step {stepIndex + 1}
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  {section.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <p className="text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
                    {section.question}
                  </p>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                    {selectedItems.length}/{section.limit} selected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {section.options.map((option, optionIndex) => {
                  const Icon = option.icon;
                  const isSelected = selectedItems.includes(option.name);

                  return (
                    <motion.button
                      key={option.name}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: Math.min(optionIndex * 0.035, 0.35),
                        duration: 0.3,
                      }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleOption(option.name)}
                      aria-pressed={isSelected}
                      className={`relative flex min-h-[142px] flex-col items-center justify-center gap-3 overflow-hidden rounded-[26px] border p-4 text-center backdrop-blur-xl transition-colors duration-300 sm:min-h-[160px] sm:gap-4 sm:p-5 ${
                        isSelected
                          ? "border-cyan-300/80 bg-gradient-to-br from-cyan-500/25 to-purple-500/25 shadow-[0_0_34px_rgba(34,211,238,0.16)]"
                          : "border-white/10 bg-white/[0.045] hover:border-cyan-300/35 hover:bg-white/[0.07]"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/15"
                        />
                      )}

                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isSelected ? 1 : 0,
                          scale: isSelected ? 1 : 0.55,
                        }}
                        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 text-[#03040A] shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                      >
                        <Check size={16} strokeWidth={3.5} />
                      </motion.div>

                      <motion.div
                        initial={false}
                        animate={{
                          scale: isSelected ? 1.08 : 1,
                          rotate: isSelected ? -3 : 0,
                        }}
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors duration-300 sm:h-16 sm:w-16 ${
                          isSelected
                            ? "border-cyan-300/30 bg-gradient-to-br from-cyan-400/25 to-purple-500/25 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
                            : "border-white/10 bg-white/[0.055]"
                        }`}
                      >
                        <Icon
                          size={29}
                          strokeWidth={2}
                          className={
                            isSelected ? "text-cyan-200" : "text-zinc-300"
                          }
                        />
                      </motion.div>

                      <span className="relative text-sm font-black leading-tight text-zinc-100 sm:text-base">
                        {option.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {isLastStep && (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-9 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/[0.045] to-purple-500/10 p-5 backdrop-blur-2xl sm:mt-12 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                <Sparkles size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black sm:text-2xl">
                  Your Vibe Profile
                </h2>

                <p className="mt-1 text-xs font-medium text-zinc-500">
                  A quick look at the energy you are bringing.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <VibeProfileRow
                label="Core Vibe"
                values={safeSelections.coreVibe}
              />

              <VibeProfileRow
                label="Interests"
                values={safeSelections.interests}
              />

              <VibeProfileRow
                label="Social Style"
                values={safeSelections.socialStyle}
              />

              <VibeProfileRow
                label="Lifestyle"
                values={safeSelections.lifestyle}
              />

              <VibeProfileRow
                label="Entertainment"
                values={safeSelections.entertainment}
              />
            </div>
          </motion.section>
        )}

        <motion.footer
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-9 rounded-[28px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl sm:mt-12 sm:p-4"
        >
          {error && (
            <p className="mb-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-center text-sm font-semibold text-red-200">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0 || saving}
              className="flex min-h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200 transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto sm:px-6"
            >
              <ArrowLeft size={20} />
              <span className="hidden pl-2 font-bold sm:inline">Back</span>
            </button>

            {isLastStep ? (
              <button
                type="button"
                onClick={() => saveVibesAndContinue()}
                disabled={!currentStepComplete || saving}
                className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 text-sm font-black tracking-wide text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100 sm:text-base"
              >
                {saving ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    SAVING YOUR VIBE
                  </>
                ) : (
                  <>
                    ENTER VIBE
                    <Sparkles size={18} />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={goForward}
                disabled={!currentStepComplete || saving}
                className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 text-sm font-black tracking-wide text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100 sm:text-base"
              >
                KEEP GOING
                <ArrowRight size={19} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => saveVibesAndContinue({ allowIncomplete: true })}
            disabled={saving}
            className="mx-auto mt-4 block rounded-xl px-4 py-2 text-xs font-bold text-zinc-500 transition-colors duration-300 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
          >
            Skip for now
          </button>
        </motion.footer>
      </main>
    </div>
  );
}