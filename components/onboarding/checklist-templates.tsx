"use client";

import { useState } from "react";
import { CheckSquare } from "lucide-react";
import type { ChecklistTemplate } from "@/types/onboardingHire";
import { cn } from "@/lib/utils";

export function ChecklistTemplates({ templates }: { templates: ChecklistTemplate[] }) {
  const [selected, setSelected] = useState(templates[0]?.department ?? "");
  const active = templates.find((t) => t.department === selected);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.department}
            type="button"
            onClick={() => setSelected(t.department)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              selected === t.department
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            {t.department}
          </button>
        ))}
      </div>
      {active && (
        <ul className="mt-md flex flex-col gap-2">
          {active.tasks.map((task, i) => (
            <li
              key={task}
              className="flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm text-foreground"
            >
              <CheckSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1">{task}</span>
              <span className="shrink-0 text-xs text-muted-foreground">Step {i + 1}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
