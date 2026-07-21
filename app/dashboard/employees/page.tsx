"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Search, Star, UserCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { AttritionBadge } from "@/components/employees/attrition-badge";
import { PerformanceDistributionChart, type RatingBucket } from "@/components/employees/performance-distribution-chart";
import { TopPerformersLeaderboard } from "@/components/employees/top-performers-leaderboard";
import { useAsync } from "@/lib/hooks/use-async";
import { getEmployees } from "@/lib/api";
import { computeAttritionRisk } from "@/lib/attrition";
import { cn } from "@/lib/utils";

export default function EmployeesPage() {
  const { data: employees, isLoading } = useAsync(getEmployees);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<string>("All");

  const departments = employees
    ? Array.from(new Set(employees.map((e) => e.department))).sort()
    : [];
  const avgRating = employees?.length
    ? (employees.reduce((sum, e) => sum + e.currentRating, 0) / employees.length).toFixed(1)
    : "—";
  const activeCount = employees?.filter((e) => e.status === "Active").length ?? 0;

  const distribution: RatingBucket[] = useMemo(() => {
    if (!employees) return [];
    return [1, 2, 3, 4, 5].map((rating) => ({
      rating,
      count: employees.filter((e) => Math.round(e.currentRating) === rating).length,
    }));
  }, [employees]);

  const atRisk = useMemo(() => {
    if (!employees) return [];
    return employees
      .map((e) => ({ employee: e, risk: computeAttritionRisk(e) }))
      .filter((x) => x.risk.level !== "Low")
      .sort((a, b) => b.risk.score - a.risk.score);
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (!employees) return [];
    return employees.filter((e) => {
      const matchesDept = department === "All" || e.department === department;
      const matchesSearch =
        search.trim() === "" ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.title.toLowerCase().includes(search.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [employees, department, search]);

  return (
    <div>
      <PageHeader title="Employees" description="Headcount and performance across every team." />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Headcount" value={String(employees?.length ?? 0)} icon={Users} />
            <StatCard label="Departments" value={String(departments.length)} icon={Building2} />
            <StatCard label="Avg. Rating" value={`${avgRating} / 5`} icon={Star} tone="success" />
            <StatCard
              label="Active"
              value={`${activeCount} / ${employees?.length ?? 0}`}
              icon={UserCheck}
            />
          </>
        )}
      </div>

      <div className="mt-lg grid gap-lg lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? <Skeleton className="h-56 w-full" /> : <PerformanceDistributionChart data={distribution} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <TopPerformersLeaderboard employees={employees ?? []} />
            )}
          </CardContent>
        </Card>
      </div>

      {!isLoading && atRisk.length > 0 && (
        <Card className="mt-lg" variant="ai">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Attrition Risk Watchlist</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-0">
            {atRisk.slice(0, 6).map(({ employee, risk }) => (
              <Link
                key={employee.id}
                href={`/dashboard/employees/${employee.id}`}
                className="flex items-center justify-between gap-sm rounded-md px-2 py-2 transition-colors hover:bg-secondary"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{employee.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {employee.title} · {employee.department}
                  </p>
                </div>
                <AttritionBadge risk={risk} className="shrink-0" />
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <Input
            icon={<Search />}
            placeholder="Search by name or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", ...departments].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartment(dept)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                department === dept
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <Card className="mt-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/60">
                      <td className="px-4 py-3" colSpan={6}>
                        <Skeleton className="h-6 w-full" />
                      </td>
                    </tr>
                  ))
                : filteredEmployees.map((employee) => {
                    const risk = computeAttritionRisk(employee);
                    return (
                      <tr key={employee.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                        <td className="px-4 py-3">
                          <Link
                            href={`/dashboard/employees/${employee.id}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            {employee.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{employee.department}</td>
                        <td className="px-4 py-3 text-muted-foreground">{employee.title}</td>
                        <td className="px-4 py-3 text-muted-foreground">{employee.level}</td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {employee.currentRating.toFixed(1)}
                        </td>
                        <td className="px-4 py-3">
                          <AttritionBadge risk={risk} />
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {!isLoading && filteredEmployees.length === 0 && (
            <p className="p-lg text-center text-sm text-muted-foreground">
              No employees match your search.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
