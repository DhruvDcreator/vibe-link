// src/components/vibe/Roulette.jsx

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Aperture,
  BadgeIndianRupee,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  Car,
  Clapperboard,
  Code2,
  Compass,
  Dumbbell,
  Film,
  Gamepad2,
  Headphones,
  HeartHandshake,
  Leaf,
  Lightbulb,
  MessageCircle,
  Mic2,
  Mountain,
  Music,
  Palette,
  PartyPopper,
  Plane,
  Podcast,
  RefreshCw,
  Rocket,
  Shirt,
  Sparkles,
  Trophy,
  Utensils,
  X,
  Youtube,
  Zap,
} from "lucide-react";

const FALLBACK_PROFILE = "https://i.pravatar.cc/300";
const WHEEL_SLOT_COUNT = 12;
const DEFAULT_FREE_SPINS = 2;
const EXTRA_SPINS_COST = 10;
const EXTRA_SPINS_AMOUNT = 2;

const VIBE_CATEGORIES = [
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
  { name: "Nature", icon: Leaf },
  { name: "IPL", icon: Trophy },
  { name: "Investing", icon: BadgeIndianRupee },
  { name: "Memes", icon: Sparkles },
  { name: "Podcasts", icon: Podcast },
  { name: "Netflix", icon: Clapperboard },
  { name: "YouTube", icon: Youtube },
  { name: "Concerts", icon: Music },
  { name: "Singing", icon: Mic2 },
  { name: "Dancing", icon: PartyPopper },
  { name: "Stand-up Comedy", icon: Mic2 },
  { name: "Formula 1", icon: Aperture },
];

