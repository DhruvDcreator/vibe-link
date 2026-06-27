import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import vibeWordmark from "../assets/branding/vibelink-wordmark.png";
import { Crown } from "lucide-react";
import { auth } from "../firebase/firebase";

import DailyTasks from "./vibe/DailyTasks";
import AnonymousVibe from "./vibe/AnonymousVibe";
import Leaderboard from "./vibe/Leaderboard";
import QuestionZeroCard from "./vibe/QuestionZeroCard";
import LinkComingSoon from "../components/link/LinkComingSoon";

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-16 rounded-[24px] bg-white/[0.06]" />
      <div className="h-24 rounded-[24px] bg-white/[0.06]" />
      <div className="h-28 rounded-[24px] bg-white/[0.06]" />
      <div className="h-56 rounded-[30px] bg-white/[0.06]" />
      <div className="h-72 rounded-[30px] bg-white/[0.06]" />
    </div>
  );
}

function ModeSwitch({ mode, onChange }) {
  return (
    <div className="
relative
grid
grid-cols-2
rounded-2xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-1
shadow-[0_8px_30px_rgba(0,0,0,0.35)]
">
      {["vibe", "link"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className="
relative
z-10
flex
items-center
justify-center
py-3
text-sm
font-bold
transition-all
duration-300
"
        >
          {mode === item && (
            <motion.div
              layoutId="vibelink-mode"
              className={`absolute inset-0 rounded-xl ${
                mode === "vibe"
                  ? "bg-gradient-to-r from-[#122033] via-[#17324A] to-[#214761]"
                  : "bg-gradient-to-r from-[#171A2A] via-[#24244A] to-[#31295A]"
              }`}
              transition={{
  type: "spring",
  stiffness: 180,
  damping: 20,
  mass: 0.8,
}}
            />
          )}

          <span
            className={`relative transition-colors duration-300 ${
              mode === item ? "text-white" : "text-white/55"
            }`}
          >
            {item.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function VibeHome({
  userData,
  people,
  setCurrentTab,
  setSelectedChatUser,
  mode,
  setMode,
}) {
  const uid = auth?.currentUser?.uid || userData?.uid || "";
  const birthDate = userData?.dob
  ? new Date(userData.dob)
  : null;

const today = new Date();

let age = 17;

if (birthDate) {
  age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDiff =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (
      monthDiff === 0 &&
      today.getDate() <
      birthDate.getDate()
    )
  ) {
    age--;
  }
}

const unlockDateObj =
  birthDate
    ? new Date(
        birthDate.getFullYear() + 17,
        birthDate.getMonth(),
        birthDate.getDate()
      )
    : null;

const daysRemaining =
  unlockDateObj
    ? Math.max(
        0,
        Math.ceil(
          (unlockDateObj - today) /
          (1000 * 60 * 60 * 24)
        )
      )
    : 0;

const unlockDate =
  unlockDateObj
    ? unlockDateObj.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "";
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [loading] = useState(false);
  const [error] = useState("");

  const changeMode = (nextMode) => {
    setMode(nextMode);
  };

  const openChat = (person) => {
    if (!person) return;

    if (typeof setSelectedChatUser === "function") {
      setSelectedChatUser(person);
    }

    if (typeof setCurrentTab === "function") {
      setCurrentTab("chatRoom");
    }
  };
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#03040A] text-white">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none fixed -left-28 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="pointer-events-none fixed -bottom-24 -right-20 h-80 w-80 rounded-full bg-purple-500/15 blur-[110px]" />

      <main
        className="relative z-10 mx-auto max-w-5xl px-4 pb-28 sm:px-6"
        style={{
          paddingTop: "max(20px, env(safe-area-inset-top))",
        }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={vibeWordmark}
              alt="VibeLink"
              className="h-5 w-auto object-contain"
            />
          </div>

          {mode === "vibe" && (
  <button
    type="button"
    onClick={() => setLeaderboardOpen(true)}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-white/[0.06] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-xl"
  >
    <Crown size={20} />
  </button>
)}
        </nav>

        <div className="mt-6">
          <ModeSwitch mode={mode} onChange={changeMode} />

          <AnimatePresence
  mode="wait"
  initial={false}
>
            <motion.h1
              key={mode}
              initial={{
  opacity: 0,
  y: 20,
  scale: 0.98,
}}
animate={{
  opacity: 1,
  y: 0,
  scale: 1,
}}
exit={{
  opacity: 0,
  y: -20,
  scale: 0.98,
}}
              transition={{
  type: "spring",
  stiffness: 120,
  damping: 18,
}}
              className="mt-7 text-center text-3xl font-black tracking-tight sm:text-4xl"
            >
              {mode === "vibe" ? "Find Your People" : "Build Your Circle"}
            </motion.h1>
            <AnimatePresence>
  {mode === "link" && (
    <motion.p
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      mt-2
      text-center
      text-sm
      font-bold
      tracking-[0.2em]
      text-cyan-300
      "
    >
      UNDER DEVELOPMENT
    </motion.p>
  )}
</AnimatePresence>
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="mt-9">
            <Skeleton />
          </div>
        ) : error ? (
          <div className="mt-9 rounded-[24px] border border-red-300/15 bg-red-400/10 p-5 text-center text-sm font-bold text-red-200">
            {error}
          </div>
        ) : (
  <AnimatePresence mode="wait">
    {mode === "vibe" ? (
      <motion.div
        key="vibe"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="mt-9 space-y-10"
      >
        <QuestionZeroCard
  setCurrentTab={setCurrentTab}
/>

<DailyTasks
  uid={uid}
  userData={userData}
/>

<AnonymousVibe
  uid={uid}
  userData={userData}
/>
      </motion.div>
    ) : (
      <motion.div
        key="link"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
        className="mt-9"
      >
        <LinkComingSoon age={age} />
      </motion.div>
    )}
  </AnimatePresence>
)}
        
      </main>

      {leaderboardOpen && (
        <Leaderboard
          uid={uid}
          userData={userData}
          onClose={() => setLeaderboardOpen(false)}
        />
      )}
    </div>
  );
}