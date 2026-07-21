import { Sparkles } from "lucide-react";
import type { AttritionRisk } from "@/types/employee";
import { cn } from "@/lib/utils";

export function AttritionBadge({ risk, className }: { risk: AttritionRisk; className?: string }) {
  if (risk.level === "Low") return null;

  return (
    <span
      title={`AI-flagged attrition risk score: ${risk.score}/100`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-gradient-to-r px-2.5 py-0.5 text-xs font-medium",
        risk.level === "High"
          ? "from-violet-500/20 to-navy-500/15 text-violet-700 dark:text-violet-300"
          : "from-violet-500/10 to-navy-500/5 text-violet-600 dark:text-violet-300",
        className
      )}
    >
      <Sparkles className="h-3 w-3" />
      {risk.level} Attrition Risk
    </span>
  );
}
