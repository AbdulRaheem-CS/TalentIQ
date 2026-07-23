"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedBlobs({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full blur-3xl",
          variant === "dark" ? "bg-violet-500/20" : "bg-violet-400/20"
        )}
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={cn(
          "absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full blur-3xl",
          variant === "dark" ? "bg-navy-400/20" : "bg-navy-300/25"
        )}
      />
      <motion.div
        animate={{ x: [0, 20, -30, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className={cn(
          "absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full blur-3xl",
          variant === "dark" ? "bg-violet-400/15" : "bg-violet-300/15"
        )}
      />
    </div>
  );
}
