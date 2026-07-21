"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { JobStatusBadge } from "@/components/recruitment/job-status-badge";
import { KanbanBoard } from "@/components/recruitment/kanban-board";
import { CandidateDetailModal } from "@/components/recruitment/candidate-detail-modal";
import { useAsync } from "@/lib/hooks/use-async";
import { getCandidatesByJob, getJobById } from "@/lib/api";
import type { Candidate, CandidateStage } from "@/types/candidate";

export default function JobKanbanPage() {
  const params = useParams<{ jobId: string }>();
  const jobId = params.jobId;

  const { data: job, isLoading: loadingJob } = useAsync(() => getJobById(jobId), [jobId]);
  const { data: fetchedCandidates, isLoading: loadingCandidates } = useAsync(
    () => getCandidatesByJob(jobId),
    [jobId]
  );

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    if (fetchedCandidates) setCandidates(fetchedCandidates);
  }, [fetchedCandidates]);

  const isLoading = loadingJob || loadingCandidates;

  function handleChangeStage(candidateId: string, stage: CandidateStage) {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, stage } : c)));
    setSelectedCandidate((prev) => (prev && prev.id === candidateId ? { ...prev, stage } : prev));
  }

  return (
    <div>
      <Link
        href="/dashboard/recruitment"
        className="mb-md inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Recruitment
      </Link>

      {isLoading || !job ? (
        <div className="mb-lg flex flex-col gap-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      ) : (
        <div className="mb-lg">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{job.title}</h1>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{job.department}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span>{job.level}</span>
            <span>{job.openings} opening{job.openings === 1 ? "" : "s"}</span>
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="flex gap-md overflow-x-auto pb-md">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex w-72 shrink-0 flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <KanbanBoard
          candidates={candidates}
          onCandidatesChange={setCandidates}
          onOpenDetail={setSelectedCandidate}
        />
      )}

      <CandidateDetailModal
        candidate={selectedCandidate}
        job={job ?? undefined}
        onClose={() => setSelectedCandidate(null)}
        onChangeStage={handleChangeStage}
      />
    </div>
  );
}
