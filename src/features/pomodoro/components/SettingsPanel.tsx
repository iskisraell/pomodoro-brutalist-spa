import { SlidersHorizontal, Volume2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MAX_LIMITS, MIN_LIMITS } from "@/features/pomodoro/model/constants";
import type { PomodoroSettings } from "@/features/pomodoro/model/types";

interface SettingsPanelProps {
  settings: PomodoroSettings;
  onSettingsChange: (next: Partial<PomodoroSettings>) => void;
  compact?: boolean;
}

interface RangeControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const RangeControl = ({
  label,
  value,
  min,
  max,
  onChange,
}: RangeControlProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm font-semibold">
      <Label className="text-sm font-semibold">{label}</Label>
      <span className="rounded-full border-[2px] border-border bg-background px-2 py-1 text-xs">
        {value} min
      </span>
    </div>
    <Slider
      min={min}
      max={max}
      step={1}
      value={[value]}
      onValueChange={([next]) => onChange(next ?? value)}
      className="[&_[data-slot=slider-track]]:border-[2px] [&_[data-slot=slider-track]]:border-border"
    />
  </div>
);

export const SettingsPanel = ({
  settings,
  onSettingsChange,
  compact = false,
}: SettingsPanelProps) => (
  <Card className="rounded-[1.5rem] border-[3px] border-border bg-card paper-shadow">
    {compact ? null : (
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-display text-2xl uppercase">
          <SlidersHorizontal className="size-5" />
          Ritual setup
        </CardTitle>
      </CardHeader>
    )}

    <CardContent className={compact ? "space-y-4 pt-6" : "space-y-4"}>
      <RangeControl
        label="Focus"
        value={settings.focusMinutes}
        min={MIN_LIMITS.focusMinutes}
        max={MAX_LIMITS.focusMinutes}
        onChange={(focusMinutes) => onSettingsChange({ focusMinutes })}
      />

      <RangeControl
        label="Short break"
        value={settings.shortBreakMinutes}
        min={MIN_LIMITS.shortBreakMinutes}
        max={MAX_LIMITS.shortBreakMinutes}
        onChange={(shortBreakMinutes) =>
          onSettingsChange({ shortBreakMinutes })
        }
      />

      <RangeControl
        label="Long break"
        value={settings.longBreakMinutes}
        min={MIN_LIMITS.longBreakMinutes}
        max={MAX_LIMITS.longBreakMinutes}
        onChange={(longBreakMinutes) => onSettingsChange({ longBreakMinutes })}
      />

      <RangeControl
        label="Long break interval"
        value={settings.longBreakInterval}
        min={MIN_LIMITS.longBreakInterval}
        max={MAX_LIMITS.longBreakInterval}
        onChange={(longBreakInterval) =>
          onSettingsChange({ longBreakInterval })
        }
      />

      <div className="space-y-3 border-t-[3px] border-border pt-3">
        <div className="flex items-center justify-between rounded-[1rem] border-[3px] border-border bg-muted px-3 py-2">
          <Label htmlFor="auto-advance" className="text-sm font-semibold">
            Auto advance
          </Label>
          <Switch
            id="auto-advance"
            checked={settings.autoAdvance}
            onCheckedChange={(autoAdvance) => onSettingsChange({ autoAdvance })}
          />
        </div>

        <div className="flex items-center justify-between rounded-[0.6rem] border-[3px] border-border bg-muted px-3 py-2">
          <Label
            htmlFor="sound-enabled"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Volume2 className="size-4" />
            Celebration sound
          </Label>
          <Switch
            id="sound-enabled"
            checked={settings.soundEnabled}
            onCheckedChange={(soundEnabled) =>
              onSettingsChange({ soundEnabled })
            }
          />
        </div>
      </div>
    </CardContent>
  </Card>
);