const ICEBREAKER_PROMPTS = {
  Music: [
    "You can only listen to one album for a week. What are you choosing?",
    "Would you rather have front-row concert tickets or meet your favorite artist?",
    "What song instantly changes your mood?",
  ],
  Movies: [
    "You get to live inside one movie universe for 24 hours. Which one?",
    "Would you rather direct a film or star in one?",
    "What movie do you think everyone should watch once?",
  ],
  Gaming: [
    "You can enter one game world for a day. Where are you going?",
    "Would you rather win a tournament or design your own game?",
    "What game do you never get bored of?",
  ],
  Travel: [
    "You get a surprise ticket tonight. Mountains, beach, or city?",
    "Would you rather travel with a plan or figure it out live?",
    "What place is at the top of your travel list?",
  ],
  Photography: [
    "You have one golden-hour shot left. What are you capturing?",
    "Would you rather shoot portraits or landscapes forever?",
    "What makes a photo feel alive to you?",
  ],
  Reading: [
    "You can bring one book to a quiet weekend. Which one?",
    "Would you rather meet your favorite author or live inside your favorite book?",
    "What book changed how you think?",
  ],
  Coding: [
    "You get one weekend to build anything. What are you making?",
    "Would you rather build a viral app or a tool only your friends love?",
    "What tech idea do you wish existed already?",
  ],
  Cricket: [
    "You get one over to win a final. Are you batting or bowling?",
    "Would you rather meet your favorite player or watch a final live?",
    "What is your dream cricket moment?",
  ],
  Football: [
    "You get one penalty in a final. Where are you placing it?",
    "Would you rather score a winner or assist one?",
    "Which football atmosphere would you love to experience live?",
  ],
  Badminton: [
    "Match point. Smash or drop shot?",
    "Would you rather play doubles with a pro or face one for a rally?",
    "What makes a badminton match exciting for you?",
  ],
  Fitness: [
    "Would you rather train at sunrise or late night?",
    "What workout makes you feel unstoppable?",
    "You get one fitness goal completed instantly. What is it?",
  ],
  Food: [
    "You can eat one comfort food right now. What is it?",
    "Would you rather discover a hidden cafe or a perfect street-food spot?",
    "What food instantly feels like home?",
  ],
  Anime: [
    "You can join one anime universe for a day. Which one?",
    "Would you rather have a power-up arc or a calm slice-of-life episode?",
    "Which anime character would you want as a friend?",
  ],
  Fashion: [
    "You have one outfit to make a first impression. What is the vibe?",
    "Would you rather design a sneaker or a jacket?",
    "What fashion detail do you always notice first?",
  ],
  Art: [
    "You get a blank wall and unlimited supplies. What do you create?",
    "Would you rather visit a legendary museum or paint with your favorite artist?",
    "What kind of art pulls you in instantly?",
  ],
  Business: [
    "You get funding for one idea today. What are you building?",
    "Would you rather pitch on stage or negotiate behind the scenes?",
    "What business do you think is underrated?",
  ],
  Startups: [
    "You have 48 hours to launch a startup. What problem are you solving?",
    "Would you rather be the product person or the growth person?",
    "What startup idea do you secretly believe would work?",
  ],
  "Content Creation": [
    "You have one viral post to make. What is it about?",
    "Would you rather make cinematic videos or raw honest content?",
    "What creator inspires your style?",
  ],
  Tech: [
    "You can test one future gadget today. What is it?",
    "Would you rather build AI tools or consumer apps?",
    "What technology still feels magical to you?",
  ],
  Cars: [
    "What is your dream garage car?",
    "Would you rather drive a supercar for a day or restore a classic?",
    "What car sound gives you chills?",
  ],
  Nature: [
    "Forest, ocean, desert, or mountains for a quiet reset?",
    "Would you rather watch sunrise alone or sunset with friends?",
    "What place in nature makes you feel calm?",
  ],
  IPL: [
    "Last ball, six needed. Who do you trust?",
    "Would you rather attend an IPL final or meet your favorite captain?",
    "Which IPL rivalry always gets you hyped?",
  ],
  Investing: [
    "Would you rather invest early in a startup or master long-term markets?",
    "What financial habit do you respect most?",
    "You get one investing lesson instantly. What do you want to learn?",
  ],
  Memes: [
    "What meme format describes your week?",
    "Would you rather create one legendary meme or discover them first forever?",
    "What kind of humor always gets you?",
  ],
  Podcasts: [
    "You can record a podcast with anyone. Who is your guest?",
    "Would you rather host deep conversations or funny chaos episodes?",
    "What topic could you talk about for hours?",
  ],
  Netflix: [
    "One series to binge tonight. What are you picking?",
    "Would you rather watch a thriller or a comfort show?",
    "What show deserved another season?",
  ],
  YouTube: [
    "What YouTube rabbit hole do you always fall into?",
    "Would you rather create vlogs or documentary-style videos?",
    "Which creator could you watch for hours?",
  ],
  Concerts: [
    "Front row ticket or backstage pass?",
    "Which artist would you see live no matter what?",
    "Would you rather attend a festival or an intimate concert?",
  ],
  Singing: [
    "You get one song to perform perfectly. Which one?",
    "Would you rather sing on stage or in a studio?",
    "What song do you secretly love singing?",
  ],
  Dancing: [
    "You hear the perfect beat. What move are you doing first?",
    "Would you rather perform choreography or freestyle?",
    "What song always makes you move?",
  ],
  "Stand-up Comedy": [
    "You get five minutes on stage. What is your opening bit about?",
    "Would you rather write jokes or perform them?",
    "Who is your favorite kind of comedian?",
  ],
  "Formula 1": [
    "You have 24 hours in Monaco. What do you do?",
    "Would you rather have a front-row ticket or meet Verstappen?",
    "What is your dream car?",
    "Would you rather drive one lap at Monza or watch a night race in Singapore?",
  ],
};

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function flattenVibes(vibes) {
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
        if (typeof item === "string" && item.trim()) {
          flattened.push(item.trim());
        }
      });
      return;
    }

    if (typeof value === "string" && value.trim()) {
      flattened.push(value.trim());
    }
  });

  return [...new Set(flattened)];
}

function calculateCompatibility(myVibes, otherVibes) {
  const mine = safeArray(myVibes);
  const theirs = flattenVibes(otherVibes);

  if (mine.length === 0 || theirs.length === 0) return 0;

  const shared = theirs.filter((vibe) => mine.includes(vibe));
  return Math.min(100, Math.round((shared.length / mine.length) * 100));
}

