// src/components/VibeHome.jsx

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Crown,
  Ghost,
  LoaderCircle,
  Lock,
  MessageCircle,
  Music,
  Pin,
  PinOff,
  Plus,
  Radio,
  RefreshCw,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { auth } from "../firebase/firebase";
import vibeLogo from "../assets/branding/vibelink-logo.png";
import vibeWordmark from "../assets/branding/vibelink-wordmark.png";
import {
  FALLBACK_PROFILE,
  calculateCompatibility,
  createAnonymousRoom,
  createStory,
  flattenVibes,
  loadDailyTasks,
  loadLeaderboard,
  loadPins,
  loadRouletteUsers,
  loadStories,
  markStoryViewed,
  revealAnonymousProfile,
  safeArray,
  savePins,
  saveRouletteSpin,
} from "../services/vibeHomeFirestore";

const TRIBES = [
  { id: "movies", name: "Movie Lovers", icon: "🎬", members: 1840 },
  { id: "tech", name: "Tech India", icon: "⚡", members: 1320 },
  { id: "night", name: "Night Owls", icon: "🌙", members: 980 },
  { id: "gaming", name: "Gaming Arena", icon: "🎮", members: 860 },
];

const ROULETTE_CATEGORIES = ["Movies", "Tech", "Gaming", "Music", "Travel", "Cricket"];
const STORY_CATEGORIES = ["Movies", "Music", "Anime", "Gaming", "Tech", "Travel", "Cricket", "Fitness", "Coding"];
const STORY_TYPES = ["photo", "poll", "question", "meme", "video"];
const ICEBREAKERS = ["2 Truths & 1 Lie", "This or That", "Rapid Fire", "Guess My Favourite"];

function Avatar({ src, name, className = "" }) {
  return (
    <img
      src={src || FALLBACK_PROFILE}
      alt={`${name || "VibeLink user"} profile`}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_PROFILE;
      }}
      className={`object-cover ${className}`}
    />
  );
}

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

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-black tracking-tight sm:text-2xl">{children}</h2>
      {subtitle && <p className="mt-1 text-xs font-semibold text-zinc-500">{subtitle}</p>}
    </div>
  );
}

