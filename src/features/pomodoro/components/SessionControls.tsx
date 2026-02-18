import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TimerState } from "@/features/pomodoro/model/types";

interface SessionControlsProps {
  status: TimerState["status"];
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
}

export const SessionControls = ({
  status,
  onStart,
  onPause,
  onReset,
  onNext,
}: SessionControlsProps) => {
  const isRunning = status === "running";

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
      <motion.div
        whileHover={{ y: -2, rotate: -1 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 330, damping: 22 }}
      >
        <Button
          className="wiggle-hover rounded-[1.3rem] border-[3px] border-border bg-primary px-5 py-6 text-sm font-bold uppercase tracking-wide text-primary-foreground sm:min-w-36"
          onClick={isRunning ? onPause : onStart}
        >
          {isRunning ? (
            <Pause className="size-4" />
          ) : (
            <Play className="size-4" />
          )}
          {isRunning ? "Pause" : "Start"}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ y: -2, rotate: 1 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 330, damping: 22 }}
      >
        <Button
          variant="secondary"
          className="wiggle-hover rounded-[0.65rem] border-[3px] border-border px-5 py-6 text-sm font-bold uppercase tracking-wide"
          onClick={onReset}
        >
          <RotateCcw className="size-4" />
          Reset
        </Button>
      </motion.div>

      <motion.div
        className="col-span-2 sm:col-span-1"
        whileHover={{ y: -2, rotate: -0.6 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 330, damping: 22 }}
      >
        <Button
          variant="outline"
          className="wiggle-hover w-full rounded-[1.6rem] border-[3px] border-border bg-accent px-5 py-6 text-sm font-bold uppercase tracking-wide text-accent-foreground sm:min-w-36"
          onClick={onNext}
        >
          <SkipForward className="size-4" />
          Skip forward
        </Button>
      </motion.div>
    </div>
  );
};
