"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { OnboardingHire } from "@/types/onboardingHire";

const REFERENCE_DATE = new Date("2025-06-01");

interface Nudge {
  id: string;
  message: string;
  daysOverdue: number;
}

function computeNudges(hires: OnboardingHire[]): Nudge[] {
  const nudges: Nudge[] = [];
  for (const hire of hires) {
    for (const task of hire.checklist) {
      if (task.completed) continue;
      const daysOverdue = Math.round(
        (REFERENCE_DATE.getTime() - new Date(task.dueDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysOverdue > 0) {
        nudges.push({
          id: `${hire.id}-${task.task}`,
          message: `${hire.employeeName}'s "${task.task}" is ${daysOverdue} day${daysOverdue === 1 ? "" : "s"} overdue — consider a quick check-in.`,
          daysOverdue,
        });
      }
    }
  }
  return nudges.sort((a, b) => b.daysOverdue - a.daysOverdue).slice(0, 5);
}

export function AiNudgesPanel({ hires }: { hires: OnboardingHire[] }) {
  const nudges = computeNudges(hires);

  if (nudges.length === 0) {
    return <p className="text-sm text-muted-foreground">No nudges right now — every hire is on track.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {nudges.map((nudge, i) => (
        <motion.div
          key={nudge.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
          className="flex items-start gap-2 rounded-md border border-violet-400/30 bg-gradient-to-r from-violet-500/10 to-navy-500/5 p-3"
        >
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
          <p className="text-sm text-foreground">{nudge.message}</p>
        </motion.div>
      ))}
    </div>
  );
}
