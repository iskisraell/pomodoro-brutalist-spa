import { describe, expect, it } from "vitest";

import { DEFAULT_SETTINGS } from "@/features/pomodoro/model/constants";
import {
  formatClock,
  getModeDurationMs,
  resolveNextMode,
  timerCompletionProgress,
} from "@/features/pomodoro/model/timer-engine";

describe("timer-engine", () => {
  it("returns duration per mode", () => {
    expect(getModeDurationMs("focus", DEFAULT_SETTINGS)).toBe(25 * 60_000);
    expect(getModeDurationMs("shortBreak", DEFAULT_SETTINGS)).toBe(5 * 60_000);
    expect(getModeDurationMs("longBreak", DEFAULT_SETTINGS)).toBe(15 * 60_000);
  });

  it("resolves next mode according to interval", () => {
    expect(resolveNextMode("focus", 1, 4)).toBe("shortBreak");
    expect(resolveNextMode("focus", 4, 4)).toBe("longBreak");
    expect(resolveNextMode("shortBreak", 3, 4)).toBe("focus");
  });

  it("formats clock output", () => {
    expect(formatClock(90_000)).toBe("01:30");
    expect(formatClock(0)).toBe("00:00");
  });

  it("calculates completion percentage", () => {
    expect(timerCompletionProgress(50_000, 100_000)).toBe(50);
    expect(timerCompletionProgress(0, 100_000)).toBe(100);
    expect(timerCompletionProgress(100_000, 0)).toBe(0);
  });
});
