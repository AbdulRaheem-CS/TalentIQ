"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import type { Candidate } from "@/types/candidate";
import { AIMatchScore } from "./ai-match-score";

function eventPoint(event: MouseEvent | TouchEvent | PointerEvent) {
  if ("clientX" in event) return { x: event.clientX, y: event.clientY };
  const touch = event.touches[0] ?? event.changedTouches[0];
  return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
}

export interface CandidateCardProps {
  candidate: Candidate;
  onOpenDetail: (candidate: Candidate) => void;
  onDrag: (candidate: Candidate, point: { x: number; y: number }) => void;
  onDragEnd: (candidate: Candidate, point: { x: number; y: number }) => void;
}

export function CandidateCard({ candidate, onOpenDetail, onDrag, onDragEnd }: CandidateCardProps) {
  // Framer Motion's tap gesture can still fire right after a real drag ends —
  // this flag suppresses the resulting spurious "open detail" tap.
  const didDragRef = useRef(false);

  return (
    <motion.div
      layoutId={candidate.id}
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.05, rotate: -2, zIndex: 50, boxShadow: "var(--shadow-xl)" }}
      whileHover={{ y: -2 }}
      onDragStart={() => {
        didDragRef.current = true;
      }}
      onDrag={(event) => onDrag(candidate, eventPoint(event))}
      onDragEnd={(event) => {
        onDragEnd(candidate, eventPoint(event));
        setTimeout(() => {
          didDragRef.current = false;
        }, 150);
      }}
      onTap={() => {
        if (didDragRef.current) return;
        onOpenDetail(candidate);
      }}
      transition={{ layout: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }}
      className="relative touch-none cursor-grab rounded-md border border-border bg-card p-3 shadow-xs transition-shadow hover:shadow-sm active:cursor-grabbing"
    >
      <p className="truncate text-sm font-medium text-foreground">{candidate.name}</p>
      <p className="truncate text-xs text-muted-foreground">
        {candidate.currentTitle} · {candidate.currentCompany}
      </p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <AIMatchScore candidateId={candidate.id} matchScore={candidate.matchScore} size="sm" />
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {candidate.yearsOfExperience}y exp
        </span>
      </div>
    </motion.div>
  );
}
