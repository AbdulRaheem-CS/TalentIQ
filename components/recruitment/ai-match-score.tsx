"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import type { MatchScore } from "@/types/candidate";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "talentiq_analyzed_candidates";

function hasAnalyzed(candidateId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    return ids.includes(candidateId);
  } catch {
    return false;
  }
}

function markAnalyzed(candidateId: string) {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (!ids.includes(candidateId)) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, candidateId]));
    }
  } catch {
    // sessionStorage unavailable — analysis simply replays each time, which is harmless.
  }
}

interface ScoreRowProps {
  label: string;
  value: number;
}

function ScoreRow({ label, value }: ScoreRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-navy-500"
        />
      </div>
    </div>
  );
}

export interface AIMatchScoreProps {
  candidateId: string;
  matchScore: MatchScore;
  size?: "sm" | "md";
}

export function AIMatchScore({ candidateId, matchScore, size = "sm" }: AIMatchScoreProps) {
  const [open, setOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setOpen(false), open);

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (hasAnalyzed(candidateId)) {
      setRevealed(true);
      setAnalyzing(false);
      return;
    }
    setRevealed(false);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setRevealed(true);
      markAnalyzed(candidateId);
    }, 600);
  }

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-gradient-to-r from-violet-500/15 to-navy-500/10 font-medium text-violet-700 transition-shadow hover:shadow-glow-violet dark:text-violet-300",
          size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
        )}
      >
        <Sparkles className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
        {matchScore.overall}%
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-violet-400/30 bg-card p-md shadow-glow-violet"
          >
            {analyzing ? (
              <div className="flex items-center gap-2 py-2 text-xs font-medium text-violet-600 dark:text-violet-300">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Analyzing candidate...
              </div>
            ) : revealed ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Match Breakdown
                </div>
                <ScoreRow label="Skills Match" value={matchScore.skills} />
                <ScoreRow label="Experience Fit" value={matchScore.experience} />
                <ScoreRow label="Culture Fit" value={matchScore.cultureFit} />
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
