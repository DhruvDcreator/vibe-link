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
    color: "from-cyan-500/20 via-cyan-500/10 to-transparent",
  },
  {
    title: "Photo",
    icon: Camera,
    color: "from-pink-500/20 via-pink-500/10 to-transparent",
  },
  {
    title: "Video",
    icon: Video,
    color: "from-red-500/20 via-red-500/10 to-transparent",
  },
  {
    title: "Voice",
    icon: Mic,
    color: "from-green-500/20 via-green-500/10 to-transparent",
  },
  {
    title: "Music",
    icon: Music2,
    color: "from-purple-500/20 via-purple-500/10 to-transparent",
  },
  {
    title: "Poll",
    icon: BarChart3,
    color: "from-orange-500/20 via-orange-500/10 to-transparent",
  },
  {
    title: "Hot Take",
    icon: Flame,
    color: "from-yellow-500/20 via-orange-500/10 to-transparent",
  },
  {
    title: "Question",
    icon: CircleHelp,
    color: "from-sky-500/20 via-blue-500/10 to-transparent",
  },
  {
    title: "Anonymous",
    icon: Ghost,
    color: "from-cyan-500/20 via-indigo-500/10 to-transparent",
  },
  {
    title: "Meme",
    icon: Laugh,
    color: "from-lime-500/20 via-yellow-500/10 to-transparent",
  },
];

export default function CreateDrop({ onSkip }) {
  return (
    <div className="mx-auto max-w-xl px-1 pt-8 pb-32">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 text-center"
      >
        <h1 className="text-[46px] leading-none font-black tracking-tight text-white">
          Drop
          <br />
          Something.
        </h1>

        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          Express yourself in your own way.
        </p>
      </motion.div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-5">

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
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.045]
                backdrop-blur-2xl
                p-6
                text-left
                transition-all
                duration-300
              `}
            >

              <div
                className={`
                  absolute
                  inset-0
                  bg-gradient-to-br
                  ${item.color}
                  opacity-100
                `}
              />

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">

                  <Icon
                    size={28}
                    className="text-white"
                  />

                </div>

                <p className="mt-8 text-xl font-black text-white">
                  {item.title}
                </p>

              </div>

            </motion.button>
          );
        })}

      </div>

      {/* Deck Button */}

      <motion.button
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={onSkip}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-[30px]
          border
          border-cyan-400/20
          bg-gradient-to-r
          from-cyan-500/10
          via-cyan-400/5
          to-purple-500/10
          py-6
          text-lg
          font-black
          text-cyan-300
          backdrop-blur-2xl
          shadow-[0_0_30px_rgba(34,211,238,0.08)]
        "
      >
        ✨ Open Today's Deck

        <ArrowRight
          size={22}
          strokeWidth={2.5}
        />
      </motion.button>

    </div>
  );
}