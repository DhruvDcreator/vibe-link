import { useEffect, useMemo, useRef, useState } from "react";
import Drops from "../components/drops/Drops";
import { AnimatePresence, motion } from "framer-motion";
import VibeHome from "../components/VibeHome";
import {
  Activity,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  CircleUserRound,
  Compass,
  Flame,
  Home as HomeIcon,
  LoaderCircle,
  MessageCircle,
  MessagesSquare,
  Radio,
  RefreshCw,
  Search,
  Sparkles,
  Trophy,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { requestNotificationPermission } from "../notifications";
import Discover from "./Discover";
import Profile from "./Profile";
import EditVibes from "./EditVibes";
import Chats from "./Chats";
import ChatRoom from "./ChatRoom";

const FALLBACK_PROFILE = "https://i.pravatar.cc/300";
const PRESENCE_INTERVAL_MS = 30000;

const FALLBACK_TRIBES = [
  { id: "movies", name: "Movie Lovers", icon: "ðŸŽ¬", online: 128, members: 1840 },
  { id: "tech", name: "Tech India", icon: "âš¡", online: 94, members: 1320 },
  { id: "night", name: "Night Owls", icon: "ðŸŒ™", online: 76, members: 980 },
];

const MISSIONS = [
  { id: "connect", title: "Connect with 1 new person", reward: 80, progress: 0, total: 1 },
  { id: "answer", title: "Answer Today's Vibe", reward: 50, progress: 1, total: 1 },
  { id: "discussion", title: "Join a tribe discussion", reward: 100, progress: 0, total: 1 },
  { id: "invite", title: "Invite 1 friend", reward: 120, progress: 0, total: 1 },
];

const FALLBACK_ACTIVITY = [
  { id: "a1", text: "Aryan joined Tech India", time: "2m ago", icon: Users },
  { id: "a2", text: "Riya posted a vibe", time: "8m ago", icon: Sparkles },
  { id: "a3", text: "Kabir reached Rank #4", time: "14m ago", icon: Trophy },
];

function scrollToTop() {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  } catch {
    window.scrollTo(0, 0);
  }
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getFlattenedVibes(vibes) {
  if (!vibes) return [];

  const source = Array.isArray(vibes)
    ? vibes
    : typeof vibes === "object"
      ? Object.values(vibes)
      : [];

  const flattened = [];

  source.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string" && item.trim()) flattened.push(item.trim());
      });
      return;
    }

    if (typeof value === "string" && value.trim()) flattened.push(value.trim());
  });

  return [...new Set(flattened)];
}

function getCompatibility(myVibes, otherVibes) {
  const mine = safeArray(myVibes);
  const theirs = getFlattenedVibes(otherVibes);

  if (mine.length === 0 || theirs.length === 0) return 0;

  const shared = theirs.filter((vibe) => mine.includes(vibe));
  return Math.min(100, Math.round((shared.length / mine.length) * 100));
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString() : "0";
}

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

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-xs font-medium text-zinc-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function SkeletonHome() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#03040A] px-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        <Sparkles className="text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]" size={42} />
        <div className="mt-6 h-3 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
        </div>
      </div>
    </div>
  );
}

