import { motion } from "framer-motion";

export default function DropProgress({
  current = 1,
  total = 20,
}) {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8 px-2">

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
      >

        <div className="flex items-end justify-between">

          <div>

            <p
              className="
              text-sm
              font-bold
              tracking-[0.18em]
              uppercase
              text-cyan-300
              "
            >
              Today's Deck
            </p>

            <h1
              className="
              mt-1
              text-3xl
              font-black
              tracking-tight
              "
            >
              {current}
              <span className="text-zinc-500">
                {" "}
                / {total}
              </span>
            </h1>

          </div>

          <p
            className="
            text-sm
            font-semibold
            text-zinc-500
            "
          >
            Curated for You
          </p>

        </div>

        <div
          className="
          mt-5
          h-3
          overflow-hidden
          rounded-full
          bg-white/[0.06]
          "
        >

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-cyan-300
            to-purple-500
            "
          />

        </div>

      </motion.div>

    </div>
  );
}