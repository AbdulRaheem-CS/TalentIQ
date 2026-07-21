"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Sparkles, TrendingUp, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { AiNudgesPanel } from "@/components/onboarding/ai-nudges-panel";
import { ChecklistTemplates } from "@/components/onboarding/checklist-templates";
import { getHireStageStatuses } from "@/components/onboarding/onboarding-stages";
import { WorkflowStepper } from "@/components/onboarding/workflow-stepper";
import { useAsync } from "@/lib/hooks/use-async";
import { getChecklistTemplates, getOnboardingHires } from "@/lib/api";
import type { OnboardingStatus } from "@/types/onboardingHire";
import { cn } from "@/lib/utils";

const statusVariant: Record<OnboardingStatus, "secondary" | "warning" | "success"> = {
  "Not Started": "secondary",
  "In Progress": "warning",
  Completed: "success",
};

export default function OnboardingPage() {
  const { data: hires, isLoading: loadingHires } = useAsync(getOnboardingHires);
  const { data: templates, isLoading: loadingTemplates } = useAsync(getChecklistTemplates);
  const [selectedHireId, setSelectedHireId] = useState<string | null>(null);

  useEffect(() => {
    if (hires && hires.length > 0 && !selectedHireId) {
      setSelectedHireId(hires[0].id);
    }
  }, [hires, selectedHireId]);

  const isLoading = loadingHires || loadingTemplates;

  const inProgress = hires?.filter((h) => h.status === "In Progress").length ?? 0;
  const completed = hires?.filter((h) => h.status === "Completed").length ?? 0;
  const avgProgress = hires?.length
    ? Math.round(hires.reduce((s, h) => s + h.progressPercentage, 0) / hires.length)
    : 0;

  const selectedHire = hires?.find((h) => h.id === selectedHireId) ?? hires?.[0];

  return (
    <div>
      <PageHeader title="Onboarding" description="Track every new hire's ramp from offer to full productivity." />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="New Hires" value={String(hires?.length ?? 0)} icon={UserPlus} />
            <StatCard label="In Progress" value={String(inProgress)} icon={ClipboardList} />
            <StatCard label="Completed" value={String(completed)} icon={CheckCircle2} tone="success" />
            <StatCard label="Avg. Progress" value={`${avgProgress}%`} icon={TrendingUp} />
          </>
        )}
      </div>

      <Card className="mt-lg">
        <CardHeader>
          <CardTitle>Workflow Overview</CardTitle>
          <CardDescription>
            {selectedHire ? `Showing ${selectedHire.employeeName}'s progress — select a hire below to see theirs.` : "The five stages every new hire moves through."}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          {isLoading || !selectedHire ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <div className="min-w-[560px] py-md">
              <WorkflowStepper statuses={getHireStageStatuses(selectedHire)} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Tracker</CardTitle>
            <CardDescription>Click a hire to see their stage above.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-sm pt-0">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              : hires?.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHireId(h.id)}
                    className={cn(
                      "rounded-md border px-3 py-2.5 text-left transition-colors",
                      selectedHireId === h.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border/60 hover:bg-secondary/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-sm">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{h.employeeName}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {h.title} · {h.department} · buddy {h.buddy}
                        </p>
                      </div>
                      <Badge variant={statusVariant[h.status]} className="shrink-0">
                        {h.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${h.progressPercentage}%` }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{h.progressPercentage}%</span>
                    </div>
                  </button>
                ))}
          </CardContent>
        </Card>

        <Card variant="ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-violet-500" />
              AI Nudges
            </CardTitle>
            <CardDescription>Surfaced automatically from overdue checklist items.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !hires ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <AiNudgesPanel hires={hires} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-lg">
        <CardHeader>
          <CardTitle>Checklist Templates</CardTitle>
          <CardDescription>The default onboarding checklist assigned to each department.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading || !templates ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ChecklistTemplates templates={templates} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
