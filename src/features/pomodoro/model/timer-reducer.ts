import type { TimerAction, TimerState } from "./types";

const createIdleState = (durationMs: number) => ({
  status: "idle" as const,
  remainingMs: durationMs,
  totalMs: durationMs,
  targetMs: null,
  startedAt: null,
});

export const timerReducer = (
  state: TimerState,
  action: TimerAction,
): TimerState => {
  switch (action.type) {
    case "start": {
      if (state.status === "running") {
        return state;
      }

      return {
        ...state,
        status: "running",
        targetMs: action.now + state.remainingMs,
        startedAt: state.startedAt ?? Date.now(),
      };
    }

    case "tick": {
      if (state.status !== "running" || state.targetMs === null) {
        return state;
      }

      const remainingMs = Math.max(0, Math.ceil(state.targetMs - action.now));

      if (remainingMs > 0) {
        return {
          ...state,
          remainingMs,
        };
      }

      const completedFocusCount =
        state.mode === "focus"
          ? state.completedFocusCount + 1
          : state.completedFocusCount;

      return {
        ...state,
        status: "completed",
        remainingMs: 0,
        targetMs: null,
        completedFocusCount,
      };
    }

    case "pause": {
      if (state.status !== "running" || state.targetMs === null) {
        return state;
      }

      return {
        ...state,
        status: "paused",
        remainingMs: Math.max(0, Math.ceil(state.targetMs - action.now)),
        targetMs: null,
      };
    }

    case "reset": {
      return {
        ...state,
        ...createIdleState(state.totalMs),
      };
    }

    case "switchMode": {
      return {
        ...state,
        mode: action.mode,
        ...createIdleState(action.durationMs),
      };
    }

    case "nextSession": {
      return {
        ...state,
        mode: action.mode,
        status: "idle",
        remainingMs: action.durationMs,
        totalMs: action.durationMs,
        targetMs: null,
        startedAt: null,
      };
    }

    case "applySettings": {
      if (state.status === "running") {
        return state;
      }

      return {
        ...state,
        status: "idle",
        remainingMs: action.durationMs,
        totalMs: action.durationMs,
        targetMs: null,
      };
    }

    default: {
      return state;
    }
  }
};
