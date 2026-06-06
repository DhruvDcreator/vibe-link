import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Clapperboard,
  HelpCircle,
  ListChecks,
  Plus,
  Upload,
  X,
} from "lucide-react";

const VIBE_CATEGORIES = [
  "Movies",
  "Music",
  "Anime",
  "Gaming",
  "Tech",
  "Travel",
  "Cricket",
  "Fitness",
  "Coding",
  "F1",
];

const DROP_TYPES = [
  { id: "photo", label: "Photo", icon: Camera },
  { id: "video", label: "Video", icon: Clapperboard },
  { id: "question", label: "Question", icon: HelpCircle },
  { id: "poll", label: "Poll", icon: ListChecks },
];

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function DropCircle({ drop, onOpen }) {
  const viewed = Boolean(drop?.viewed);

  return (
    <button
      type="button"
      onClick={() => onOpen?.(drop)}
      className="shrink-0 text-center"
    >
      <motion.div
        animate={
          viewed
            ? {}
            : {
                boxShadow: [
                  "0 0 0 rgba(34,211,238,0)",
                  "0 0 22px rgba(34,211,238,.5)",
                  "0 0 0 rgba(34,211,238,0)",
                ],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 2.2,
        }}
        className={`rounded-full p-[3px] ${
          viewed
            ? "bg-zinc-700"
            : "bg-gradient-to-r from-cyan-400 to-purple-500"
        }`}
      >
        <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-[#03040A] bg-white/[0.06] text-cyan-300">
          {drop?.type === "video" ? (
            <Clapperboard size={22} />
          ) : drop?.type === "question" ? (
            <HelpCircle size={22} />
          ) : drop?.type === "poll" ? (
            <ListChecks size={22} />
          ) : (
            <Camera size={22} />
          )}
        </div>
      </motion.div>

      <p className="mt-2 max-w-[70px] truncate text-[11px] font-black">
        {drop?.category || "Vibe Drop"}
      </p>
    </button>
  );
}

function VibeDropComposer({ onClose, onCreate }) {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");

  const selectedType = DROP_TYPES.find((item) => item.id === type);

  const submit = () => {
    if (!type || !category) return;

    onCreate?.({
      type,
      category,
      content,
      fileName,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/75 p-4 backdrop-blur-md sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#10111a] p-5 shadow-[0_0_60px_rgba(34,211,238,0.14)]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Create Vibe Drop</h2>

          <button type="button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p className="mt-5 text-sm font-bold text-zinc-300">
          What would you like to drop?
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {DROP_TYPES.map((item) => {
            const Icon = item.icon;
            const selected = type === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setType(item.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100"
                    : "border-white/10 bg-white/[0.055] text-zinc-300"
                }`}
              >
                <Icon size={22} />
                <p className="mt-3 text-sm font-black">{item.label}</p>
              </button>
            );
          })}
        </div>

        {selectedType && (
          <>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
              Choose vibe category
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {VIBE_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-3 py-2 text-xs font-bold ${
                    category === item
                      ? "bg-cyan-400 text-black"
                      : "bg-white/[0.07] text-zinc-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {(type === "photo" || type === "video") && (
              <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan-300/30 bg-cyan-400/10 px-4 py-4 text-sm font-bold text-cyan-200">
                <Upload size={18} />
                {fileName || "Choose file"}
                <input
                  type="file"
                  accept={type === "video" ? "video/*" : "image/*"}
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setFileName(file?.name || "");
                  }}
                />
              </label>
            )}

            {(type === "question" || type === "poll") && (
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={
                  type === "question"
                    ? "Ask your tribe something..."
                    : "Write your poll idea..."
                }
                maxLength={240}
                className="mt-5 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm outline-none"
              />
            )}
          </>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={!type || !category}
          className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3.5 text-sm font-black disabled:cursor-not-allowed disabled:opacity-45"
        >
          Upload Vibe Drop
        </button>
      </motion.div>
    </div>
  );
}

export default function VibeDrops({
  drops = [],
  onCreateDrop,
  onOpenDrop,
}) {
  const [composerOpen, setComposerOpen] = useState(false);
  const safeDrops = safeArray(drops).slice(0, 4);

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Vibe Drops
        </h2>
        <p className="mt-1 text-xs font-semibold text-zinc-500">
          Fresh drops from people on your wavelength
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setComposerOpen(true)}
          className="shrink-0 text-center"
        >
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-dashed border-cyan-300/60 bg-cyan-400/10 text-cyan-300">
            <Plus size={25} />
          </div>

          <p className="mt-2 text-[11px] font-black">Add Drop</p>
        </button>

        {safeDrops.length === 0 && (
          <div className="flex min-h-[88px] items-center rounded-[22px] border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-zinc-500">
            No Vibe Drops yet.
          </div>
        )}

        {safeDrops.map((drop) => (
          <DropCircle
            key={drop.id || `${drop.category}-${drop.type}`}
            drop={drop}
            onOpen={onOpenDrop}
          />
        ))}
      </div>

      <AnimatePresence>
        {composerOpen && (
          <VibeDropComposer
            onClose={() => setComposerOpen(false)}
            onCreate={onCreateDrop}
          />
        )}
      </AnimatePresence>
    </section>
  );
}