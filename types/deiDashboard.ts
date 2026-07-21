export interface PayEquityBand {
  level: string;
  ratioLow: number;
  ratioMid: number;
  ratioHigh: number;
}

export interface HiringFunnelDiversityStage {
  stage: string;
  diversePercentage: number;
}

export interface DeiGoal {
  metric: string;
  goal: number;
  actual: number;
}

export interface DeiDashboardData {
  payEquity: PayEquityBand[];
  hiringFunnel: HiringFunnelDiversityStage[];
  goals: DeiGoal[];
}
