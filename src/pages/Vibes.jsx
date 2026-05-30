import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import {
  ArrowLeft,
  ArrowRight,
  IndianRupee,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Camera,
  Car,
  Check,
  CircleUserRound,
  Clapperboard,
  CloudMoon,
  Code2,
  Compass,
  Dumbbell,
  Eye,
  Film,
  Flame,
  Gamepad2,
  Gauge,
  Headphones,
  HeartHandshake,
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
  MonitorPlay,
  Zap,
} from "lucide-react";
import { auth, db } from "../firebase/firebase";

const INITIAL_SELECTIONS = {
  personality: [],
  interests: [],
};

const SELECTION_SCREENS = [
  {
    key: "personality",
    title: "Your Vibe",
    subtitle: "What feels most like you?",
    limit: 6,
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
      { name: "Introvert", icon: Headphones },
      { name: "Extrovert", icon: Flame },
      { name: "Listener", icon: MessageCircle },
      { name: "Talkative", icon: Mic2 },
      { name: "Observer", icon: Eye },
      { name: "Social Butterfly", icon: PartyPopper },
      { name: "Small Circle Person", icon: HeartHandshake },
    ],
  },
  {
    key: "interests",
    title: "Your World",
    subtitle: "What are you into?",
    limit: 10,
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
      { name: "Badminton", icon: Trophy },
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
      { name: "Investing", icon: IndianRupee },
      { name: "Memes", icon: Laugh },
      { name: "Podcasts", icon: Podcast },
      { name: "Netflix", icon: Clapperboard },
      { name: "YouTube", icon: MonitorPlay },
      { name: "Concerts", icon: Music },
      { name: "Singing", icon: Mic2 },
      { name: "Dancing", icon: PartyPopper },
      { name: "Stand-up Comedy", icon: Laugh },
      { name: "Formula 1", icon: Gauge },
    ],
  },
];

const SCREEN_COUNT = 3;
const SUMMARY_SCREEN_INDEX = 2;

const PAGE_VARIANTS = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 44 : -44,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -44 : 44,
  }),
};

function getSafeSelections(selections) {
  return {
    personality: Array.isArray(selections?.personality)
      ? [...selections.personality]
      : [],
    interests: Array.isArray(selections?.interests)
      ? [...selections.interests]
      : [],
  };
}