function ModeSwitch({ mode, onChange }) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.055] p-1.5 backdrop-blur-2xl">
      {["vibe", "link"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className="relative flex min-h-11 items-center justify-center rounded-xl text-xs font-black tracking-[0.2em]"
        >
          {mode === item && (
            <motion.div
              layoutId="vibelink-mode"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_24px_rgba(34,211,238,0.2)]"
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
            />
          )}
          <span className={`relative ${mode === item ? "text-white" : "text-zinc-500"}`}>
            {item.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}

function DailyTasks({ tasks, rewardClaimed }) {
  const [expanded, setExpanded] = useState(false);
  const completed = safeArray(tasks).filter((task) => task?.completed).length;

  return (
    <motion.div layout className="rounded-[26px] border border-white/10 bg-white/[0.055] backdrop-blur-2xl">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Zap size={21} />
        </div>
        <div className="flex-1">
          <p className="font-black">Daily Tasks</p>
          <p className="mt-1 text-xs font-semibold text-zinc-500">Complete both to earn 20 points</p>
        </div>
        <span className="text-sm font-black text-cyan-300">{completed}/2</span>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-white/[0.07] p-4">
              {safeArray(tasks).map((task) => (
                <div key={task.id} className="rounded-2xl bg-white/[0.045] p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${task.completed ? "bg-emerald-400/15 text-emerald-300" : "bg-purple-400/15 text-purple-300"}`}>
                      {task.completed ? <Check size={16} /> : <Sparkles size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{task.title}</p>
                      <p className="mt-1 text-xs font-semibold text-zinc-500">
                        {task.progress}/{task.target}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (task.progress / task.target) * 100)}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    />
                  </div>
                </div>
              ))}

              {rewardClaimed && (
                <p className="rounded-xl bg-emerald-400/10 px-3 py-2 text-center text-xs font-black text-emerald-300">
                  +20 points earned today
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StoryComposer({ uid, onClose, onCreated }) {
  const [category, setCategory] = useState("Music");
  const [type, setType] = useState("photo");
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setSaving(true);
      setError("");
      await createStory(uid, { category, type, caption, mediaUrl });
      await onCreated();
      onClose();
    } catch {
      setError("Unable to post your story right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-4 backdrop-blur-md sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#10111a] p-5"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Add Story</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Vibe category</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {STORY_CATEGORIES.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-xs font-bold ${category === item ? "bg-cyan-400 text-black" : "bg-white/[0.07] text-zinc-300"}`}>
              {item}
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Story type</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {STORY_TYPES.map((item) => (
            <button key={item} type="button" onClick={() => setType(item)} className={`rounded-xl px-2 py-3 text-xs font-bold capitalize ${type === item ? "bg-purple-500 text-white" : "bg-white/[0.07] text-zinc-300"}`}>
              {item}
            </button>
          ))}
        </div>

        <input value={mediaUrl} onChange={(event) => setMediaUrl(event.target.value)} placeholder="Media URL" className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm outline-none" />
        <textarea value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Say something to your tribe..." maxLength={220} className="mt-3 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm outline-none" />

        {error && <p className="mt-3 text-xs font-bold text-red-300">{error}</p>}

        <button type="button" onClick={submit} disabled={saving} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3.5 text-sm font-black disabled:opacity-50">
          {saving ? "POSTING..." : "POST STORY"}
        </button>
      </motion.div>
    </div>
  );
}

function VibeStories({ uid, stories, refreshStories }) {
  const [composerOpen, setComposerOpen] = useState(false);

  const openStory = async (story) => {
    if (!story?.id) return;
    await markStoryViewed(uid, story.id);
    await refreshStories();
  };

  return (
    <>
      <SectionTitle subtitle="Small moments from people on your wavelength">Vibe Stories</SectionTitle>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <button type="button" onClick={() => setComposerOpen(true)} className="shrink-0 text-center">
          <div className="flex h-17 w-17 h-[68px] items-center justify-center rounded-full border border-dashed border-cyan-300/60 bg-cyan-400/10 text-cyan-300">
            <Plus size={25} />
          </div>
          <p className="mt-2 text-[11px] font-black">Add Story</p>
        </button>

        {safeArray(stories).map((story) => (
          <button key={story.id} type="button" onClick={() => openStory(story)} className="shrink-0 text-center">
            <motion.div
              animate={story.watched ? {} : { boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 22px rgba(34,211,238,.5)", "0 0 0 rgba(34,211,238,0)"] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className={`rounded-full p-[3px] ${story.watched ? "bg-zinc-700" : "bg-gradient-to-r from-cyan-400 to-purple-500"}`}
            >
              <Avatar src={story.profilePic || story.mediaUrl} name={story.username} className="h-[62px] w-[62px] rounded-full border-2 border-[#03040A]" />
            </motion.div>
            <p className="mt-2 max-w-[70px] truncate text-[11px] font-black">{story.username || story.category}</p>
          </button>
        ))}
      </div>

      {composerOpen && <StoryComposer uid={uid} onClose={() => setComposerOpen(false)} onCreated={refreshStories} />}
    </>
  );
}

function AnonymousVibe({ uid }) {
  const [status, setStatus] = useState("idle");
  const [roomId, setRoomId] = useState("");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const start = async () => {
    try {
      setStatus("matching");
      const nextRoomId = await createAnonymousRoom(uid);
      setRoomId(nextRoomId);
      timerRef.current = setTimeout(() => setStatus("ready"), 2400);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-purple-300/15 bg-gradient-to-br from-purple-500/20 via-white/[0.055] to-cyan-500/10 p-5 backdrop-blur-2xl">
      <Ghost size={29} className="text-purple-200" />
      <h3 className="mt-4 text-xl font-black">Anonymous Vibe</h3>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-zinc-400">
        Talk anonymously for 3 minutes.<br />No profile. No judgement.<br />Just vibes.
      </p>

      {status === "matching" && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/[0.055] p-3 text-sm font-bold text-cyan-200">
          <LoaderCircle size={18} className="animate-spin" /> Finding your wavelength...
        </div>
      )}

      {status === "ready" && (
        <div className="mt-5 rounded-2xl bg-emerald-400/10 p-3 text-sm font-bold text-emerald-200">
          Match found. Your 3-minute room is ready.
        </div>
      )}

      <button type="button" onClick={start} disabled={status !== "idle"} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 py-3.5 text-sm font-black disabled:opacity-50">
        {status === "idle" ? "Start Anonymous Vibe" : status === "matching" ? "MATCHING..." : "ROOM READY"}
      </button>

      {status === "ready" && (
        <button type="button" onClick={() => revealAnonymousProfile(roomId, uid)} className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.055] py-3 text-xs font-black">
          Reveal My Profile After Chat
        </button>
      )}
    </div>
  );
}

function Roulette({ uid, userData, onVibe }) {
  const [category, setCategory] = useState("Music");
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [icebreaker, setIcebreaker] = useState("");

  const myVibes = useMemo(() => flattenVibes(userData?.vibes), [userData?.vibes]);

  const spin = async () => {
    if (spinning) return;

    setSpinning(true);
    setSelected(null);
    setIcebreaker("");

    try {
      const users = await loadRouletteUsers(uid, category);
      setPeople(users);

      const winner = users[Math.floor(Math.random() * Math.max(1, users.length))] || null;
      setRotation((value) => value + 1440 + Math.floor(Math.random() * 360));

      setTimeout(async () => {
        setSelected(winner);
        setSpinning(false);
        await saveRouletteSpin(uid, category, winner?.id);
      }, 2400);
    } catch {
      setSpinning(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/15 via-white/[0.05] to-purple-500/15 p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap gap-2">
        {ROULETTE_CATEGORIES.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-xs font-bold ${category === item ? "bg-cyan-400 text-black" : "bg-white/[0.07] text-zinc-300"}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-7 flex h-56 w-56 items-center justify-center">
        <motion.div animate={{ rotate: rotation }} transition={{ duration: 2.4, ease: [0.12, 0.8, 0.2, 1] }} className="absolute inset-0 rounded-full border-4 border-cyan-300/30 bg-gradient-to-br from-cyan-400/15 to-purple-500/20 shadow-[0_0_45px_rgba(34,211,238,0.18)]">
          {Array.from({ length: 8 }).map((_, index) => {
            const person = people[index % Math.max(1, people.length)];

            return (
              <div key={index} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${index * 45}deg) translateY(-88px)` }}>
                <Avatar src={person?.profilePic} name={person?.username} className="h-10 w-10 -translate-x-1/2 rounded-full border-2 border-white/30" />
              </div>
            );
          })}
        </motion.div>
        <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#10111a] text-center text-xs font-black text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
          {spinning ? "VIBING..." : "SPIN"}
        </div>
      </div>

      <button type="button" onClick={spin} disabled={spinning} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3.5 text-sm font-black disabled:opacity-50">
        <RefreshCw size={17} className={spinning ? "animate-spin" : ""} /> SPIN
      </button>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.06] p-4 text-center">
            <Avatar src={selected.profilePic} name={selected.username} className="mx-auto h-24 w-24 rounded-[28px] border-2 border-cyan-300/40" />
            <h3 className="mt-4 text-xl font-black">{selected.username || "Vibe Seeker"}</h3>
            <p className="mt-1 text-sm font-black text-cyan-300">{calculateCompatibility(myVibes, selected.vibes)}% Vibed</p>
            <p className="mt-3 text-xs font-bold text-zinc-400">
              {flattenVibes(selected.vibes).filter((vibe) => myVibes.includes(vibe)).slice(0, 4).join(" • ") || "A new perspective awaits"}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={() => onVibe(selected)} className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-xs font-black">Let&apos;s Vibe</button>
              <button type="button" onClick={() => setIcebreaker(ICEBREAKERS[Math.floor(Math.random() * ICEBREAKERS.length)])} className="rounded-2xl border border-white/10 bg-white/[0.07] py-3 text-xs font-black">Play Icebreaker</button>
            </div>
            {icebreaker && <p className="mt-4 rounded-xl bg-purple-400/10 p-3 text-xs font-black text-purple-200">{icebreaker}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PinnedSection({ uid, pins, setPins }) {
  const toggleTribe = async (tribe) => {
    const exists = pins.tribes.some((item) => item.id === tribe.id);
    const next = exists ? pins.tribes.filter((item) => item.id !== tribe.id) : [...pins.tribes, tribe].slice(0, 2);
    setPins((value) => ({ ...value, tribes: next }));
    await savePins(uid, "tribes", next);
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <h3 className="font-black">Pinned Tribes</h3>
      <p className="mt-1 text-xs font-semibold text-zinc-500">Keep up to 2 communities close.</p>
      <div className="mt-4 space-y-3">
        {TRIBES.map((tribe) => {
          const pinned = pins.tribes.some((item) => item.id === tribe.id);

          return (
            <div key={tribe.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3">
              <span className="text-xl">{tribe.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-black">{tribe.name}</p>
                <p className="mt-1 text-[11px] font-semibold text-zinc-500">{tribe.members.toLocaleString()} members</p>
              </div>
              <button type="button" onClick={() => toggleTribe(tribe)} className="text-cyan-300">
                {pinned ? <PinOff size={17} /> : <Pin size={17} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Leaderboard({ uid, onClose }) {
  const [tab, setTab] = useState("points");
  const [data, setData] = useState({ topUsers: [], currentUser: null, rank: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadLeaderboard(uid, tab).then(setData).finally(() => setLoading(false));
  }, [tab, uid]);

  const tabs = [
    { id: "tribeBuilderPoints", label: "🏆 Tribe Builders" },
    { id: "points", label: "⚡ Points" },
    { id: "streak", label: "🔥 Streaks" },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-4 backdrop-blur-md sm:items-center">
      <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#10111a] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Leaderboard</h2>
          <button type="button" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto">
          {tabs.map((item) => (
            <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${tab === item.id ? "bg-cyan-400 text-black" : "bg-white/[0.07] text-zinc-300"}`}>
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoaderCircle className="mx-auto mt-10 animate-spin text-cyan-300" />
        ) : (
          <div className="mt-5 space-y-3">
            {safeArray(data.topUsers).map((user, index) => (
              <div key={user.id} className={`flex items-center gap-3 rounded-2xl p-3 ${user.id === uid ? "border border-cyan-300/30 bg-cyan-400/10" : "bg-white/[0.05]"}`}>
                <span className="w-7 text-center font-black text-cyan-300">#{index + 1}</span>
                <Avatar src={user.profilePic} name={user.username} className="h-10 w-10 rounded-xl" />
                <span className="flex-1 truncate text-sm font-black">{user.username || "Vibe Seeker"}</span>
                <span className="text-xs font-black text-purple-300">{Number(user[tab] || 0).toLocaleString()}</span>
              </div>
            ))}

            <div className="rounded-2xl bg-gradient-to-r from-cyan-500/15 to-purple-500/15 p-4 text-xs font-black">
              <p>Your Rank: #{data.rank || "—"}</p>
              <p className="mt-2 text-cyan-300">Your Points: {Number(data.currentUser?.points || 0).toLocaleString()}</p>
              <p className="mt-3 text-zinc-500">Weekly rewards: #1 +30 • #2 +20 • #3 +10</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function VibeHome({
  userData,
  onModeChange,
  setCurrentTab,
  setSelectedChatUser,
}) {
  const uid = auth?.currentUser?.uid || userData?.uid || "";
  const [mode, setMode] = useState("vibe");
  const [tasks, setTasks] = useState([]);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [stories, setStories] = useState([]);
  const [pins, setPins] = useState({ people: [], tribes: [] });
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStories = useCallback(async () => {
    if (!uid) return;
    setStories(await loadStories(uid, userData?.vibes));
  }, [uid, userData?.vibes]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!uid) {
        setLoading(false);
        setError("Your account is still loading. Please try again.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [taskData, storyData, pinData] = await Promise.all([
          loadDailyTasks(uid),
          loadStories(uid, userData?.vibes),
          loadPins(uid),
        ]);

        if (!mounted) return;

        setTasks(taskData.tasks);
        setRewardClaimed(taskData.rewardClaimed);
        setStories(storyData);
        setPins(pinData);
      } catch {
        if (mounted) setError("Something went wrong while loading VIBE Home.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [uid, userData?.vibes]);

  const changeMode = (nextMode) => {
    setMode(nextMode);
    if (typeof onModeChange === "function") onModeChange(nextMode);
  };

  const openChat = (person) => {
    if (!person) return;
    if (typeof setSelectedChatUser === "function") setSelectedChatUser(person);
    if (typeof setCurrentTab === "function") setCurrentTab("chatRoom");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03040A] text-white">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none fixed -left-28 -top-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
      <div className="pointer-events-none fixed -bottom-24 -right-20 h-80 w-80 rounded-full bg-purple-500/15 blur-[110px]" />

      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-28 pt-5 sm:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={vibeLogo} alt="VibeLink" className="h-8 w-auto" />
            <img src={vibeWordmark} alt="VibeLink" className="h-5 w-auto" />
          </div>

          <button type="button" onClick={() => setLeaderboardOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/20 bg-white/[0.06] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <Crown size={20} />
          </button>
        </nav>

        <div className="mt-6">
          <ModeSwitch mode={mode} onChange={changeMode} />
          <AnimatePresence mode="wait">
            <motion.h1 key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-7 text-center text-3xl font-black tracking-tight sm:text-4xl">
              {mode === "vibe" ? "Good Vibes. Real People." : "Build Real Connections."}
            </motion.h1>
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="mt-9"><Skeleton /></div>
        ) : error ? (
          <div className="mt-9 rounded-[24px] border border-red-300/15 bg-red-400/10 p-5 text-center text-sm font-bold text-red-200">{error}</div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-9 space-y-10">
            <DailyTasks tasks={tasks} rewardClaimed={rewardClaimed} />

            <section>
              <VibeStories uid={uid} stories={stories} refreshStories={refreshStories} />
            </section>

            <section>
              <AnonymousVibe uid={uid} />
            </section>

            <section>
              <SectionTitle subtitle="Choose a vibe. Let the wheel find someone interesting.">Vibe Roulette</SectionTitle>
              <Roulette uid={uid} userData={userData} onVibe={openChat} />
            </section>

            <section>
              <SectionTitle subtitle="Keep your favorite spaces close.">Pinned</SectionTitle>
              <PinnedSection uid={uid} pins={pins} setPins={setPins} />
            </section>
          </motion.div>
        )}
      </main>

      {leaderboardOpen && <Leaderboard uid={uid} onClose={() => setLeaderboardOpen(false)} />}
    </div>
  );
}