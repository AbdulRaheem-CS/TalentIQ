"use client";

import { useRef, useState } from "react";
import type { Candidate, CandidateStage } from "@/types/candidate";
import { KanbanColumn } from "./kanban-column";

const STAGES: CandidateStage[] = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];

export interface KanbanBoardProps {
  candidates: Candidate[];
  onCandidatesChange: (candidates: Candidate[]) => void;
  onOpenDetail: (candidate: Candidate) => void;
}

export function KanbanBoard({ candidates, onCandidatesChange, onOpenDetail }: KanbanBoardProps) {
  const columnRefs = useRef<Partial<Record<CandidateStage, HTMLDivElement | null>>>({});
  const [dropTarget, setDropTarget] = useState<CandidateStage | null>(null);

  function findColumnAtPoint(point: { x: number; y: number }): CandidateStage | null {
    for (const stage of STAGES) {
      const el = columnRefs.current[stage];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
        return stage;
      }
    }
    return null;
  }

  function handleDrag(_candidate: Candidate, point: { x: number; y: number }) {
    setDropTarget(findColumnAtPoint(point));
  }

  function handleDragEnd(candidate: Candidate, point: { x: number; y: number }) {
    const target = findColumnAtPoint(point);
    setDropTarget(null);
    if (target && target !== candidate.stage) {
      onCandidatesChange(
        candidates.map((c) => (c.id === candidate.id ? { ...c, stage: target } : c))
      );
    }
  }

  return (
    <div className="flex gap-md overflow-x-auto pb-md">
      {STAGES.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          candidates={candidates.filter((c) => c.stage === stage)}
          isDropTarget={dropTarget === stage}
          registerRef={(el) => {
            columnRefs.current[stage] = el;
          }}
          onOpenDetail={onOpenDetail}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
