import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200/70 dark:bg-slate-800/60",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:content-['']",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        "dark:before:via-white/10",
        className
      )}
      {...props}
    />
  );
}
