import { motion } from "framer-motion";
import { History, Palette, Rocket, Settings, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

import { AppTray, type TrayPanelDefinition } from "@/components/tray/AppTray";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CycleTracker } from "@/features/pomodoro/components/CycleTracker";
import { HistoryPanel } from "@/features/pomodoro/components/HistoryPanel";
import { ModeTabs } from "@/features/pomodoro/components/ModeTabs";
import { SessionControls } from "@/features/pomodoro/components/SessionControls";
import { SettingsPanel } from "@/features/pomodoro/components/SettingsPanel";
import { ThemeAdjustmentsPanel } from "@/features/pomodoro/components/ThemeAdjustmentsPanel";
import { TimerFace } from "@/features/pomodoro/components/TimerFace";
import { usePomodoroSettings } from "@/features/pomodoro/hooks/usePomodoroSettings";
import { usePomodoroTimer } from "@/features/pomodoro/hooks/usePomodoroTimer";
import { useSessionHistory } from "@/features/pomodoro/hooks/useSessionHistory";
import type { SessionRecord } from "@/features/pomodoro/model/types";

const panelIds = {
  ritual: "ritual",
  trail: "trail",
  theme: "theme",
} as const;

type PanelId = (typeof panelIds)[keyof typeof panelIds];

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
  const [trayOpen, setTrayOpen] = useState(false);
  const [activePanelId, setActivePanelId] = useState<PanelId>(panelIds.ritual);

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

  const panels: TrayPanelDefinition[] = [
    {
      id: panelIds.ritual,
      label: "Ritual",
      title: "Ritual setup",
      description: "Timer lengths and automation behavior.",
      icon: SlidersHorizontal,
      content: (
        <SettingsPanel
          settings={settings}
          onSettingsChange={updateSettings}
          compact
        />
      ),
    },
    {
      id: panelIds.trail,
      label: "Trail",
      title: "Session trail",
      description: "Review and clear completed rounds.",
      icon: History,
      content: (
        <HistoryPanel sessions={sessions} onClear={clearSessions} compact />
      ),
    },
    {
      id: panelIds.theme,
      label: "Theme",
      title: "Theme adjustments",
      description: "Prepared modular panel for future customization.",
      icon: Palette,
      content: <ThemeAdjustmentsPanel />,
    },
  ];

  return (
    <TooltipProvider>
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-5 px-4 py-6 md:px-8">
        <motion.main
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="space-y-4"
        >
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex items-center justify-between"
          >
            <ModeTabs
              activeMode={state.mode}
              status={state.status}
              onChange={switchMode}
            />

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-[0.7rem] border-[3px] border-border bg-background transition-transform hover:scale-105 active:scale-95"
              onClick={() => setTrayOpen(true)}
            >
              <Settings className="size-5" />
            </Button>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
          >
            <TimerFace state={state} progress={progress} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
          >
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
          </motion.div>
        </motion.main>

        <AppTray
          open={trayOpen}
          onOpenChange={setTrayOpen}
          activePanelId={activePanelId}
          onActivePanelChange={(panelId) =>
            setActivePanelId(panelId as PanelId)
          }
          panels={panels}
        />
      </div>

      <Toaster richColors closeButton />
    </TooltipProvider>
  );
};
