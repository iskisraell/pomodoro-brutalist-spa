import {
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
} from "@/features/pomodoro/model/constants";
import type {
  PomodoroSettings,
  SessionRecord,
} from "@/features/pomodoro/model/types";

import type { SessionRepository } from "./session-repository";

const safeJsonParse = <T>(payload: string | null): T | null => {
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as T;
  } catch {
    return null;
  }
};

const normalizeSettings = (
  payload: Partial<PomodoroSettings> | null,
): PomodoroSettings => ({
  ...DEFAULT_SETTINGS,
  ...payload,
});

const normalizeSessions = (payload: unknown): SessionRecord[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .filter((entry): entry is SessionRecord => {
      if (typeof entry !== "object" || entry === null) {
        return false;
      }

      const candidate = entry as Partial<SessionRecord>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.mode === "string" &&
        typeof candidate.startedAt === "number" &&
        typeof candidate.endedAt === "number" &&
        typeof candidate.plannedMs === "number" &&
        typeof candidate.completed === "boolean"
      );
    })
    .slice(0, 40);
};

export const localSessionRepository: SessionRepository = {
  loadSettings: () => {
    if (typeof window === "undefined") {
      return DEFAULT_SETTINGS;
    }

    return normalizeSettings(
      safeJsonParse<Partial<PomodoroSettings>>(
        window.localStorage.getItem(STORAGE_KEYS.settings),
      ),
    );
  },
  saveSettings: (settings) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEYS.settings,
      JSON.stringify(settings),
    );
  },
  loadSessions: () => {
    if (typeof window === "undefined") {
      return [];
    }

    return normalizeSessions(
      safeJsonParse<unknown>(
        window.localStorage.getItem(STORAGE_KEYS.sessions),
      ),
    );
  },
  saveSessions: (sessions) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEYS.sessions,
      JSON.stringify(sessions.slice(0, 40)),
    );
  },
};
