import { Flame, Sparkles } from "lucide-react";

import { Progress } from "@/components/ui/progress";

interface CycleTrackerProps {
  completedFocusCount: number;
  longBreakInterval: number;
}

export const CycleTracker = ({
  completedFocusCount,
  longBreakInterval,
}: CycleTrackerProps) => {
  const cycleProgress =
    (completedFocusCount % longBreakInterval) / longBreakInterval;

  return (
    <section className="rounded-[1.5rem] border-[3px] border-border bg-card p-4 soft-bump">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-xl uppercase leading-none tracking-tight">
          <Flame className="size-5" />
          Cycle tracker
        </h3>
        <span className="rounded-full border-[3px] border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          {completedFocusCount} focus done
        </span>
      </div>

      <Progress
        value={cycleProgress * 100}
        className="h-4 rounded-full border-[3px] border-border"
      />

      <p className="mt-3 flex items-center gap-2 text-sm font-medium">
        <Sparkles className="size-4" />
        Long break arrives every {longBreakInterval} focus sessions.
      </p>
    </section>
  );
};
