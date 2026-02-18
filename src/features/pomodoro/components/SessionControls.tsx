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
      <Button
        className="wiggle-hover rounded-[1.3rem] border-[3px] border-border bg-primary px-5 py-6 text-sm font-bold uppercase tracking-wide text-primary-foreground sm:min-w-36"
        onClick={isRunning ? onPause : onStart}
      >
        {isRunning ? <Pause className="size-4" /> : <Play className="size-4" />}
        {isRunning ? "Pause" : "Start"}
      </Button>

      <Button
        variant="secondary"
        className="wiggle-hover rounded-[0.65rem] border-[3px] border-border px-5 py-6 text-sm font-bold uppercase tracking-wide"
        onClick={onReset}
      >
        <RotateCcw className="size-4" />
        Reset
      </Button>

      <Button
        variant="outline"
        className="wiggle-hover col-span-2 rounded-[1.6rem] border-[3px] border-border bg-accent px-5 py-6 text-sm font-bold uppercase tracking-wide text-accent-foreground sm:col-span-1 sm:min-w-36"
        onClick={onNext}
      >
        <SkipForward className="size-4" />
        Skip forward
      </Button>
    </div>
  );
};
