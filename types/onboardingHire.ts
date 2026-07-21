export interface OnboardingTask {
  task: string;
  completed: boolean;
  dueDate: string;
}

export type OnboardingStatus = "Not Started" | "In Progress" | "Completed";

export interface OnboardingHire {
  id: string;
  candidateId: string;
  employeeName: string;
  title: string;
  department: string;
  location: string;
  startDate: string;
  buddy: string;
  managerId: string;
  status: OnboardingStatus;
  progressPercentage: number;
  checklist: OnboardingTask[];
}

export interface ChecklistTemplate {
  department: string;
  tasks: string[];
}
