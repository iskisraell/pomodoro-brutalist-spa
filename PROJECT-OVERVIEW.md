# Project Overview

## Product

Pomodoro Playground is a single-page Pomodoro timer focused on expressive, colorful brutalist UI and practical study/work flow support.

## Architecture

```text
pomodoro-brutalist-spa/
├── src/
│   ├── app/                                # App shell composition
│   ├── components/ui/                      # shadcn/ui local components
│   ├── features/pomodoro/
│   │   ├── components/                     # Timer + panels
│   │   ├── data/                           # Repository contracts and local implementation
│   │   ├── hooks/                          # Settings, history, timer orchestration
│   │   └── model/                          # Types, constants, reducer, timer engine
│   ├── integrations/
│   │   ├── auth/                           # Clerk-ready provider gate
│   │   └── backend/                        # Convex-ready backend gate
│   ├── lib/                                # env + generic utils
│   └── test/                               # Vitest setup
├── convex/                                 # Future backend schema/auth bootstrap
├── vercel.json                             # SPA rewrite + build settings
├── project.yaml                            # Structured project metadata
└── progress.txt                            # Session log
```

## Data Flow

1. User adjusts settings and controls timer.
2. Timer reducer computes drift-safe countdown from `performance.now()`.
3. Completed sessions are saved through `SessionRepository`.
4. MVP uses local storage repository.
5. Future backend switch can route repository calls to Convex.

## Design Direction

- Colorful playful brutalism
- Mixed corner geometry (sharp and soft)
- Thick outlines, paper-like shadows, and atmospheric gradients
- Mobile-first responsive behavior with desktop polish
