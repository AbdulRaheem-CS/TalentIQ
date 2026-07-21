import { Badge, type BadgeVariant } from "@/components/ui/badge";
import type { WorkspaceMember, WorkspaceRole } from "@/types/settings";

const roleVariant: Record<WorkspaceRole, BadgeVariant> = {
  Admin: "default",
  Recruiter: "info",
  "Hiring Manager": "secondary",
  Viewer: "outline",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function TeamMembersList({ members }: { members: WorkspaceMember[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="px-2 py-2 font-medium">Member</th>
            <th className="px-2 py-2 font-medium">Role</th>
            <th className="px-2 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b border-border/60 last:border-0">
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-2 py-2.5">
                <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
              </td>
              <td className="px-2 py-2.5">
                <Badge variant={member.status === "Active" ? "success" : "warning"}>{member.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
