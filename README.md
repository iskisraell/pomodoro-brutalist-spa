# Pomodoro Playground

Single-page Pomodoro timer web app with a colorful brutalist visual language (sharp + soft forms), built for playful focus rituals.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 + shadcn/ui + Framer Motion
- Bun (runtime + package manager)
- Vercel deployment target
- Future-ready: Convex + Clerk (disabled by default)

## Quickstart

```bash
bun install
bun run dev
```

Open `http://localhost:5173`.

## Verification

```bash
bun run typecheck
bun run test
bun run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and adjust placeholders as needed.

```env
VITE_ENABLE_AUTH=false
VITE_ENABLE_BACKEND=false
VITE_CLERK_PUBLISHABLE_KEY=pk_test_placeholder_key
VITE_CONVEX_URL=https://placeholder.convex.cloud
```

## Convex and Clerk (future activation)

- Keep `VITE_ENABLE_AUTH=false` and `VITE_ENABLE_BACKEND=false` for MVP.
- When enabling:
  1. Configure real Clerk publishable key.
  2. Configure Convex deployment URL.
  3. Run `bun run convex:dev` and `bun run convex:codegen`.

## Deploy to Vercel

`vercel.json` is already configured for SPA rewrites (`/(.*)` -> `/index.html`).

Build output: `dist/` via `bun run build`.
