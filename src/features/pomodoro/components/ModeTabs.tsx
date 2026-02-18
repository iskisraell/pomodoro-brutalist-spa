import {
  POMODORO_MODES,
  type PomodoroMode,
  type TimerState,
} from "@/features/pomodoro/model/types";
import { MODE_LABELS } from "@/features/pomodoro/model/constants";
import { cn } from "@/lib/utils";

interface ModeTabsProps {
  activeMode: PomodoroMode;
  status: TimerState["status"];
  onChange: (mode: PomodoroMode) => void;
}

export const ModeTabs = ({ activeMode, status, onChange }: ModeTabsProps) => {
  const isLocked = status === "running";

  return (
    <div className="grid h-auto grid-cols-3 rounded-[0.9rem] bg-muted p-1 paper-shadow">
      {POMODORO_MODES.map((mode) => {
        const isActive = mode === activeMode;

        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            disabled={isLocked && !isActive}
            className={cn(
              "relative rounded-[0.6rem] border-2 border-transparent px-3 py-2 text-xs font-bold uppercase tracking-wide",
              "transition-all duration-200",
              isLocked && !isActive && "opacity-55",
              isActive && "bg-card border-border border-[3px]",
            )}
          >
            <span className="relative z-10">{MODE_LABELS[mode]}</span>
          </button>
        );
      })}
    </div>
  );
};
