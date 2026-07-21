import type { EmploymentType } from "./employee";

export type JobStatus = "Open" | "On Hold" | "Filled" | "Closed";

export type JobLevel = "Entry" | "Mid" | "Senior" | "Staff" | "Manager" | "Director";

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  level: JobLevel;
  status: JobStatus;
  postedDate: string;
  hiringManagerId: string;
  openings: number;
  applicantCount: number;
  description: string;
  requirements: string[];
  salaryRange: SalaryRange;
}