function getIcebreaker(category) {
  const prompts = ICEBREAKER_PROMPTS[category] || [
    `What made you choose ${category}?`,
    `What is your strongest ${category} opinion?`,
    `If you had one perfect ${category} day, what would it look like?`,
  ];

  return prompts[Math.floor(Math.random() * prompts.length)];
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

function EnergyButton({ category, selected, onClick }) {
  const Icon = category.icon;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] border p-4 text-left backdrop-blur-2xl transition-all ${
        selected
          ? "border-cyan-300/70 bg-gradient-to-br from-cyan-500/25 to-purple-500/25 shadow-[0_0_30px_rgba(34,211,238,0.16)]"
          : "border-white/10 bg-white/[0.055] hover:border-cyan-300/35"
      }`}
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-[42px]" />

      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
            selected
              ? "border-cyan-300/30 bg-cyan-400/15 text-cyan-200"
              : "border-white/10 bg-white/[0.055] text-zinc-300"
          }`}
        >
          <Icon size={22} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-black text-white">
            {category.name}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-zinc-500">
            Tap to open wheel
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function WheelSlot({ person, index, total }) {
  const angle = (360 / total) * index;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `rotate(${angle}deg) translateY(-134px)`,
        transformOrigin: "center",
      }}
    >
      <div
        className="-translate-x-1/2"
        style={{
          transform: `translateX(-50%) rotate(${-angle}deg)`,
        }}
      >
        <Avatar
          src={person?.profilePic}
          name={person?.username}
          className="h-12 w-12 rounded-full border-2 border-white/30 shadow-[0_0_18px_rgba(34,211,238,0.22)]"
        />
      </div>
    </div>
  );
}

