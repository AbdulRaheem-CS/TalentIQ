"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Briefcase, MessageSquare, PartyPopper, UserPlus } from "lucide-react";
import type { ActivityItem, ActivityType } from "@/types/dashboardOverview";
import { cn } from "@/lib/utils";

const iconFor: Record<ActivityType, LucideIcon> = {
  note: MessageSquare,
  hire: PartyPopper,
  job_posted: Briefcase,
  onboarding: UserPlus,
};

const colorFor: Record<ActivityType, string> = {
  note: "bg-info/10 text-info",
  hire: "bg-success/10 text-success",
  job_posted: "bg-primary/10 text-primary",
  onboarding: "bg-warning/10 text-warning",
};

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => {
        const Icon = iconFor[item.type];
        return (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-start gap-sm border-b border-border/60 py-3 last:border-0"
          >
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", colorFor[item.type])}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{item.actor}</span> {item.description}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(item.date)}</p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
