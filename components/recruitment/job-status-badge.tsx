import type { JobStatus } from "@/types/job";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const statusVariant: Record<JobStatus, BadgeVariant> = {
  Open: "success",
  "On Hold": "warning",
  Filled: "info",
  Closed: "secondary",
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return <Badge variant={statusVariant[status]}>{status}</Badge>;
}
