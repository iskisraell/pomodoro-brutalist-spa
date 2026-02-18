import { useMemo, useState } from "react";

import {
  DEFAULT_SETTINGS,
  MAX_LIMITS,
  MIN_LIMITS,
} from "@/features/pomodoro/model/constants";
import type { PomodoroSettings } from "@/features/pomodoro/model/types";
import { useBackend } from "@/integrations/backend/BackendProvider";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const sanitizeSettings = (settings: PomodoroSettings): PomodoroSettings => ({
  ...settings,
  focusMinutes: clamp(
    settings.focusMinutes,
    MIN_LIMITS.focusMinutes,
    MAX_LIMITS.focusMinutes,
  ),
  shortBreakMinutes: clamp(
    settings.shortBreakMinutes,
    MIN_LIMITS.shortBreakMinutes,
    MAX_LIMITS.shortBreakMinutes,
  ),
  longBreakMinutes: clamp(
    settings.longBreakMinutes,
    MIN_LIMITS.longBreakMinutes,
    MAX_LIMITS.longBreakMinutes,
  ),
  longBreakInterval: clamp(
    settings.longBreakInterval,
    MIN_LIMITS.longBreakInterval,
    MAX_LIMITS.longBreakInterval,
  ),
});

export const usePomodoroSettings = () => {
  const { repository } = useBackend();

  const [settings, setSettings] = useState<PomodoroSettings>(() =>
    sanitizeSettings(repository.loadSettings() ?? DEFAULT_SETTINGS),
  );

  const updateSettings = (partial: Partial<PomodoroSettings>) => {
    setSettings((current) => {
      const next = sanitizeSettings({ ...current, ...partial });
      repository.saveSettings(next);
      return next;
    });
  };

  return useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings],
  );
};
