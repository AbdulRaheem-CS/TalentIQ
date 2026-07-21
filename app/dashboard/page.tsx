"use client";

import { Briefcase, Smile, Timer, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { HeadcountTrendChart } from "@/components/dashboard/headcount-trend-chart";
import { HiringFunnelChart } from "@/components/dashboard/hiring-funnel-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCardSkeleton } from "@/components/dashboard/stat-card";
import { useAsync } from "@/lib/hooks/use-async";
import { getDashboardOverview } from "@/lib/api";

export default function OverviewPage() {
  const { data: overview, isLoading } = useAsync(getDashboardOverview);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Here's what's happening across recruiting, people, and onboarding today."
      />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {isLoading || !overview ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <KpiCard
              label="Open Positions"
              value={overview.openPositions}
              icon={Briefcase}
              hint={`${overview.totalOpenings} openings across all roles`}
              delay={0}
            />
            <KpiCard
              label="Active Candidates"
              value={overview.activeCandidates}
              icon={Users}
              hint={`${overview.totalCandidates} total in pipeline`}
              delay={0.08}
            />
            <KpiCard
              label="Avg. Time to Hire"
              value={overview.avgTimeToHireDays}
              icon={Timer}
              format={(v) => `${Math.round(v)}d`}
              tone="success"
              hint="From application to offer accepted"
              delay={0.16}
            />
            <KpiCard
              label="Satisfaction Score"
              value={overview.satisfactionScore}
              icon={Smile}
              format={(v) => `${v.toFixed(1)} / 5`}
              tone="success"
              hint={`+${overview.satisfactionTrend.toFixed(1)} vs last quarter`}
              delay={0.24}
            />
          </>
        )}
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !overview ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <HiringFunnelChart data={overview.hiringFunnel} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Headcount Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !overview ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <HeadcountTrendChart data={overview.headcountTrend} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading || !overview ? (
            <div className="flex flex-col gap-sm">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <ActivityFeed items={overview.recentActivity} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
