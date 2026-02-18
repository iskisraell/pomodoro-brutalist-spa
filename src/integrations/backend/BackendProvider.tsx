import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import { localSessionRepository } from "@/features/pomodoro/data/local-session-repository";
import type { SessionRepository } from "@/features/pomodoro/data/session-repository";

import { backendFlags } from "./backend-flags";

interface BackendContextValue {
  repository: SessionRepository;
  enabled: boolean;
}

const BackendContext = createContext<BackendContextValue | null>(null);

export const BackendProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo<BackendContextValue>(
    () => ({
      repository: localSessionRepository,
      enabled: backendFlags.enabled && backendFlags.hasConvexUrl,
    }),
    [],
  );

  return (
    <BackendContext.Provider value={value}>{children}</BackendContext.Provider>
  );
};

export const useBackend = () => {
  const context = useContext(BackendContext);

  if (!context) {
    throw new Error("useBackend must be used inside BackendProvider");
  }

  return context;
};
