import { describe, expect, it } from "vitest";

import { timerReducer } from "@/features/pomodoro/model/timer-reducer";
import type { TimerState } from "@/features/pomodoro/model/types";

const baseState: TimerState = {
  mode: "focus",
  status: "idle",
  remainingMs: 1000,
  totalMs: 1000,
  targetMs: null,
  startedAt: null,
  completedFocusCount: 0,
};

describe("timer-reducer", () => {
  it("starts and computes target timestamp", () => {
    const next = timerReducer(baseState, { type: "start", now: 500 });

    expect(next.status).toBe("running");
    expect(next.targetMs).toBe(1500);
  });

  it("pauses with drift-safe remaining calculation", () => {
    const running = timerReducer(baseState, { type: "start", now: 200 });
    const paused = timerReducer(running, { type: "pause", now: 900 });

    expect(paused.status).toBe("paused");
    expect(paused.remainingMs).toBe(300);
  });

  it("completes focus and increments completed count", () => {
    const running = timerReducer(baseState, { type: "start", now: 100 });
    const done = timerReducer(running, { type: "tick", now: 1500 });

    expect(done.status).toBe("completed");
    expect(done.remainingMs).toBe(0);
    expect(done.completedFocusCount).toBe(1);
  });

  it("switches mode and resets timer values", () => {
    const next = timerReducer(baseState, {
      type: "switchMode",
      mode: "shortBreak",
      durationMs: 300_000,
    });

    expect(next.mode).toBe("shortBreak");
    expect(next.totalMs).toBe(300_000);
    expect(next.status).toBe("idle");
  });
});
