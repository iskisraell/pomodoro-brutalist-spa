# Convex bootstrap

This directory is intentionally scaffolded for future backend activation.

## Planned usage

- Persist Pomodoro settings and session history per authenticated Clerk user.
- Switch from local storage repository to Convex-backed repository when `VITE_ENABLE_BACKEND=true`.
- Keep client contracts aligned with `convex/schema.ts` and generated API types.

## Commands

```bash
bun run convex:dev
bun run convex:codegen
```

## Notes

- The MVP runs fully local-first and does not require Convex deployment.
- Replace placeholders in `auth.config.ts` and `.env.local` before enabling backend.
