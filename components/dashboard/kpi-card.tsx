"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/lib/hooks/use-count-up";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  format?: (value: number) => string;
  hint?: string;
  tone?: "default" | "success" | "danger";
  delay?: number;
}

const toneStyles: Record<NonNullable<KpiCardProps["tone"]>, string> = {
  default: "text-muted-foreground",
  success: "text-success",
  danger: "text-danger",
};

export function KpiCard({
  label,
  value,
  icon: Icon,
  format = (v) => Math.round(v).toString(),
  hint,
  tone = "default",
  delay = 0,
}: KpiCardProps) {
  const animated = useCountUp(value, { duration: 1.2, delay });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="h-full"
    >
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardContent className="flex items-start justify-between gap-md pt-lg">
          <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {format(animated)}
            </p>
            {hint && <p className={cn("mt-1 text-xs", toneStyles[tone])}>{hint}</p>}
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
