import type { PomodoroMode, PomodoroSettings } from "./types";

export const STORAGE_KEYS = {
  settings: "pomodoro.brutalist.settings.v1",
  sessions: "pomodoro.brutalist.sessions.v1",
} as const;

export const MODE_LABELS: Record<PomodoroMode, string> = {
  focus: "Focus",
  shortBreak: "Short break",
  longBreak: "Long break",
};

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakInterval: 4,
  autoAdvance: true,
  soundEnabled: true,
};

export const MINUTE_IN_MS = 60_000;

export const MIN_LIMITS = {
  focusMinutes: 10,
  shortBreakMinutes: 3,
  longBreakMinutes: 10,
  longBreakInterval: 2,
} as const;

export const MAX_LIMITS = {
  focusMinutes: 90,
  shortBreakMinutes: 20,
  longBreakMinutes: 45,
  longBreakInterval: 8,
} as const;
