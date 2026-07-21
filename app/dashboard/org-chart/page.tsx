"use client";

import { useState } from "react";
import { LayoutGrid, Network as NetworkIcon, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, StatCardSkeleton } from "@/components/dashboard/stat-card";
import { DepartmentGridView } from "@/components/org-chart/department-grid-view";
import { EmployeeMiniProfileModal } from "@/components/org-chart/employee-mini-profile-modal";
import { OrgTreeView } from "@/components/org-chart/org-tree-view";
import { countNodes, maxDepth } from "@/components/org-chart/org-tree-utils";
import { useAsync } from "@/lib/hooks/use-async";
import { getEmployees, getOrgChart } from "@/lib/api";
import type { OrgNode } from "@/types/orgNode";
import type { Employee } from "@/types/employee";
import { cn } from "@/lib/utils";

type ViewMode = "tree" | "grid";

export default function OrgChartPage() {
  const { data: org, isLoading: loadingOrg } = useAsync(getOrgChart);
  const { data: employees, isLoading: loadingEmployees } = useAsync(getEmployees);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("tree");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const isLoading = loadingOrg || loadingEmployees;

  const totalNodes = org ? countNodes(org) : 0;
  const depth = org ? maxDepth(org) : 0;

  function selectById(id: string) {
    const employee = employees?.find((e) => e.id === id);
    if (employee) setSelectedEmployee(employee);
  }

  function handleTreeSelect(node: OrgNode) {
    selectById(node.id);
  }

  const manager = employees?.find((e) => e.id === selectedEmployee?.managerId);
  const directReportsCount = employees?.filter((e) => e.managerId === selectedEmployee?.id).length ?? 0;

  return (
    <div>
      <PageHeader
        title="Org Chart"
        description="Reporting lines across the company, starting from leadership."
      />

      <div className="grid grid-cols-2 gap-md lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <StatCard label="Total Employees" value={String(totalNodes)} icon={NetworkIcon} />
            <StatCard label="Direct Reports to CEO" value={String(org?.children.length ?? 0)} icon={NetworkIcon} />
            <StatCard label="Org Depth" value={`${depth} levels`} icon={LayoutGrid} />
          </>
        )}
      </div>

      <div className="mt-lg flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm">
          <Input
            icon={<Search />}
            placeholder="Search for a person..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={view !== "tree"}
          />
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-card p-1">
          <button
            onClick={() => setView("tree")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              view === "tree" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            <NetworkIcon className="h-3.5 w-3.5" />
            Org Chart
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Department Grid
          </button>
        </div>
      </div>

      <Card className="mt-md">
        <CardHeader>
          <CardTitle>{view === "tree" ? "Leadership Tree" : "Departments"}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading || !org || !employees ? (
            <div className="flex flex-col gap-sm">
              <Skeleton className="h-10 w-full max-w-sm" />
              <div className="ml-8 flex flex-col gap-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          ) : view === "tree" ? (
            <OrgTreeView root={org} searchQuery={search} onSelect={handleTreeSelect} />
          ) : (
            <DepartmentGridView employees={employees} onSelect={setSelectedEmployee} />
          )}
        </CardContent>
      </Card>

      <EmployeeMiniProfileModal
        employee={selectedEmployee}
        manager={manager}
        directReportsCount={directReportsCount}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
