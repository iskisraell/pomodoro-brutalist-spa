import { Clock3, Eraser, PartyPopper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODE_LABELS, MINUTE_IN_MS } from "@/features/pomodoro/model/constants";
import type { SessionRecord } from "@/features/pomodoro/model/types";

interface HistoryPanelProps {
  sessions: SessionRecord[];
  onClear: () => void;
}

const formatDuration = (plannedMs: number) =>
  `${Math.round(plannedMs / MINUTE_IN_MS)} min`;

export const HistoryPanel = ({ sessions, onClear }: HistoryPanelProps) => (
  <Card className="rounded-[0.8rem] border-[3px] border-border bg-card soft-bump">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between gap-2">
        <CardTitle className="flex items-center gap-2 font-display text-2xl uppercase">
          <Clock3 className="size-5" />
          Session trail
        </CardTitle>

        <Button
          variant="outline"
          className="h-9 rounded-[0.6rem] border-[3px] border-border px-3"
          onClick={onClear}
          disabled={sessions.length === 0}
        >
          <Eraser className="size-4" />
          Clear
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      {sessions.length === 0 ? (
        <p className="rounded-[1.2rem] border-[3px] border-dashed border-border bg-muted px-4 py-5 text-sm">
          No sessions yet. Start your first focus run.
        </p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex items-center justify-between gap-2 rounded-[0.8rem] border-[3px] border-border bg-background px-3 py-2"
            >
              <span className="text-sm font-semibold">
                {MODE_LABELS[session.mode]}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {formatDuration(session.plannedMs)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border-[2px] border-border bg-accent px-2 py-1 text-xs font-semibold">
                <PartyPopper className="size-3" />
                done
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);
