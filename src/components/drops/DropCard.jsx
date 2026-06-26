import { motion } from "framer-motion";

export default function DropCard({ drop }) {
  return (
    <motion.div
      layout
      className="
      relative
      overflow-hidden
      rounded-[34px]
      border
      border-white/10
      bg-white/[0.05]
      backdrop-blur-2xl
      min-h-[58vh]
      px-8
      py-10
      flex
      flex-col
      justify-center
      "
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative z-10 text-center">

        <p
          className="
          text-3xl
          font-bold
          leading-relaxed
          text-white
          "
        >
          {drop.content}
        </p>

      </div>

    </motion.div>
  );
}