import { useMemo } from "react";
import { Palette, Rocket, TimerReset } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CycleTracker } from "@/features/pomodoro/components/CycleTracker";
import { HistoryPanel } from "@/features/pomodoro/components/HistoryPanel";
import { ModeTabs } from "@/features/pomodoro/components/ModeTabs";
import { SessionControls } from "@/features/pomodoro/components/SessionControls";
import { SettingsPanel } from "@/features/pomodoro/components/SettingsPanel";
import { TimerFace } from "@/features/pomodoro/components/TimerFace";
import { usePomodoroSettings } from "@/features/pomodoro/hooks/usePomodoroSettings";
import { usePomodoroTimer } from "@/features/pomodoro/hooks/usePomodoroTimer";
import { useSessionHistory } from "@/features/pomodoro/hooks/useSessionHistory";
import type { SessionRecord } from "@/features/pomodoro/model/types";
import { backendFlags } from "@/integrations/backend/backend-flags";

const playSoftCelebration = () => {
  if (typeof window === "undefined" || !window.AudioContext) {
    return;
  }

  const context = new window.AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = 660;
  gain.gain.value = 0.0001;

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.onended = () => {
    void context.close();
  };

  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.09, context.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.45);
  oscillator.stop(context.currentTime + 0.48);
};

const handleSessionToast = (record: SessionRecord) => {
  toast.success(`Session done: ${record.mode}`, {
    description: "Your streak grows. Keep the rhythm.",
    icon: <Rocket className="size-4" />,
  });
};

export const AppShell = () => {
  const { settings, updateSettings } = usePomodoroSettings();
  const { sessions, addSession, clearSessions } = useSessionHistory();

  const onSessionSaved = (record: SessionRecord) => {
    addSession(record);
    handleSessionToast(record);

    if (settings.soundEnabled) {
      playSoftCelebration();
    }
  };

  const { state, progress, start, pause, reset, switchMode, goToNext } =
    usePomodoroTimer({
      settings,
      onSessionSaved,
    });

  const statusBadge = useMemo(
    () => (backendFlags.enabled ? "Convex-ready" : "Local mode"),
    [],
  );

  return (
    <TooltipProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center"
        >
          <div className="space-y-2">
            <p className="font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
              Pomodoro
              <br />
              Playground
            </p>
            <p className="max-w-xl text-sm font-medium text-muted-foreground md:text-base">
              Brutalist energy + playful color splash. Focus hard, rest sweet.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            <Badge className="rounded-full border-[3px] border-border bg-primary px-3 py-1 text-primary-foreground">
              <Palette className="size-3.5" />
              Fun brutalist
            </Badge>
            <Badge className="rounded-full border-[3px] border-border bg-secondary px-3 py-1 text-secondary-foreground">
              <TimerReset className="size-3.5" />
              {statusBadge}
            </Badge>
          </div>
        </motion.header>

        <main className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            <ModeTabs
              activeMode={state.mode}
              status={state.status}
              onChange={switchMode}
            />

            <TimerFace state={state} progress={progress} />

            <Card className="rounded-[1.7rem] border-[3px] border-border bg-card p-4 paper-shadow">
              <CardContent className="space-y-4 px-0">
                <SessionControls
                  status={state.status}
                  onStart={start}
                  onPause={pause}
                  onReset={reset}
                  onNext={goToNext}
                />
                <CycleTracker
                  completedFocusCount={state.completedFocusCount}
                  longBreakInterval={settings.longBreakInterval}
                />
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <SettingsPanel
              settings={settings}
              onSettingsChange={updateSettings}
            />
            <HistoryPanel sessions={sessions} onClear={clearSessions} />
          </section>
        </main>
      </div>

      <Toaster richColors closeButton />
    </TooltipProvider>
  );
};
