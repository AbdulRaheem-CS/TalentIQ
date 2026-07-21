export interface GenderBreakdown {
  women: number;
  men: number;
  nonBinaryOrUndisclosed: number;
}

export interface DistributionBucket {
  label: string;
  percentage: number;
}

export interface DiversityMetric {
  department: string;
  headcount: number;
  genderBreakdown: GenderBreakdown;
  ageRangeBreakdown: DistributionBucket[];
  tenureBreakdown: DistributionBucket[];
  underrepresentedMinorityPercentage: number;
  leadershipDiversityPercentage: number;
  yoyChangePercentage: number;
}
