import { motion } from "framer-motion";
import {
  ChevronRight,
  Sparkles,
  MessageCircle,
  Pencil,
} from "lucide-react";
const AVATAR_BASE =
  "https://ui-avatars.com/api/?background=111827&color=ffffff&name=";

function getDisplayName(answer) {
  return (
    answer?.username ||
    answer?.displayName ||
    answer?.name ||
    "VibeLink User"
  );
}

function getAvatarSrc(answer, displayName) {
  if (answer?.profilePic) return answer.profilePic;

  return `${AVATAR_BASE}${encodeURIComponent(displayName)}`;
}

function getCommonVibes(answer) {
  const vibes = answer?.commonVibes;

  if (!Array.isArray(vibes) || vibes.length === 0) {
    return null;
  }

  const labels = vibes
  .map((vibe) => {
    if (typeof vibe === "string") return vibe;
    if (vibe?.emoji && vibe?.name)
      return `${vibe.emoji} ${vibe.name}`;
    if (vibe?.label) return vibe.label;
    if (vibe?.name) return vibe.name;
    return null;
  })
  .filter(Boolean);

if (labels.length === 0) {
  return null;
}

const preview = labels.slice(0, 3);

if (labels.length > 3) {
  preview.push(`+${labels.length - 3}`);
}

return preview.join(" • ");
}

export default function AnswerCard({
  answer,
  currentUid,
  onUserClick,
  onToggleMe,
  onChat,
  onEdit,
}) {
  const displayName = getDisplayName(answer);
  const avatarSrc = getAvatarSrc(answer, displayName);
  const commonVibes = getCommonVibes(answer);

  const meBy = Array.isArray(answer?.meBy) ? answer.meBy : [];
  const alreadyMe = Boolean(currentUid && meBy.includes(currentUid));
  const isOwnAnswer = answer?.uid === currentUid;
  const meCount = answer?.meCount || 0;

  return (
    <motion.article
      layout
      whileHover={{
  y: -2,
  scale: 1.01,
}}
      transition={{
  type: "spring",
  stiffness: 300,
  damping: 24,
}}
      className="
        group
        overflow-hidden
        rounded-[30px]
        border
       border-white/8
bg-white/[0.045]
        p-6
        shadow-[0_18px_60px_rgba(0,0,0,0.22)]
        backdrop-blur-2xl
        transition
        duration-300
       hover:border-white/15
hover:bg-white/[0.06]
        hover:shadow-[0_22px_80px_rgba(34,211,238,0.12)]
        sm:p-7
      "
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={() => onUserClick?.(answer)}
        className="
          flex
          w-full
          items-center
          gap-4
          rounded-[24px]
          text-left
          outline-none
          transition
          focus-visible:ring-2
          focus-visible:ring-cyan-300/70
          focus-visible:ring-offset-2
          focus-visible:ring-offset-zinc-950
        "
      >
        <img
  src={avatarSrc}
  alt={displayName}
  onError={(e) => {
    e.currentTarget.src =
      `${AVATAR_BASE}${encodeURIComponent(displayName)}`;
  }}
  className="
    h-14
    w-14
    shrink-0
    rounded-2xl
    border
    border-white/15
    object-cover
    shadow-[0_10px_30px_rgba(0,0,0,0.24)]
  "
/>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-black leading-tight text-white">
            {displayName}
          </h3>

          <p className="mt-1 truncate text-sm font-medium text-zinc-400">
            {commonVibes || "View Profile →"}
          </p>
        </div>

        <ChevronRight
          size={22}
          strokeWidth={2.4}
          className="
            shrink-0
            text-zinc-500
            transition
            duration-300
            group-hover:translate-x-0.5
            group-hover:text-white
          "
        />
      </motion.button>

      <p
        className="
  mt-8
  whitespace-pre-wrap
  break-words
  text-lg
  font-medium
  leading-8
  tracking-normal
  text-white
"
      >
        {answer?.answer}
      </p>

      <div className="mt-8 flex items-center justify-between gap-4">
        {isOwnAnswer ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onEdit?.()}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.06]
              px-5
              py-3
              text-sm
              font-black
              text-white
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              backdrop-blur-xl
              transition
              hover:border-white/18
              hover:bg-white/[0.1]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-zinc-950
            "
          >
            <Pencil size={18} />
<span>Edit</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => onChat?.(answer)}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.06]
              px-5
              py-3
              text-sm
              font-black
              text-white
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              backdrop-blur-xl
              transition
              hover:border-white/18
              hover:bg-white/[0.1]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-cyan-300/70
              focus-visible:ring-offset-2
              focus-visible:ring-offset-zinc-950
            "
          >
            <MessageCircle size={18} />
<span>Chat</span>
          </motion.button>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => onToggleMe?.(answer)}
          className={`
            inline-flex
            items-center
            gap-2.5
            rounded-2xl
            border
            px-5
            py-3
            text-sm
            font-black
            shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]
            backdrop-blur-xl
            transition
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-cyan-300/80
            focus-visible:ring-offset-2
            focus-visible:ring-offset-zinc-950
            ${
              alreadyMe
                ? "border-cyan-200/60 bg-cyan-300 text-zinc-950 shadow-[0_12px_34px_rgba(34,211,238,0.35)] hover:bg-cyan-200"
                : "border-white/10 bg-white/[0.06] text-cyan-200 hover:border-cyan-200/30 hover:bg-cyan-300/10 hover:text-cyan-100"
            }
          `}
        >
          <Sparkles size={17} strokeWidth={2.5} />
          <span>ME</span>
          <span>{meCount}</span>
        </motion.button>
      </div>
    </motion.article>
  );
}