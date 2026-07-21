import type { Candidate, CandidateStage } from "@/types/candidate";
import { cn } from "@/lib/utils";
import { CandidateCard } from "./candidate-card";

export interface KanbanColumnProps {
  stage: CandidateStage;
  candidates: Candidate[];
  isDropTarget: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
  onOpenDetail: (candidate: Candidate) => void;
  onDrag: (candidate: Candidate, point: { x: number; y: number }) => void;
  onDragEnd: (candidate: Candidate, point: { x: number; y: number }) => void;
}

export function KanbanColumn({
  stage,
  candidates,
  isDropTarget,
  registerRef,
  onOpenDetail,
  onDrag,
  onDragEnd,
}: KanbanColumnProps) {
  return (
    <div
      ref={registerRef}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-lg border bg-secondary/30 transition-colors duration-150",
        isDropTarget ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border"
      )}
    >
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2.5">
        <span className="text-sm font-semibold text-foreground">{stage}</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {candidates.length}
        </span>
      </div>
      <div className="flex min-h-[140px] flex-1 flex-col gap-2 p-2">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onOpenDetail={onOpenDetail}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          />
        ))}
        {candidates.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border/60 py-8 text-xs text-muted-foreground">
            No candidates
          </div>
        )}
      </div>
    </div>
  );
}
