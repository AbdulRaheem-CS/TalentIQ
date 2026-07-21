import type { OnboardingHire } from "@/types/onboardingHire";

export const WORKFLOW_STAGES = [
  "Offer Signed",
  "IT Setup",
  "Orientation",
  "30-Day Check-in",
  "90-Day Review",
] as const;

export type WorkflowStageName = (typeof WORKFLOW_STAGES)[number];
export type StageState = "complete" | "current" | "upcoming";

export interface StageStatus {
  stage: WorkflowStageName;
  status: StageState;
  date?: string;
}

// Fixed reference standing in for "today" within the dataset's fictional
// timeline — see lib/attrition.ts for the same convention.
const REFERENCE_DATE = new Date("2025-06-01");

export function getHireStageStatuses(hire: OnboardingHire): StageStatus[] {
  const findTask = (fragment: string) => hire.checklist.find((t) => t.task.toLowerCase().includes(fragment));

  const itSetup = findTask("laptop");
  const orientation = findTask("orientation");
  const thirtyDay = findTask("30-day");

  const ninetyDayDate = new Date(hire.startDate);
  ninetyDayDate.setDate(ninetyDayDate.getDate() + 90);
  const ninetyDayDue = ninetyDayDate.toISOString().slice(0, 10);

  const completions = [true, itSetup?.completed ?? false, orientation?.completed ?? false, thirtyDay?.completed ?? false, REFERENCE_DATE >= ninetyDayDate];
  const dates = [hire.startDate, itSetup?.dueDate, orientation?.dueDate, thirtyDay?.dueDate, ninetyDayDue];

  let currentAssigned = false;
  return WORKFLOW_STAGES.map((stage, i) => {
    let status: StageState;
    if (completions[i]) {
      status = "complete";
    } else if (!currentAssigned) {
      status = "current";
      currentAssigned = true;
    } else {
      status = "upcoming";
    }
    return { stage, status, date: dates[i] };
  });
}
