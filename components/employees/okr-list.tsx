"use client";

import { motion } from "framer-motion";
import type { Okr } from "@/types/employee";

export function OkrList({ okrs }: { okrs: Okr[] }) {
  if (okrs.length === 0) {
    return <p className="text-sm text-muted-foreground">No OKRs set for this cycle yet.</p>;
  }

  return (
    <div className="flex flex-col gap-lg">
      {okrs.map((okr, i) => (
        <div key={okr.objective}>
          <div className="flex items-center justify-between gap-sm">
            <p className="text-sm font-medium text-foreground">{okr.objective}</p>
            <span className="shrink-0 text-sm font-semibold text-foreground">{okr.progress}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${okr.progress}%` }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
          <ul className="mt-2 flex flex-col gap-1">
            {okr.keyResults.map((kr) => (
              <li key={kr} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                {kr}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
