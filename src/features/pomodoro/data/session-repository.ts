import type {
  PomodoroSettings,
  SessionRecord,
} from "@/features/pomodoro/model/types";

export interface SessionRepository {
  loadSettings: () => PomodoroSettings | null;
  saveSettings: (settings: PomodoroSettings) => void;
  loadSessions: () => SessionRecord[];
  saveSessions: (sessions: SessionRecord[]) => void;
}
