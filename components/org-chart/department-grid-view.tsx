import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Employee } from "@/types/employee";
import { initials } from "./org-tree-utils";

const LEVEL_ORDER = ["IC", "Senior IC", "Staff IC", "Manager", "Director", "VP", "Executive"];

function levelRank(level: string) {
  return LEVEL_ORDER.indexOf(level);
}

export interface DepartmentGridViewProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

export function DepartmentGridView({ employees, onSelect }: DepartmentGridViewProps) {
  const departments = Array.from(new Set(employees.map((e) => e.department))).sort();

  return (
    <div className="grid gap-lg md:grid-cols-2 xl:grid-cols-3">
      {departments.map((dept) => {
        const members = employees.filter((e) => e.department === dept);
        const head = members.reduce((top, e) => (levelRank(e.level) > levelRank(top.level) ? e : top), members[0]);

        return (
          <Card key={dept}>
            <CardHeader>
              <CardTitle>{dept}</CardTitle>
              <CardDescription>
                {members.length} member{members.length === 1 ? "" : "s"} · led by {head.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 pt-0">
              {members.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => onSelect(member)}
                  className="flex flex-col items-center gap-1 rounded-md p-2 text-center transition-colors hover:bg-secondary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials(member.name)}
                  </div>
                  <p className="w-full truncate text-xs font-medium text-foreground">{member.name}</p>
                  <p className="w-full truncate text-[11px] text-muted-foreground">{member.title}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
