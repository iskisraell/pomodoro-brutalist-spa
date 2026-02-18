import {
  POMODORO_MODES,
  type PomodoroMode,
  type TimerState,
} from "@/features/pomodoro/model/types";
import { MODE_LABELS } from "@/features/pomodoro/model/constants";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ModeTabsProps {
  activeMode: PomodoroMode;
  status: TimerState["status"];
  onChange: (mode: PomodoroMode) => void;
}

export const ModeTabs = ({ activeMode, status, onChange }: ModeTabsProps) => (
  <Tabs
    className="w-full"
    value={activeMode}
    onValueChange={(mode) => onChange(mode as PomodoroMode)}
  >
    <TabsList className="grid h-auto grid-cols-3 rounded-[0.9rem] bg-muted p-1 paper-shadow">
      {POMODORO_MODES.map((mode) => (
        <TabsTrigger
          key={mode}
          value={mode}
          className={cn(
            "rounded-[0.6rem] border-2 border-transparent px-3 py-2 text-xs font-bold uppercase tracking-wide",
            mode === activeMode && "border-border bg-card",
            status === "running" && mode !== activeMode && "opacity-60",
          )}
          disabled={status === "running"}
        >
          {MODE_LABELS[mode]}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);
