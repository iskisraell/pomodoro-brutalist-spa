## Backlog

- [high] Add optional server-time synchronization when backend mode is enabled to keep cross-device timer consistency.
  - Plan: fetch server epoch offset once on app load and adjust countdown projections.
  - Blast radius: `src/features/pomodoro/hooks/usePomodoroTimer.ts`, future Convex integration layer.
- [medium] Persist in-progress timer state across hard refresh.
  - Plan: store running/paused snapshot with start epoch and restore state safely.
  - Blast radius: local repository and timer hook.
- [medium] Introduce keyboard shortcuts with discoverable help modal.
  - Plan: support `Space` start/pause, `R` reset, `N` next.
  - Blast radius: app shell and accessibility docs.

## Findings

- shadcn CLI with Tailwind v4 requires import alias and valid Tailwind CSS imports before init.
- Drift-safe countdown is stable when time is derived from `targetMs - performance.now()` rather than interval decrements.

## Session Notes

- 2026-02-18: Bootstrapped project from scratch and implemented MVP architecture with local persistence.
- 2026-02-18: Prepared Convex and Clerk scaffolding behind feature flags without enforcing runtime env requirements.
- 2026-02-18: Added colorful brutalist token system and responsive interface aligned with design intent.
