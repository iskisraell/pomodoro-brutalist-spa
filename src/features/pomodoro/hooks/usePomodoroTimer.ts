import { useEffect, useMemo, useReducer, useRef } from "react";

import {
  getModeDurationMs,
  resolveNextMode,
  timerCompletionProgress,
} from "@/features/pomodoro/model/timer-engine";
import { timerReducer } from "@/features/pomodoro/model/timer-reducer";
import type {
  PomodoroSettings,
  SessionRecord,
  TimerState,
} from "@/features/pomodoro/model/types";

interface UsePomodoroTimerOptions {
  settings: PomodoroSettings;
  onSessionSaved: (session: SessionRecord) => void;
}

export const usePomodoroTimer = ({
  settings,
  onSessionSaved,
}: UsePomodoroTimerOptions) => {
  const [state, dispatch] = useReducer(timerReducer, {
    mode: "focus",
    status: "idle",
    totalMs: getModeDurationMs("focus", settings),
    remainingMs: getModeDurationMs("focus", settings),
    targetMs: null,
    startedAt: null,
    completedFocusCount: 0,
  } satisfies TimerState);

  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (state.status !== "running") {
      return;
    }

    let frameId: number;
    const tick = () => {
      dispatch({ type: "tick", now: performance.now() });
      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(frameId);
  }, [state.status]);

  useEffect(() => {
    if (state.status === "running") {
      return;
    }

    if (state.mode !== "focus" && state.status !== "completed") {
      return;
    }

    const durationMs = getModeDurationMs(state.mode, settings);

    if (durationMs === state.totalMs) {
      return;
    }

    dispatch({ type: "applySettings", durationMs });
  }, [state.mode, state.status, state.totalMs, settings]);

  const completionHandledRef = useRef(false);

  useEffect(() => {
    if (state.status !== "completed") {
      completionHandledRef.current = false;
      return;
    }

    if (completionHandledRef.current) {
      return;
    }

    completionHandledRef.current = true;

    const startedAt = state.startedAt ?? Date.now() - state.totalMs;

    onSessionSaved({
      id: `${state.mode}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      mode: state.mode,
      startedAt,
      endedAt: Date.now(),
      plannedMs: state.totalMs,
      completed: true,
    });

    if (!settings.autoAdvance) {
      return;
    }

    const nextMode = resolveNextMode(
      state.mode,
      state.completedFocusCount,
      settings.longBreakInterval,
    );
    const nextDurationMs = getModeDurationMs(nextMode, settings);

    const timeoutId = window.setTimeout(() => {
      dispatch({
        type: "nextSession",
        mode: nextMode,
        durationMs: nextDurationMs,
      });
    }, 680);

    return () => window.clearTimeout(timeoutId);
  }, [onSessionSaved, settings, state]);

  const start = () => dispatch({ type: "start", now: performance.now() });
  const pause = () => dispatch({ type: "pause", now: performance.now() });
  const reset = () => dispatch({ type: "reset" });

  const switchMode = (mode: TimerState["mode"]) => {
    const durationMs = getModeDurationMs(mode, settings);
    dispatch({ type: "switchMode", mode, durationMs });
  };

  const goToNext = () => {
    const snapshot = stateRef.current;
    const nextMode = resolveNextMode(
      snapshot.mode,
      snapshot.completedFocusCount,
      settings.longBreakInterval,
    );
    const durationMs = getModeDurationMs(nextMode, settings);
    dispatch({ type: "nextSession", mode: nextMode, durationMs });
  };

  const progress = useMemo(
    () => timerCompletionProgress(state.remainingMs, state.totalMs),
    [state.remainingMs, state.totalMs],
  );

  return {
    state,
    progress,
    start,
    pause,
    reset,
    switchMode,
    goToNext,
  };
};
