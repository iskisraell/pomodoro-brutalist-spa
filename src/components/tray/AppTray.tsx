import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface TrayPanelDefinition {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  content: ReactNode;
}

interface AppTrayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activePanelId: string;
  onActivePanelChange: (panelId: string) => void;
  panels: TrayPanelDefinition[];
}

export const AppTray = ({
  open,
  onOpenChange,
  activePanelId,
  onActivePanelChange,
  panels,
}: AppTrayProps) => {
  const activePanel =
    panels.find((panel) => panel.id === activePanelId) ?? panels[0] ?? null;

  if (!activePanel) {
    return null;
  }

  const ActiveIcon = activePanel.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l-[3px] border-border bg-card p-0 sm:max-w-2xl"
      >
        <SheetHeader className="gap-2 border-b-[3px] border-border bg-muted/40 pr-12">
          <SheetTitle className="font-display text-2xl uppercase">
            Tray
          </SheetTitle>
          <SheetDescription>
            Context drawer for complex controls and long-form configuration.
          </SheetDescription>
        </SheetHeader>

        <div className="grid h-full min-h-0 gap-0 md:grid-cols-[220px_1fr]">
          <nav className="border-b-[3px] border-border bg-muted/25 p-3 md:border-r-[3px] md:border-b-0">
            <ul className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
              {panels.map((panel) => {
                const Icon = panel.icon;
                const isActive = panel.id === activePanel.id;

                return (
                  <li key={panel.id} className="min-w-0 md:w-full">
                    <button
                      type="button"
                      onClick={() => onActivePanelChange(panel.id)}
                      className={cn(
                        "group relative flex w-full items-center gap-2 overflow-hidden rounded-[0.9rem] border-[3px] border-transparent px-3 py-2 text-left text-sm font-semibold",
                        "transition-colors duration-200",
                        isActive
                          ? "border-border bg-background"
                          : "bg-transparent hover:border-border/60 hover:bg-background/60",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="tray-panel-pill"
                          className="absolute inset-0 rounded-[0.7rem] bg-background"
                          transition={{
                            type: "spring",
                            stiffness: 290,
                            damping: 24,
                          }}
                        />
                      ) : null}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="size-4" />
                        {panel.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex min-h-0 flex-col p-3 md:p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.section
                key={activePanel.id}
                initial={{ opacity: 0, x: 18, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="flex min-h-0 flex-1 flex-col gap-4"
              >
                <header className="rounded-[1.1rem] border-[3px] border-border bg-muted px-4 py-3">
                  <h3 className="flex items-center gap-2 font-display text-2xl uppercase leading-none">
                    <ActiveIcon className="size-5" />
                    {activePanel.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activePanel.description}
                  </p>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                  {activePanel.content}
                </div>
              </motion.section>
            </AnimatePresence>

            <SheetFooter className="border-t-[3px] border-border px-0 pt-3 pb-0">
              <SheetClose asChild>
                <Button className="ml-auto rounded-[0.9rem] border-[3px] border-border bg-primary text-primary-foreground">
                  Done
                  <ChevronRight className="size-4" />
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
