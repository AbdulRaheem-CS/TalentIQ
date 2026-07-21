"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { StageStatus } from "./onboarding-stages";
import { cn } from "@/lib/utils";

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function WorkflowStepper({ statuses }: { statuses: StageStatus[] }) {
  return (
    <div className="flex items-start">
      {statuses.map((s, i) => (
        <Fragment key={s.stage}>
          {i > 0 && (
            <div className="mt-[18px] h-0.5 flex-1 bg-secondary">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: statuses[i - 1].status === "complete" ? 1 : 0 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="h-full bg-primary"
              />
            </div>
          )}
          <div className="flex w-20 shrink-0 flex-col items-center text-center sm:w-28">
            <div className="relative flex h-9 w-9 items-center justify-center">
              {s.status === "current" && (
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-primary/40"
                />
              )}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={cn(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  s.status === "complete" && "border-primary bg-primary text-primary-foreground",
                  s.status === "current" && "border-primary bg-primary/10 text-primary",
                  s.status === "upcoming" && "border-border bg-card text-muted-foreground"
                )}
              >
                {s.status === "complete" ? <Check className="h-4 w-4" /> : i + 1}
              </motion.div>
            </div>
            <p
              className={cn(
                "mt-2 text-xs font-medium leading-tight",
                s.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {s.stage}
            </p>
            {s.date && <p className="text-[11px] text-muted-foreground">{formatDate(s.date)}</p>}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
