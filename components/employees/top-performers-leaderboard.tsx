"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Employee } from "@/types/employee";
import { cn } from "@/lib/utils";

export function TopPerformersLeaderboard({ employees }: { employees: Employee[] }) {
  const top = [...employees]
    .sort((a, b) => b.currentRating - a.currentRating || a.name.localeCompare(b.name))
    .slice(0, 6);

  return (
    <ul className="flex flex-col gap-1">
      {top.map((employee, i) => (
        <motion.li
          key={employee.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Link
            href={`/dashboard/employees/${employee.id}`}
            className="flex items-center gap-sm rounded-md px-2 py-2 transition-colors hover:bg-secondary"
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                i < 3 ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              )}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{employee.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {employee.title} · {employee.department}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-foreground">
              {employee.currentRating.toFixed(1)}
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
