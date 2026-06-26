import { motion } from "framer-motion";
import {
  Camera,
  Video,
  Mic,
  PenSquare,
  Music2,
  BarChart3,
  Flame,
  CircleHelp,
  Ghost,
  Laugh,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Thought",
    icon: PenSquare,
    color: "from-cyan-500/25 to-cyan-400/10",
  },
  {
    title: "Photo",
    icon: Camera,
    color: "from-pink-500/25 to-pink-400/10",
  },
  {
    title: "Video",
    icon: Video,
    color: "from-red-500/25 to-red-400/10",
  },
  {
    title: "Voice",
    icon: Mic,
    color: "from-green-500/25 to-green-400/10",
  },
  {
    title: "Music",
    icon: Music2,
    color: "from-purple-500/25 to-purple-400/10",
  },
  {
    title: "Poll",
    icon: BarChart3,
    color: "from-orange-500/25 to-orange-400/10",
  },
  {
    title: "Hot Take",
    icon: Flame,
    color: "from-yellow-500/25 to-orange-500/20",
  },
  {
    title: "Question",
    icon: CircleHelp,
    color: "from-sky-500/25 to-blue-500/10",
  },
  {
    title: "Anonymous",
    icon: Ghost,
    color: "from-cyan-500/25 to-indigo-500/10",
  },
  {
    title: "Meme",
    icon: Laugh,
    color: "from-lime-500/25 to-yellow-400/10",
  },
];

export default function CreateDrop({ onSkip }) {
  return (
    <div className="space-y-8">

      <div className="text-center">

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tight"
        >
          Drop Something
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-zinc-400"
        >
          Express yourself in your own way
        </motion.p>

      </div>

      <div className="grid grid-cols-2 gap-4">

        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.04,
              }}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`
                rounded-[28px]
                border
                border-white/10
                bg-gradient-to-br
                ${item.color}
                backdrop-blur-2xl
                p-6
                text-left
              `}
            >
              <Icon
                size={28}
                className="text-white"
              />

              <p className="mt-6 font-black">
                {item.title}
              </p>
            </motion.button>
          );
        })}

      </div>

      <motion.button
        whileTap={{
          scale: 0.97,
        }}
        whileHover={{
          scale: 1.02,
        }}
        onClick={onSkip}
        className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-[26px]
        border
        border-white/10
        bg-white/[0.05]
        py-5
        font-black
        text-cyan-300
        backdrop-blur-xl
        "
      >
        ✨ Open Today's Deck

        <ArrowRight size={20} />
      </motion.button>

    </div>
  );
}