import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { MODE_LABELS } from "@/features/pomodoro/model/constants";
import { formatClock } from "@/features/pomodoro/model/timer-engine";
import type { TimerState } from "@/features/pomodoro/model/types";
import { cn } from "@/lib/utils";

interface TimerFaceProps {
  state: TimerState;
  progress: number;
}

export const TimerFace = ({ state, progress }: TimerFaceProps) => {
  const modeAccent =
    state.mode === "focus"
      ? "bg-primary text-primary-foreground"
      : state.mode === "shortBreak"
        ? "bg-secondary text-secondary-foreground"
        : "bg-accent text-accent-foreground";

  return (
    <motion.section
      className="relative overflow-hidden rounded-[2.2rem] border-[3px] border-border bg-card px-5 py-8 paper-shadow noise-overlay"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="mb-6 flex items-center justify-between">
        <Badge
          className={cn(
            "rounded-full border-[3px] border-border px-3 py-1 text-xs",
            modeAccent,
          )}
        >
          {MODE_LABELS[state.mode]}
        </Badge>
        <Badge
          variant="outline"
          className="rounded-full border-[3px] border-border bg-background px-3 py-1 text-xs"
        >
          {state.status}
        </Badge>
      </div>

      <div className="relative mx-auto mb-6 aspect-square w-full max-w-[290px] rounded-full border-[4px] border-border bg-background p-4 shadow-[inset_0_0_0_8px_oklch(0.97_0.03_44)]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="oklch(0.9 0.04 245)"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            stroke="oklch(0.58 0.24 286)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 52}
            animate={{
              strokeDashoffset: (1 - progress / 100) * 2 * Math.PI * 52,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            fill="none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.p
            key={state.remainingMs}
            initial={{ scale: 0.94, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="font-display text-6xl leading-none tracking-tight md:text-7xl"
          >
            {formatClock(state.remainingMs)}
          </motion.p>
          <span className="mt-2 rounded-full border-[3px] border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {progress.toFixed(0)}% done
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="rounded-full border-[3px] border-border bg-muted px-4 py-2 text-sm font-medium">
          Stay playful. Stay sharp.
        </div>
      </div>
    </motion.section>
  );
};
