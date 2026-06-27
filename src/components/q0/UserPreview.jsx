import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Gamepad2,
  User,
  Sparkles,
} from "lucide-react";

const FALLBACK =
  "https://ui-avatars.com/api/?background=111827&color=ffffff&name=V";

export default function UserPreview({
  open,
  user,
  commonVibes = [],
  commonGround = [],
  onClose,
  onChat,
  onGame,
  onProfile,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="
            fixed
            bottom-0
            left-0
            right-0
            z-[96]
            rounded-t-[34px]
            border-t
            border-white/10
            bg-[#0A0B11]
            p-6
            "
          >
            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                <img
                  src={
                    user?.profilePic ||
                    FALLBACK
                  }
                  alt=""
                  className="
                  h-20
                  w-20
                  rounded-3xl
                  object-cover
                  "
                />

                <div>

                  <h2 className="text-2xl font-black">
                    @{user?.username}
                  </h2>

                  <p className="mt-1 text-zinc-400">
                    Find Your People
                  </p>

                </div>

              </div>

              <button
                onClick={onClose}
              >
                <X />
              </button>

            </div>

            <div className="mt-8">

              <p className="text-sm font-black text-cyan-300">
                ✨ Your Common Ground
              </p>

              <div className="mt-3 flex flex-wrap gap-2">

                {commonVibes.length === 0 && (
                  <span className="text-zinc-500 text-sm">
                    No common vibes yet.
                  </span>
                )}

                {commonVibes.map((vibe) => (
                  <span
                    key={vibe}
                    className="
                    rounded-full
                    bg-cyan-400/10
                    px-4
                    py-2
                    text-sm
                    font-bold
                    text-cyan-300
                    "
                  >
                    {vibe}
                  </span>
                ))}

              </div>

            </div>

            {commonGround.length > 0 && (

              <div className="mt-8">

                <p className="text-sm font-black text-purple-300">
                  <Sparkles
                    size={15}
                    className="inline mr-2"
                  />
                  Things you both did
                </p>

                <div className="mt-3 space-y-2">

                  {commonGround.map(
                    (item) => (
                      <div
                        key={item}
                        className="
                        rounded-2xl
                        bg-white/5
                        p-3
                        text-sm
                        "
                      >
                        {item}
                      </div>
                    )
                  )}

                </div>

              </div>

            )}

            <div className="mt-8 grid grid-cols-3 gap-3">

              <button
                onClick={onChat}
                className="
                flex
                flex-col
                items-center
                gap-2
                rounded-2xl
                bg-cyan-500
                py-4
                font-black
                text-black
                "
              >
                <MessageCircle
                  size={20}
                />
                Vibe
              </button>

              <button
                onClick={onGame}
                className="
                flex
                flex-col
                items-center
                gap-2
                rounded-2xl
                bg-white/8
                py-4
                font-black
                "
              >
                <Gamepad2
                  size={20}
                />
                Play
              </button>

              <button
                onClick={onProfile}
                className="
                flex
                flex-col
                items-center
                gap-2
                rounded-2xl
                bg-white/8
                py-4
                font-black
                "
              >
                <User
                  size={20}
                />
                Profile
              </button>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}