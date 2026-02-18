import { MINUTE_IN_MS } from "./constants";
import type { PomodoroMode, PomodoroSettings } from "./types";

export const getModeDurationMs = (
  mode: PomodoroMode,
  settings: PomodoroSettings,
) => {
  if (mode === "focus") {
    return settings.focusMinutes * MINUTE_IN_MS;
  }

  if (mode === "shortBreak") {
    return settings.shortBreakMinutes * MINUTE_IN_MS;
  }

  return settings.longBreakMinutes * MINUTE_IN_MS;
};

export const resolveNextMode = (
  currentMode: PomodoroMode,
  completedFocusCount: number,
  longBreakInterval: number,
) => {
  if (currentMode === "focus") {
    return completedFocusCount % longBreakInterval === 0
      ? "longBreak"
      : "shortBreak";
  }

  return "focus";
};

export const formatClock = (remainingMs: number) => {
  const bounded = Math.max(0, remainingMs);
  const minutes = Math.floor(bounded / MINUTE_IN_MS);
  const seconds = Math.floor((bounded % MINUTE_IN_MS) / 1000);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const timerCompletionProgress = (
  remainingMs: number,
  totalMs: number,
) => {
  if (totalMs <= 0) {
    return 0;
  }

  const progress = ((totalMs - remainingMs) / totalMs) * 100;
  return Math.max(0, Math.min(progress, 100));
};

export const createSessionId = (mode: PomodoroMode) =>
  `${mode}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
