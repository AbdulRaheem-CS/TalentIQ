"use client";

import { Building2, HeartHandshake, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { DistributionChart } from "@/components/dei/distribution-chart";
import { GenderRepresentationChart } from "@/components/dei/gender-representation-chart";
import { GoalsVsActualsChart } from "@/components/dei/goals-vs-actuals-chart";
import { HiringDiversityFunnelChart } from "@/components/dei/hiring-diversity-funnel-chart";
import { PayEquityChart } from "@/components/dei/pay-equity-chart";
import { useAsync } from "@/lib/hooks/use-async";
import { getDeiDashboard, getDiversityMetrics } from "@/lib/api";

const AGE_LABELS = ["20-29", "30-39", "40-49", "50+"];
const TENURE_LABELS = ["2-3 years", "3-4 years", "4-5 years", "5+ years"];

export default function DeiPage() {
  const { data: metrics, isLoading: loadingMetrics } = useAsync(getDiversityMetrics);
  const { data: dashboard, isLoading: loadingDashboard } = useAsync(getDeiDashboard);
  const isLoading = loadingMetrics || loadingDashboard;

  const avg = (key: "women" | "urm" | "leadership") => {
    if (!metrics?.length) return 0;
    const totalHeadcount = metrics.reduce((s, m) => s + m.headcount, 0);
    const total = metrics.reduce((sum, m) => {
      const value =
        key === "women"
          ? m.genderBreakdown.women
          : key === "urm"
            ? m.underrepresentedMinorityPercentage
            : m.leadershipDiversityPercentage;
      return sum + value * m.headcount;
    }, 0);
    return Math.round(total / totalHeadcount);
  };

  return (
    <div>
      <PageHeader
        title="DEI Analytics"
        description="Aggregate representation, pay equity, and hiring pipeline metrics, company-wide. No individual-level data is shown."
      />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Women Representation" value={`${avg("women")}%`} icon={Users} />
            <StatCard label="Underrepresented Minorities" value={`${avg("urm")}%`} icon={HeartHandshake} />
            <StatCard label="Leadership Diversity" value={`${avg("leadership")}%`} icon={TrendingUp} tone="success" />
            <StatCard label="Departments Tracked" value={String(metrics?.length ?? 0)} icon={Building2} />
          </>
        )}
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Gender Representation by Department</CardTitle>
            <CardDescription>Share of women, aggregated by department headcount.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !metrics ? <Skeleton className="h-64 w-full" /> : <GenderRepresentationChart data={metrics} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Range by Department</CardTitle>
            <CardDescription>Workforce age composition, aggregated — no individual ages recorded.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !metrics ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <DistributionChart
                rows={metrics.map((m) => ({ department: m.department, buckets: m.ageRangeBreakdown }))}
                bucketLabels={AGE_LABELS}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tenure by Department</CardTitle>
            <CardDescription>Years of service composition, derived from start dates.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !metrics ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <DistributionChart
                rows={metrics.map((m) => ({ department: m.department, buckets: m.tenureBreakdown }))}
                bucketLabels={TENURE_LABELS}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pay Equity by Level</CardTitle>
            <CardDescription>Women&apos;s median pay as a % of men&apos;s, shown as a range per level band.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !dashboard ? <Skeleton className="h-64 w-full" /> : <PayEquityChart data={dashboard.payEquity} />}
          </CardContent>
        </Card>
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Diversity Funnel</CardTitle>
            <CardDescription>Share of candidates from underrepresented groups at each pipeline stage.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !dashboard ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <HiringDiversityFunnelChart data={dashboard.hiringFunnel} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals vs Actuals</CardTitle>
            <CardDescription>Current standing against this year&apos;s DEI targets.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading || !dashboard ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              <GoalsVsActualsChart data={dashboard.goals} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
