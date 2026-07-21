export type EmploymentType = "Full-time" | "Part-time" | "Contract";

export type EmployeeStatus = "Active" | "On Leave" | "Terminated";

export type EmployeeLevel =
  | "IC"
  | "Senior IC"
  | "Staff IC"
  | "Manager"
  | "Director"
  | "VP"
  | "Executive";

export interface PerformanceReview {
  period: string;
  rating: number;
  summary: string;
}

export interface Okr {
  objective: string;
  progress: number;
  keyResults: string[];
}

export type AttritionRiskLevel = "Low" | "Medium" | "High";

export interface AttritionRisk {
  score: number;
  level: AttritionRiskLevel;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  managerId: string | null;
  location: string;
  employmentType: EmploymentType;
  level: EmployeeLevel;
  startDate: string;
  status: EmployeeStatus;
  currentRating: number;
  performanceHistory: PerformanceReview[];
  okrs: Okr[];
}
