import { Paintbrush, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const placeholderControls = [
  {
    id: "theme-dark",
    label: "Dark mode",
    hint: "Toggle app palette",
  },
  {
    id: "theme-motion",
    label: "Motion boost",
    hint: "Change spring intensity",
  },
  {
    id: "theme-shape",
    label: "Shape personality",
    hint: "Soft vs sharp corners",
  },
] as const;

export const ThemeAdjustmentsPanel = () => (
  <Card className="rounded-[1.5rem] border-[3px] border-border bg-card soft-bump">
    <CardContent className="space-y-4 pt-6">
      <p className="rounded-[1rem] border-[3px] border-dashed border-border bg-muted px-3 py-2 text-sm">
        Theme adjustments are prepared as a modular section for the next update.
      </p>

      <ul className="space-y-2">
        {placeholderControls.map((control) => (
          <li
            key={control.id}
            className="flex items-center justify-between rounded-[0.8rem] border-[3px] border-border bg-background px-3 py-2"
          >
            <div>
              <Label htmlFor={control.id} className="font-semibold">
                {control.label}
              </Label>
              <p className="text-xs text-muted-foreground">{control.hint}</p>
            </div>
            <Switch id={control.id} disabled checked={false} />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 rounded-[1.1rem] border-[3px] border-border bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
        <Paintbrush className="size-4" />
        Future panel ready
        <Sparkles className="ml-auto size-4" />
      </div>
    </CardContent>
  </Card>
);
