import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { CircleDashed } from "lucide-react";

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

  const secondsKey = Math.floor(state.remainingMs / 1000);
  const isRunning = state.status === "running";
  const orbitColor =
    state.mode === "focus"
      ? "oklch(0.57 0.24 286)"
      : state.mode === "shortBreak"
        ? "oklch(0.84 0.19 50)"
        : "oklch(0.82 0.2 145)";
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const orbitRotation = useMotionValue(0);
  
  useAnimationFrame((time) => {
    if (isRunning) {
      orbitRotation.set(time / 50);
    }
  });

  return (
    <motion.section
      className="relative overflow-hidden rounded-[2.2rem] border-[3px] border-border bg-card px-5 py-8 paper-shadow noise-overlay"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-12 size-44 rounded-full bg-primary/20"
        style={{ filter: "blur(24px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -bottom-14 size-48 rounded-full bg-accent/20"
        style={{ filter: "blur(24px)" }}
      />

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

      <div className="relative mx-auto mb-6 aspect-square w-full max-w-[320px] overflow-visible rounded-full border-[4px] border-border bg-background p-5 shadow-[inset_0_0_0_8px_oklch(0.97_0.03_44)]">
        <motion.div
          aria-hidden
          className="absolute inset-[9%] rounded-full border-2 border-dashed border-border/50"
          style={{ rotate: orbitRotation }}
        />

        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="oklch(0.9 0.04 245)"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={orbitColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.15, ease: "linear" }}
            fill="none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.p
            key={secondsKey}
            initial={{ scale: 0.84, opacity: 0.55, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="font-display text-6xl leading-none tracking-tight md:text-7xl"
          >
            {formatClock(state.remainingMs)}
          </motion.p>
          <motion.span
            animate={{ scale: isRunning ? [1, 1.05, 1] : 1 }}
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: isRunning ? Infinity : 0,
            }}
            className="mt-2 rounded-full border-[3px] border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          >
            {progress.toFixed(0)}% done
          </motion.span>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wide"
          animate={{ rotate: isRunning ? [0, -1.5, 1.5, 0] : 0 }}
          transition={{ duration: 1.8, repeat: isRunning ? Infinity : 0 }}
        >
          <CircleDashed className="size-3.5" />
          Dial live
        </motion.div>
      </div>
    </motion.section>
  );
};
