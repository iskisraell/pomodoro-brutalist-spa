import { beforeEach, describe, expect, it } from "vitest";

import { localSessionRepository } from "@/features/pomodoro/data/local-session-repository";
import { STORAGE_KEYS } from "@/features/pomodoro/model/constants";

describe("local-session-repository", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns defaults when settings payload is invalid", () => {
    window.localStorage.setItem(STORAGE_KEYS.settings, "{bad json");
    const settings = localSessionRepository.loadSettings();

    expect(settings?.focusMinutes).toBe(25);
    expect(settings?.longBreakInterval).toBe(4);
  });

  it("filters malformed sessions from storage payload", () => {
    window.localStorage.setItem(
      STORAGE_KEYS.sessions,
      JSON.stringify([
        {
          id: "ok",
          mode: "focus",
          startedAt: 1,
          endedAt: 2,
          plannedMs: 3,
          completed: true,
        },
        { id: 1, mode: "focus" },
      ]),
    );

    const sessions = localSessionRepository.loadSessions();
    expect(sessions).toHaveLength(1);
    expect(sessions[0]?.id).toBe("ok");
  });
});