function RouletteWheel({
  people,
  rotation,
  spinning,
  needleClicking,
}) {
  const slots = Array.from({ length: WHEEL_SLOT_COUNT }).map((_, index) => {
    if (people.length === 0) return null;
    return people[index % people.length];
  });

  return (
    <div className="relative mx-auto flex h-[330px] w-[330px] items-center justify-center sm:h-[390px] sm:w-[390px]">
      <motion.div
        animate={
          needleClicking
            ? {
                rotate: [0, -8, 8, -5, 5, 0],
              }
            : {
                rotate: 0,
              }
        }
        transition={{
          duration: 0.34,
          repeat: needleClicking ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="absolute -top-2 z-30 h-0 w-0 border-l-[15px] border-r-[15px] border-t-[28px] border-l-transparent border-r-transparent border-t-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.95)]"
      />

      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-[36px]" />

      <motion.div
        animate={{ rotate: rotation }}
        transition={
          spinning
            ? {
                duration: 5,
                ease: [0.16, 0.9, 0.18, 1],
                times: [0, 0.16, 0.36, 0.56, 0.8, 1],
              }
            : {
                duration: 0,
              }
        }
        className="relative h-full w-full rounded-full border border-cyan-300/25 bg-gradient-to-br from-cyan-400/15 via-white/[0.045] to-purple-500/20 shadow-[0_0_70px_rgba(34,211,238,0.18)]"
      >
        <div className="absolute inset-3 rounded-full border border-white/10" />
        <div className="absolute inset-8 rounded-full border border-purple-300/10" />

        {slots.map((person, index) => (
          <WheelSlot
            key={`${person?.id || "empty"}-${index}`}
            person={person}
            index={index}
            total={WHEEL_SLOT_COUNT}
          />
        ))}
      </motion.div>

      <div className="absolute z-20 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#10111a]/95 text-center text-xs font-black text-cyan-200 shadow-[0_0_34px_rgba(34,211,238,0.28)] backdrop-blur-xl">
        {spinning ? "LOCKING VIBE" : "READY"}
      </div>
    </div>
  );
}

function WinnerReveal({
  winner,
  category,
  userData,
  onClose,
  onVibe,
}) {
  const [icebreaker, setIcebreaker] = useState("");
  const myVibes = useMemo(() => flattenVibes(userData?.vibes), [userData?.vibes]);
  const winnerVibes = flattenVibes(winner?.vibes);
  const compatibility =
    Number(winner?.compatibility) || calculateCompatibility(myVibes, winner?.vibes);
  const sharedVibes = winnerVibes
    .filter((vibe) => myVibes.includes(vibe))
    .slice(0, 6);

  const visibleSharedVibes =
    sharedVibes.length > 0 ? sharedVibes : [category, ...winnerVibes].filter(Boolean).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/72 p-5 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.82 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 210,
          damping: 20,
        }}
        className="relative w-full max-w-sm overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[#10111a]/95 p-5 text-center shadow-[0_0_70px_rgba(34,211,238,0.2)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500"
        >
          <X size={20} />
        </button>

        <div className="absolute inset-x-12 top-0 h-28 rounded-full bg-cyan-400/20 blur-[70px]" />

        <motion.div
          initial={{ scale: 0.5, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.12,
            type: "spring",
            stiffness: 220,
            damping: 16,
          }}
          className="relative"
        >
          <Avatar
            src={winner?.profilePic}
            name={winner?.username}
            className="mx-auto h-28 w-28 rounded-[32px] border-2 border-cyan-300/45 shadow-[0_0_34px_rgba(34,211,238,0.28)]"
          />
        </motion.div>

        <h3 className="mt-5 text-2xl font-black">
          {winner?.username || "Vibe Seeker"}
        </h3>

        <p className="mt-1 text-lg font-black text-cyan-300">
          {compatibility}% Compatible
        </p>

        <p className="mt-2 text-xs font-bold text-emerald-300">
          {winner?.online ? "Online now" : "Recently active"}
        </p>

        <div className="mt-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Shared Vibes
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {visibleSharedVibes.map((vibe) => (
              <span
                key={vibe}
                className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-black text-cyan-100"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>

        {icebreaker && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl border border-purple-300/20 bg-purple-400/10 p-4 text-left"
          >
            <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-200">
              Quick Icebreaker
            </p>
            <p className="mt-2 text-sm font-bold leading-relaxed text-zinc-100">
              {icebreaker}
            </p>
          </motion.div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onVibe?.(winner)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-xs font-black"
          >
            <MessageCircle size={15} />
            Let&apos;s Vibe
          </button>

          <button
            type="button"
            onClick={() => setIcebreaker(getIcebreaker(category))}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] py-3 text-xs font-black"
          >
            <LightbulbIcon />
            Quick Icebreaker
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LightbulbIcon() {
  return <Sparkles size={15} />;
}

export default function Roulette({
  userData,
  people = [],
  onSpin,
  onVibe,
  onBuySpins,
  spinsRemaining,
  totalDailySpins = DEFAULT_FREE_SPINS,
  points = 0,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [localSpinsRemaining, setLocalSpinsRemaining] = useState(
    Number.isFinite(Number(spinsRemaining))
      ? Number(spinsRemaining)
      : DEFAULT_FREE_SPINS
  );
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [needleClicking, setNeedleClicking] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerVisible, setWinnerVisible] = useState(false);
  const timersRef = useRef([]);

  const safePeople = safeArray(people);
  const visibleSpins = Number.isFinite(Number(spinsRemaining))
    ? Number(spinsRemaining)
    : localSpinsRemaining;

  const selectedCategoryData = VIBE_CATEGORIES.find(
    (item) => item.name === selectedCategory
  );

  const categoryPeople = useMemo(() => {
    if (!selectedCategory) return safePeople;

    const filtered = safePeople.filter((person) =>
      flattenVibes(person?.vibes).includes(selectedCategory)
    );

    return filtered.length > 0 ? filtered : safePeople;
  }, [safePeople, selectedCategory]);

  useEffect(() => {
    if (Number.isFinite(Number(spinsRemaining))) {
      setLocalSpinsRemaining(Number(spinsRemaining));
    }
  }, [spinsRemaining]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const addTimer = (callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  };

  const openWheel = (category) => {
    setSelectedCategory(category.name);
    setModalOpen(true);
    setWinner(null);
    setWinnerVisible(false);
    setNeedleClicking(false);
  };

  const closeWheel = () => {
    if (spinning) return;

    setModalOpen(false);
    setWinner(null);
    setWinnerVisible(false);
    setNeedleClicking(false);
  };

  const pickLocalWinner = () => {
    if (categoryPeople.length === 0) return null;

    return categoryPeople[Math.floor(Math.random() * categoryPeople.length)] || null;
  };

  const spin = async () => {
    if (spinning || visibleSpins <= 0 || !selectedCategory) return;

    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];

    setSpinning(true);
    setWinner(null);
    setWinnerVisible(false);
    setNeedleClicking(false);

    if (!Number.isFinite(Number(spinsRemaining))) {
      setLocalSpinsRemaining((value) => Math.max(0, value - 1));
    }

    const winnerFromIntegration =
      typeof onSpin === "function" ? await onSpin(selectedCategory) : null;
    const nextWinner = winnerFromIntegration || pickLocalWinner();

    setRotation((value) => value + 2520 + Math.floor(Math.random() * 360));

    addTimer(() => setNeedleClicking(true), 4000);
    addTimer(() => setWinner(nextWinner), 5000);
    addTimer(() => {
      setNeedleClicking(false);
      setSpinning(false);
      setWinnerVisible(Boolean(nextWinner));
    }, 5500);
  };

  const buySpins = async () => {
    if (typeof onBuySpins === "function") {
      await onBuySpins({
        cost: EXTRA_SPINS_COST,
        amount: EXTRA_SPINS_AMOUNT,
      });
      return;
    }

    setLocalSpinsRemaining((value) => value + EXTRA_SPINS_AMOUNT);
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Vibe Roulette
        </h2>
        <p className="mt-1 text-xs font-semibold text-zinc-500">
          Choose your energy. Let the wheel find someone interesting.
        </p>
      </div>

      <div className="rounded-[30px] border border-cyan-300/15 bg-gradient-to-br from-cyan-500/15 via-white/[0.05] to-purple-500/15 p-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
              Vibe Roulette
            </p>
            <h3 className="mt-2 text-2xl font-black">Choose Your Energy</h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-right">
            <p className="text-lg font-black text-cyan-300">
              {visibleSpins}/{totalDailySpins}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
              Spins Left
            </p>
          </div>
        </div>

        {visibleSpins <= 0 && (
          <div className="mt-5 rounded-[24px] border border-purple-300/15 bg-purple-400/10 p-4">
            <p className="text-sm font-black text-purple-100">Out of Spins</p>
            <p className="mt-1 text-xs font-semibold text-zinc-400">
              10 Points = 2 More Spins
            </p>

            <button
              type="button"
              onClick={buySpins}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-xs font-black"
            >
              <BadgeIndianRupee size={16} />
              Buy 2 More Spins
            </button>
          </div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {VIBE_CATEGORIES.map((category) => (
            <EnergyButton
              key={category.name}
              category={category}
              selected={selectedCategory === category.name}
              onClick={() => openWheel(category)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] overflow-hidden bg-[#03040A] text-white"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-[#03040A] to-purple-500/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

            <div
              className="relative z-10 flex min-h-dvh flex-col px-4 pb-6"
              style={{
                paddingTop: "max(18px, env(safe-area-inset-top))",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                    {selectedCategory}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">Roulette Wheel</h3>
                </div>

                <button
                  type="button"
                  onClick={closeWheel}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-2xl">
                <div>
                  <p className="text-sm font-black">
                    {visibleSpins > 0 ? `${visibleSpins} Spins Remaining` : "Out of Spins"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-zinc-500">
                    Needle locks at 5 seconds
                  </p>
                </div>

                <div className="flex items-center gap-2 text-cyan-300">
                  <Zap size={18} />
                  <span className="text-sm font-black">{categoryPeople.length}</span>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center py-6">
                <RouletteWheel
                  people={categoryPeople}
                  rotation={rotation}
                  spinning={spinning}
                  needleClicking={needleClicking}
                />
              </div>

              {categoryPeople.length === 0 && (
                <p className="mb-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-center text-sm font-semibold text-zinc-400">
                  No people available for this vibe yet.
                </p>
              )}

              {visibleSpins <= 0 ? (
                <button
                  type="button"
                  onClick={buySpins}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-sm font-black shadow-[0_0_36px_rgba(34,211,238,0.18)]"
                >
                  <BadgeIndianRupee size={17} />
                  10 Points = 2 More Spins
                </button>
              ) : (
                <button
                  type="button"
                  onClick={spin}
                  disabled={spinning || categoryPeople.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-4 text-sm font-black shadow-[0_0_36px_rgba(34,211,238,0.18)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <RefreshCw size={17} className={spinning ? "animate-spin" : ""} />
                  {spinning ? "SPINNING" : "SPIN"}
                </button>
              )}
            </div>

            <AnimatePresence>
              {winnerVisible && winner && (
                <WinnerReveal
                  winner={winner}
                  category={selectedCategory}
                  userData={userData}
                  onClose={() => setWinnerVisible(false)}
                  onVibe={onVibe}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}