function ModeSwitch({ mode, setMode }) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.055] p-1.5 backdrop-blur-2xl">
      {["vibe", "link"].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setMode(item)}
          className="relative z-10 flex min-h-11 items-center justify-center gap-2 rounded-xl text-xs font-black tracking-[0.2em]"
        >
          {mode === item && (
            <motion.div
              layoutId="mode-highlight"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/90 to-purple-600/90 shadow-[0_0_26px_rgba(34,211,238,0.2)]"
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

function PersonCard({ person, myVibes, onOpen }) {
  const vibes = getFlattenedVibes(person?.vibes).slice(0, 3);
  const compatibility = getCompatibility(myVibes, person?.vibes);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(person)}
      className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.055] p-4 text-left backdrop-blur-2xl"
    >
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/15 blur-[48px]" />
      <div className="relative flex items-center gap-3">
        <Avatar
          src={person?.profilePic}
          name={person?.username}
          className="h-14 w-14 rounded-2xl border border-white/15"
        />
        <div className="min-w-0">
          <p className="truncate font-black">{person?.username || "Vibe Seeker"}</p>
          <p className="mt-1 text-xs font-bold text-cyan-300">{compatibility}% Vibed</p>
        </div>
      </div>
      <div className="relative mt-4 flex flex-wrap gap-2">
        {(vibes.length > 0 ? vibes : ["Discovering vibes"]).map((vibe) => (
          <span
            key={vibe}
            className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[10px] font-bold text-zinc-300"
          >
            {vibe}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function Dashboard({
  userData,
  people,
  setCurrentTab,
  setSelectedChatUser,
  mode,
  setMode,
}) {
  return (
    <VibeHome
  userData={userData}
  people={people}
  setCurrentTab={setCurrentTab}
  setSelectedChatUser={setSelectedChatUser}
  mode={mode}
  setMode={setMode}
/>
  );
}

function TribePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-32 pt-8 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Communities</p>
      <h1 className="mt-3 text-4xl font-black">Find Your Tribes</h1>
      <p className="mt-3 text-sm font-medium text-zinc-500">Join conversations built around the things you genuinely enjoy.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FALLBACK_TRIBES.map((tribe) => (
          <div key={tribe.id} className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
            <div className="text-3xl">{tribe.icon}</div>
            <h2 className="mt-4 text-xl font-black">{tribe.name}</h2>
            <p className="mt-2 text-xs font-bold text-zinc-500">{tribe.online} online â€¢ {formatNumber(tribe.members)} members</p>
            <button type="button" className="mt-5 flex items-center gap-2 text-sm font-black text-cyan-300">View Tribe <ArrowRight size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ currentTab, setCurrentTab, hasUnread }) {
  const items = [
    { key: "home", label: "Home", icon: HomeIcon },
    { key: "discover", label: "Discover", icon: Compass },
    { key: "drops", label: "Drops", icon: Sparkles },
    { key: "chats", label: "Chats", icon: MessageCircle },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-24px)] max-w-xl -translate-x-1/2 rounded-[25px] border border-white/10 bg-[#11121b]/80 px-2 py-2 shadow-[0_0_42px_rgba(34,211,238,0.14)] backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.key;

          return (
            <button type="button" key={item.key} onClick={() => setCurrentTab(item.key)} className="relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl">
              {active && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                />
              )}
              <div className="relative">
                <Icon size={19} className={active ? "text-cyan-300" : "text-zinc-500"} />
                {item.key === "chats" && hasUnread && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]" />}
              </div>
              <span className={`relative text-[10px] font-black ${active ? "text-cyan-200" : "text-zinc-600"}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedMode, setSelectedMode] =
  useState("vibe");
  const [userData, setUserData] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
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

  useEffect(() => {
    requestAnimationFrame(scrollToTop);
  }, [currentTab]);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent || "");

    if (!isSafari && typeof requestNotificationPermission === "function") {
      Promise.resolve(requestNotificationPermission()).catch(() => {});
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    let presenceInterval = null;
    let unsubscribeUnread = null;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (signedInUser) => {
        if (!signedInUser?.uid) {
          if (mounted) {
            setLoading(false);
            setPageError("Please sign in to continue.");
          }
          return;
        }

        try {
          if (mounted) {
            setLoading(true);
            setPageError("");
          }

          const [userSnapshot, usersSnapshot] = await Promise.all([
            getDoc(doc(db, "users", signedInUser.uid)),
            getDocs(collection(db, "users")),
          ]);

          const profile = userSnapshot.exists() ? userSnapshot.data() || {} : {};
          const availablePeople = [];

          usersSnapshot.forEach((item) => {
            if (!item?.id || item.id === signedInUser.uid) return;
            availablePeople.push({ id: item.id, ...(item.data() || {}) });
          });

          if (mounted) {
            setUserData({ uid: signedInUser.uid, ...profile });
            setPeople(availablePeople);
          }

          const updatePresence = async () => {
            if (!auth?.currentUser?.uid) return;

            try {
              await setDoc(
                doc(db, "presence", auth.currentUser.uid),
                { lastActive: Date.now() },
                { merge: true }
              );
            } catch (error) {
              console.error("Unable to update presence:", error);
            }
          };

          await updatePresence();
          presenceInterval = setInterval(updatePresence, PRESENCE_INTERVAL_MS);

          const unreadQuery = query(
            collection(db, "chatMeta"),
            where("users", "array-contains", signedInUser.uid)
          );

          unsubscribeUnread = onSnapshot(
            unreadQuery,
            (snapshot) => {
              let unread = false;

              snapshot.forEach((item) => {
                const data = item?.data?.() || {};
                const unreadCount = Number(data?.unreadCounts?.[signedInUser.uid] || 0);
                if (unreadCount > 0) unread = true;
              });

              if (mounted) setHasUnread(unread);
            },
            (error) => {
              console.error("Unable to load unread messages:", error);
            }
          );
        } catch (error) {
          console.error("Unable to load Home:", error);

          if (mounted) {
            setPageError("Something went wrong while loading VibeLink.");
          }
        } finally {
          if (mounted) setLoading(false);
        }
      },
      (error) => {
        console.error("Unable to verify authentication:", error);

        if (mounted) {
          setPageError("Something went wrong while loading VibeLink.");
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      unsubscribeAuth();
      if (unsubscribeUnread) unsubscribeUnread();
      if (presenceInterval) clearInterval(presenceInterval);
    };
  }, []);

  if (loading) return <SkeletonHome />;

  if (pageError || !userData) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#03040A] p-6 text-center text-white">
        <div>
          <Sparkles className="mx-auto text-cyan-300" size={34} />
          <h1 className="mt-5 text-2xl font-black">{pageError || "Unable to load VibeLink."}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#03040A] text-white">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
      <div className="pointer-events-none fixed -left-32 -top-24 h-[340px] w-[340px] rounded-full bg-cyan-500/15 blur-[110px]" />
      <div className="pointer-events-none fixed -bottom-28 -right-20 h-[360px] w-[360px] rounded-full bg-purple-500/15 blur-[120px]" />

      <div className="relative z-10">
        {currentTab === "home" && (
          <Dashboard
  userData={userData}
  people={people}
  setCurrentTab={setCurrentTab}
  setSelectedChatUser={setSelectedChatUser}
  mode={selectedMode}
  setMode={setSelectedMode}
/>
        )}

        {currentTab === "discover" && (
          <div className="pb-28 pt-5">
            <Discover
              userData={userData}
              setCurrentTab={setCurrentTab}
              setSelectedChatUser={setSelectedChatUser}
            />
          </div>
        )}

        {currentTab === "drops" && (
  <div className="pb-28 pt-5">
    <Drops />
  </div>
)}

        {currentTab === "chats" && (
          <div className="pb-28 pt-5">
            <Chats
              setCurrentTab={setCurrentTab}
              setSelectedChatUser={setSelectedChatUser}
            />
          </div>
        )}

        {currentTab === "profile" && (
          <div className="pb-28 pt-5">
            <Profile userData={userData} setCurrentTab={setCurrentTab} />
          </div>
        )}

        {currentTab === "editVibes" && (
          <div className="pb-28 pt-5">
            <EditVibes
              userData={userData}
              setUserData={setUserData}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}

        {currentTab === "chatRoom" && (
          <ChatRoom selectedUser={selectedChatUser} setCurrentTab={setCurrentTab} />
        )}
      </div>

      {currentTab !== "chatRoom" && (
        <AnimatePresence
  mode="wait"
  initial={false}
>
  {!(currentTab === "home" &&
      selectedMode === "link") && (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      exit={{
        y: 100,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
    >
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        hasUnread={hasUnread}
      />
    </motion.div>
  )}
</AnimatePresence>
      )}
    </div>
  );
}