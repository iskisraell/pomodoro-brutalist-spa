import { useMemo, useState } from "react";

import type { SessionRecord } from "@/features/pomodoro/model/types";
import { useBackend } from "@/integrations/backend/BackendProvider";

export const useSessionHistory = () => {
  const { repository } = useBackend();

  const [sessions, setSessions] = useState<SessionRecord[]>(() =>
    repository.loadSessions(),
  );

  const addSession = (session: SessionRecord) => {
    setSessions((current) => {
      const next = [session, ...current].slice(0, 40);
      repository.saveSessions(next);
      return next;
    });
  };

  const clearSessions = () => {
    repository.saveSessions([]);
    setSessions([]);
  };

  return useMemo(
    () => ({
      sessions,
      addSession,
      clearSessions,
    }),
    [sessions],
  );
};
