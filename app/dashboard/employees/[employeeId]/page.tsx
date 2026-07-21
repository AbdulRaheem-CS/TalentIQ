"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AttritionBadge } from "@/components/employees/attrition-badge";
import { ManagerFeedbackLog } from "@/components/employees/manager-feedback-log";
import { OkrList } from "@/components/employees/okr-list";
import { PerformanceLineChart } from "@/components/employees/performance-line-chart";
import { useAsync } from "@/lib/hooks/use-async";
import { getEmployees } from "@/lib/api";
import { computeAttritionRisk } from "@/lib/attrition";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

function yearsOfTenure(startDate: string) {
  const years = (new Date("2025-06-01").getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return years < 1 ? "< 1 year" : `${years.toFixed(1)} years`;
}

export default function EmployeeProfilePage() {
  const params = useParams<{ employeeId: string }>();
  const { data: employees, isLoading } = useAsync(getEmployees);

  const employee = employees?.find((e) => e.id === params.employeeId);
  const manager = employees?.find((e) => e.id === employee?.managerId);
  const directReports = employees?.filter((e) => e.managerId === employee?.id) ?? [];
  const risk = employee ? computeAttritionRisk(employee) : null;

  return (
    <div>
      <Link
        href="/dashboard/employees"
        className="mb-md inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Employees
      </Link>

      {isLoading || !employee ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      ) : (
        <>
          <div className="mb-lg flex flex-wrap items-center gap-md">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {initials(employee.name)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{employee.name}</h1>
                {risk && <AttritionBadge risk={risk} />}
              </div>
              <p className="text-sm text-muted-foreground">
                {employee.title} · {employee.department} · {employee.level}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-sm pt-lg">
                <Star className="h-4 w-4 shrink-0 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Current Rating</p>
                  <p className="text-sm font-semibold text-foreground">{employee.currentRating} / 5</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-sm pt-lg">
                <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Manager</p>
                  {manager ? (
                    <Link href={`/dashboard/employees/${manager.id}`} className="text-sm font-semibold text-primary hover:underline">
                      {manager.name}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-foreground">—</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-sm pt-lg">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-semibold text-foreground">{employee.location}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-sm pt-lg">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Tenure</p>
                  <p className="text-sm font-semibold text-foreground">{yearsOfTenure(employee.startDate)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-lg grid gap-lg lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <PerformanceLineChart data={employee.performanceHistory} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OKRs — Current Cycle</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <OkrList okrs={employee.okrs} />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-lg">
            <CardHeader>
              <CardTitle>Manager Feedback Log</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ManagerFeedbackLog reviews={employee.performanceHistory} managerName={manager?.name} />
            </CardContent>
          </Card>

          {directReports.length > 0 && (
            <Card className="mt-lg">
              <CardHeader>
                <CardTitle>Direct Reports ({directReports.length})</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 pt-0">
                {directReports.map((report) => (
                  <Link
                    key={report.id}
                    href={`/dashboard/employees/${report.id}`}
                    className="flex items-center justify-between gap-sm rounded-md px-2 py-2 transition-colors hover:bg-secondary"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{report.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{report.title}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-foreground">
                      {report.currentRating.toFixed(1)}
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
