import type { CandidateStage } from "@/types/candidate";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

const stageVariant: Record<CandidateStage, BadgeVariant> = {
  Applied: "secondary",
  Screening: "info",
  Interview: "warning",
  Offer: "default",
  Hired: "success",
  Rejected: "danger",
};

export function StageBadge({ stage }: { stage: CandidateStage }) {
  return <Badge variant={stageVariant[stage]}>{stage}</Badge>;
}
