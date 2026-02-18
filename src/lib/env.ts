const env = import.meta.env;

const normalizeBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value !== "string") {
    return fallback;
  }

  if (value.toLowerCase() === "true") {
    return true;
  }

  if (value.toLowerCase() === "false") {
    return false;
  }

  return fallback;
};

export const appEnv = {
  enableAuth: normalizeBoolean(env.VITE_ENABLE_AUTH, false),
  enableBackend: normalizeBoolean(env.VITE_ENABLE_BACKEND, false),
  clerkPublishableKey: env.VITE_CLERK_PUBLISHABLE_KEY,
  convexUrl: env.VITE_CONVEX_URL,
} as const;
