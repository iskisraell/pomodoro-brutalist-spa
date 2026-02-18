import { appEnv } from "@/lib/env";

export const backendFlags = {
  enabled: appEnv.enableBackend,
  hasConvexUrl: Boolean(appEnv.convexUrl),
} as const;
