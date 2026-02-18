# Project Agent Instructions

## Scope

- Build and evolve a single-page Pomodoro web app with a colorful brutalist aesthetic.
- Keep MVP local-first while preserving future paths for Clerk auth and Convex backend.

## Stack Rules

- Runtime/package manager: Bun.
- Frontend: Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion.
- Hosting target: Vercel.

## Coding Rules

- Prefer functional composition and immutable updates.
- Avoid `any`; keep contracts explicit and narrow.
- Keep UI components focused and reusable.
- Store persistence through repository interfaces, not direct feature-level storage calls.

## Workflows

- Run `bun run typecheck` after meaningful changes.
- Run `bun run test` for logic/storage changes.
- Run `bun run build` before shipping.
- Update `progress.txt` every session.
- Track risks and debt in `AGENT-EDITABLE.md`.
