export const POMODORO_MODES = ["focus", "shortBreak", "longBreak"] as const;

export type PomodoroMode = (typeof POMODORO_MODES)[number];

export const TIMER_STATUS = ["idle", "running", "paused", "completed"] as const;

export type TimerStatus = (typeof TIMER_STATUS)[number];

export interface PomodoroSettings {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakInterval: number;
  autoAdvance: boolean;
  soundEnabled: boolean;
}

export interface SessionRecord {
  id: string;
  mode: PomodoroMode;
  startedAt: number;
  endedAt: number;
  plannedMs: number;
  completed: boolean;
}

export interface TimerState {
  mode: PomodoroMode;
  status: TimerStatus;
  remainingMs: number;
  totalMs: number;
  targetMs: number | null;
  startedAt: number | null;
  completedFocusCount: number;
}

export type TimerAction =
  | { type: "start"; now: number }
  | { type: "tick"; now: number }
  | { type: "pause"; now: number }
  | { type: "reset" }
  | { type: "switchMode"; mode: PomodoroMode; durationMs: number }
  | { type: "nextSession"; mode: PomodoroMode; durationMs: number }
  | { type: "applySettings"; durationMs: number };
