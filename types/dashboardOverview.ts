import type { CandidateStage } from "./candidate";

export interface HiringFunnelStage {
  stage: CandidateStage;
  count: number;
}

export interface HeadcountTrendPoint {
  label: string;
  headcount: number;
}

export type ActivityType = "note" | "hire" | "job_posted" | "onboarding";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  actor: string;
  description: string;
  date: string;
}

export interface DashboardOverview {
  openPositions: number;
  totalOpenings: number;
  activeCandidates: number;
  totalCandidates: number;
  avgTimeToHireDays: number;
  satisfactionScore: number;
  satisfactionTrend: number;
  hiringFunnel: HiringFunnelStage[];
  headcountTrend: HeadcountTrendPoint[];
  recentActivity: ActivityItem[];
}
