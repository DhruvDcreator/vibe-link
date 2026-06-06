import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
} from "lucide-react";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

const DEFAULT_TASKS = [];

export default function DailyTasks({
  tasks = DEFAULT_TASKS,
  rewardClaimed = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const safeTasks = safeArray(tasks);
  const completed = safeTasks.filter((task) => task?.completed).length;

  return (
    <motion.div
      layout
      className="rounded-[26px] border border-white/10 bg-white/[0.055] backdrop-blur-2xl"
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <Zap size={21} />
        </div>

        <div className="flex-1">
          <p className="font-black">Daily Tasks</p>
          <p className="mt-1 text-xs font-semibold text-zinc-500">
            Complete both to earn 20 points
          </p>
        </div>

        <span className="text-sm font-black text-cyan-300">
          {completed}/2
        </span>

        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-white/[0.07] p-4">
              {safeTasks.length === 0 && (
                <div className="rounded-2xl bg-white/[0.045] p-4 text-sm font-semibold text-zinc-400">
                  Your daily tasks will appear here.
                </div>
              )}

              {safeTasks.map((task) => {
                const target = Number(task?.target || 1);
                const progress = Math.min(target, Number(task?.progress || 0));
                const completedTask = Boolean(task?.completed) || progress >= target;

                return (
                  <div
                    key={task.id || task.title}
                    className="rounded-2xl bg-white/[0.045] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                          completedTask
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "bg-purple-400/15 text-purple-300"
                        }`}
                      >
                        {completedTask ? <Check size={16} /> : <Sparkles size={16} />}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold">
                          {task.title || "Daily task"}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-zinc-500">
                          {progress}/{target}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(100, (progress / target) * 100)}%`,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      />
                    </div>
                  </div>
                );
              })}

              {rewardClaimed && (
                <p className="rounded-xl bg-emerald-400/10 px-3 py-2 text-center text-xs font-black text-emerald-300">
                  +20 points earned today
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}