function SummaryCard({ title, values, icon: Icon, gradient }) {
  const safeValues = Array.isArray(values) ? values : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl sm:p-6"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[70px] ${gradient}`}
      />

      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.075] text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.12)]">
          <Icon size={24} />
        </div>

        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2.5">
        {safeValues.map((value) => (
          <span
            key={value}
            className="rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 px-3.5 py-2 text-xs font-bold text-zinc-100 shadow-[0_0_16px_rgba(34,211,238,0.08)] sm:text-sm"
          >
            {value}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Vibes({ setScreen }) {
  const [selected, setSelected] = useState(() => ({
    ...INITIAL_SELECTIONS,
  }));
  const [screenIndex, setScreenIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const safeSelections = useMemo(
    () => getSafeSelections(selected),
    [selected]
  );

  const isSummaryScreen = screenIndex === SUMMARY_SCREEN_INDEX;
  const activeScreen = SELECTION_SCREENS[screenIndex] || null;

  const selectedItems = useMemo(() => {
    if (!activeScreen?.key) return [];

    const values = safeSelections[activeScreen.key];
    return Array.isArray(values) ? values : [];
  }, [activeScreen, safeSelections]);

  const selectedCount =
    safeSelections.personality.length + safeSelections.interests.length;

  const toggleOption = (optionName) => {
    if (
      saving ||
      !activeScreen?.key ||
      typeof optionName !== "string"
    ) {
      return;
    }

    setError("");

    setSelected((previousSelected) => {
      const safePreviousSelections = getSafeSelections(previousSelected);
      const currentValues = Array.isArray(
        safePreviousSelections[activeScreen.key]
      )
        ? safePreviousSelections[activeScreen.key]
        : [];

      const isSelected = currentValues.includes(optionName);

      if (!isSelected && currentValues.length >= activeScreen.limit) {
        return safePreviousSelections;
      }

      return {
        ...safePreviousSelections,
        [activeScreen.key]: isSelected
          ? currentValues.filter((item) => item !== optionName)
          : [...currentValues, optionName],
      };
    });
  };

  const goBack = () => {
    if (saving || screenIndex <= 0) return;

    setError("");
    setDirection(-1);
    setScreenIndex((previousIndex) => Math.max(0, previousIndex - 1));
  };

  const goForward = () => {
    if (saving || !activeScreen?.key) return;

    if (selectedItems.length === 0) {
      setError("Pick at least one option to continue.");
      return;
    }

    setError("");
    setDirection(1);
    setScreenIndex((previousIndex) =>
      Math.min(SUMMARY_SCREEN_INDEX, previousIndex + 1)
    );
  };

  const saveVibesAndContinue = async () => {
    if (saving || !isSummaryScreen) return;

    if (
      safeSelections.personality.length === 0 ||
      safeSelections.interests.length === 0
    ) {
      setError("Choose at least one vibe and one interest before entering.");
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
          vibes: {
            personality: [...safeSelections.personality],
            interests: [...safeSelections.interests],
          },
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
    <div className="relative min-h-screen overflow-hidden bg-[#03040A] text-white"style={{
  paddingTop: "env(safe-area-inset-top)"
}}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none absolute -left-32 -top-24 h-[340px] w-[340px] rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[380px] w-[380px] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[100px]" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-6 sm:px-6 md:px-10 md:pb-12 md:pt-10"style={{
  paddingTop: "env(safe-area-inset-top)"
}}>
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
              {screenIndex + 1} of {SCREEN_COUNT}
            </div>
          </div>

          <div className="mt-7 flex gap-2">
            {Array.from({ length: SCREEN_COUNT }).map((_, index) => (
              <div
                key={index}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  initial={false}
                  animate={{
                    width: index <= screenIndex ? "100%" : "0%",
                    opacity: index <= screenIndex ? 1 : 0,
                  }}
                  transition={{ duration: 0.35 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-zinc-500 sm:text-xs">
            <span>{selectedCount} vibes selected</span>

            <span>
              {isSummaryScreen
                ? "Ready to enter"
                : `Pick up to ${activeScreen?.limit || 0}`}
            </span>
          </div>
        </motion.header>

        <section className="mt-10 flex flex-1 flex-col md:mt-14">
          <AnimatePresence mode="wait" custom={direction}>
            {isSummaryScreen ? (
              <motion.div
                key="summary"
                custom={direction}
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.34, ease: "easeOut" }}
                className="flex flex-1 flex-col"
              >
                <div className="mx-auto w-full max-w-3xl">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] border border-cyan-300/25 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-cyan-200 shadow-[0_0_38px_rgba(34,211,238,0.2)]"
                    >
                      <Sparkles size={31} />
                    </motion.div>

                    <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
                      Your tribe starts here
                    </p>

                    <h1 className="mt-3 bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl">
                      Your Vibe Profile
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
                      Here&apos;s the energy you&apos;re bringing into VibeLink.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-4">
                    <SummaryCard
                      title="Your Vibe"
                      values={safeSelections.personality}
                      icon={WandSparkles}
                      gradient="bg-cyan-400/25"
                    />

                    <SummaryCard
                      title="Your World"
                      values={safeSelections.interests}
                      icon={Compass}
                      gradient="bg-purple-500/25"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={activeScreen?.key || "selection"}
                custom={direction}
                variants={PAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.34, ease: "easeOut" }}
                className="flex flex-1 flex-col"
              >
                <div className="mb-7 sm:mb-9">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
                    Step {screenIndex + 1}
                  </p>

                  <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                    {activeScreen?.title || ""}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <p className="text-base font-medium leading-relaxed text-zinc-400 sm:text-lg">
                      {activeScreen?.subtitle || ""}
                    </p>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300">
                      {selectedItems.length}/{activeScreen?.limit || 0} selected
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {(Array.isArray(activeScreen?.options)
                    ? activeScreen.options
                    : []
                  ).map((option, optionIndex) => {
                    const Icon = option.icon;
                    const isSelected = selectedItems.includes(option.name);

                    return (
                      <motion.button
                        key={option.name}
                        type="button"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: Math.min(optionIndex * 0.025, 0.3),
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
            )}
          </AnimatePresence>
        </section>

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
              disabled={screenIndex === 0 || saving}
              className="flex min-h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-200 transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto sm:px-6"
            >
              <ArrowLeft size={20} />
              <span className="hidden pl-2 font-bold sm:inline">Back</span>
            </button>

            {isSummaryScreen ? (
              <button
                type="button"
                onClick={saveVibesAndContinue}
                disabled={saving}
                className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 text-sm font-black tracking-wide text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:text-base"
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
                disabled={selectedItems.length === 0 || saving}
                className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 text-sm font-black tracking-wide text-white shadow-[0_0_35px_rgba(34,211,238,0.2)] transition-all duration-300 hover:scale-[1.015] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100 sm:text-base"
              >
                {screenIndex === 1 ? "SEE MY VIBE PROFILE" : "NEXT"}
                <ArrowRight size={19} />
              </button>
            )}
          </div>
        </motion.footer>
      </main>
    </div>
  );
}