import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MessageCircle,
  Gamepad2,
  User,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const FALLBACK =
  "https://ui-avatars.com/api/?background=111827&color=ffffff&name=U";

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
  const profilePicture =
    user?.profilePic ||
    `https://ui-avatars.com/api/?background=111827&color=ffffff&name=${encodeURIComponent(
      user?.username || "U"
    )}`;

  return (
    <AnimatePresence>

      {open && (

        <>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
            fixed
            inset-0
            z-[95]
            bg-black/70
            backdrop-blur-md
            "
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
            rounded-t-[38px]
            border-t
            border-white/10
            bg-[#090A11]
            px-6
            pt-6
            pb-8
            backdrop-blur-3xl
            "
          >

            <div className="mb-6 flex items-center justify-between">

              <div className="h-1.5 w-16 rounded-full bg-white/10 mx-auto absolute left-1/2 -translate-x-1/2 -top-3" />

              <button
                onClick={onClose}
                className="
                ml-auto
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white/5
                "
              >
                <X size={20} />
              </button>

            </div>

            <button
              onClick={onProfile}
              className="
              w-full
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.05]
              p-5
              text-left
              transition
              hover:bg-white/[0.07]
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <img
                    src={profilePicture}
                    alt=""
                    className="
                    h-20
                    w-20
                    rounded-[24px]
                    object-cover
                    border
                    border-white/10
                    "
                  />

                  <div>

                    <h2 className="text-2xl font-black">
                      {user?.username}
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400">
                      View Profile
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={22}
                  className="text-zinc-500"
                />

              </div>

            </button>
                        <div className="mt-8">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={18}
                  className="text-cyan-300"
                />

                <h3 className="text-lg font-black">
                  Common Vibes
                </h3>

              </div>

              <div className="mt-4 flex flex-wrap gap-3">

                {commonVibes.length === 0 ? (

                  <div
                    className="
                    rounded-2xl
                    border
                    border-dashed
                    border-white/10
                    px-5
                    py-4
                    text-sm
                    text-zinc-500
                    "
                  >
                    You haven't discovered any common vibes yet.
                  </div>

                ) : (

                  commonVibes.map((vibe) => (

                    <motion.div
                      key={vibe}
                      whileTap={{
                        scale: 0.96,
                      }}
                      className="
                      rounded-full
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                      px-5
                      py-2.5
                      text-sm
                      font-black
                      text-cyan-300
                      "
                    >
                      {vibe}
                    </motion.div>

                  ))

                )}

              </div>

            </div>

            {commonGround.length > 0 && (

              <div className="mt-9">

                <h3 className="text-lg font-black">
                  Things You Both Did
                </h3>

                <div className="mt-4 space-y-3">

                  {commonGround.map((item) => (

                    <motion.div
                      key={item}
                      whileHover={{
                        x: 4,
                      }}
                      className="
                      rounded-[22px]
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-5
                      py-4
                      "
                    >

                      <div className="flex items-center gap-3">

                        <Sparkles
                          size={16}
                          className="text-purple-300"
                        />

                        <span className="font-medium">
                          {item}
                        </span>

                      </div>

                    </motion.div>

                  ))}

                </div>

              </div>

            )}
                        <div className="mt-10 grid grid-cols-3 gap-4">

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onChat}
                className="
                rounded-[24px]
                bg-gradient-to-br
                from-cyan-500
                to-cyan-400
                p-5
                text-black
                shadow-[0_0_25px_rgba(34,211,238,0.25)]
                "
              >

                <div className="flex flex-col items-center">

                  <MessageCircle size={24} />

                  <p className="mt-3 text-sm font-black">
                    Vibe Together
                  </p>

                </div>

              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onGame}
                className="
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.05]
                p-5
                backdrop-blur-xl
                "
              >

                <div className="flex flex-col items-center">

                  <Gamepad2
                    size={24}
                    className="text-white"
                  />

                  <p className="mt-3 text-sm font-black">
                    Play Together
                  </p>

                  <p className="mt-1 text-[11px] text-zinc-500">
                    Coming Soon
                  </p>

                </div>

              </motion.button>

              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onProfile}
                className="
                rounded-[24px]
                border
                border-white/10
                bg-white/[0.05]
                p-5
                backdrop-blur-xl
                "
              >

                <div className="flex flex-col items-center">

                  <User
                    size={24}
                    className="text-white"
                  />

                  <p className="mt-3 text-sm font-black">
                    Full Profile
                  </p>

                </div>

              </motion.button>

            </div>

            <div
              className="
              mt-10
              rounded-[28px]
              border
              border-cyan-400/15
              bg-gradient-to-r
              from-cyan-500/10
              via-blue-500/5
              to-purple-500/10
              p-5
              "
            >

              <div className="flex items-center gap-3">

                <Sparkles
                  className="text-cyan-300"
                  size={20}
                />

                <div>

                  <p className="font-black">
                    VibeLink Insight
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    You both answered today's Question Zero.
                  </p>

                </div>

              </div>

            </div>
                      </motion.div>

        </>

      )}

    </AnimatePresence>
  );
}