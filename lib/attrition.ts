import type { AttritionRisk, Employee } from "@/types/employee";

// Fixed reference point standing in for "today" within the dataset's fictional
// timeline (job postings and reviews run through mid-2025) — using the real
// system clock would make tenure calculations drift as time passes.
const REFERENCE_DATE = new Date("2025-06-01");

function yearsSince(dateISO: string): number {
  const ms = REFERENCE_DATE.getTime() - new Date(dateISO).getTime();
  return ms / (1000 * 60 * 60 * 24 * 365.25);
}

const STAGNATION_LEVELS = new Set(["IC", "Senior IC"]);

export function computeAttritionRisk(employee: Employee): AttritionRisk {
  const reviews = employee.performanceHistory;
  const trend = reviews.length >= 2 ? reviews[reviews.length - 1].rating - reviews[0].rating : 0;
  const tenure = yearsSince(employee.startDate);

  let score = 25;
  if (trend < 0) score += 30;
  if (employee.currentRating <= 3) score += 15;
  if (employee.currentRating >= 5 && tenure >= 3 && STAGNATION_LEVELS.has(employee.level)) score += 25;
  if (tenure >= 4 && employee.level === "IC") score += 10;
  score = Math.max(5, Math.min(95, score));

  const level: AttritionRisk["level"] = score >= 60 ? "High" : score >= 35 ? "Medium" : "Low";
  return { score, level };
}
