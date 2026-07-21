"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronRight, Layers, MapPin, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { JobStatusBadge } from "@/components/recruitment/job-status-badge";
import { useAsync } from "@/lib/hooks/use-async";
import { getCandidates, getJobs } from "@/lib/api";
import type { JobStatus } from "@/types/job";
import { cn } from "@/lib/utils";

const FILTERS: Array<JobStatus | "All"> = ["All", "Open", "On Hold", "Filled", "Closed"];

export default function RecruitmentPage() {
  const { data: jobs, isLoading: loadingJobs } = useAsync(getJobs);
  const { data: candidates, isLoading: loadingCandidates } = useAsync(getCandidates);
  const [filter, setFilter] = useState<JobStatus | "All">("All");

  const isLoading = loadingJobs || loadingCandidates;

  const openRoles = jobs?.filter((j) => j.status === "Open") ?? [];
  const totalOpenings = openRoles.reduce((s, j) => s + j.openings, 0);
  const activeCandidates =
    candidates?.filter((c) => c.stage !== "Hired" && c.stage !== "Rejected") ?? [];
  const avgMatch = candidates?.length
    ? Math.round(candidates.reduce((s, c) => s + c.matchScore.overall, 0) / candidates.length)
    : 0;

  const candidateCountFor = (jobId: string) =>
    candidates?.filter((c) => c.jobId === jobId).length ?? 0;

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    if (filter === "All") return jobs;
    return jobs.filter((j) => j.status === filter);
  }, [jobs, filter]);

  return (
    <div>
      <PageHeader
        title="Recruitment"
        description="Track every open role and candidate moving through your pipeline."
      />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Open Roles" value={String(openRoles.length)} icon={Briefcase} />
            <StatCard label="Total Openings" value={String(totalOpenings)} icon={Layers} />
            <StatCard label="Active Candidates" value={String(activeCandidates.length)} icon={Users} />
            <StatCard label="Avg. Match Score" value={`${avgMatch}%`} icon={Target} tone="success" />
          </>
        )}
      </div>

      <div className="mt-lg flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-secondary"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-md flex flex-col gap-sm">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
          : filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
              >
                <Link href={`/dashboard/recruitment/${job.id}`}>
                  <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <CardContent className="flex items-center justify-between gap-md pt-lg">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-foreground">{job.title}</p>
                          <JobStatusBadge status={job.status} />
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                          <span>{job.department}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span>{job.level}</span>
                        </p>
                      </div>

                      <div className="hidden shrink-0 text-center sm:block">
                        <p className="text-lg font-semibold text-foreground">
                          {candidateCountFor(job.id)}
                        </p>
                        <p className="text-[11px] text-muted-foreground">candidates</p>
                      </div>

                      <div className="hidden shrink-0 text-center md:block">
                        <p className="text-lg font-semibold text-foreground">{job.openings}</p>
                        <p className="text-[11px] text-muted-foreground">openings</p>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
      </div>
    </div>
  );
}
