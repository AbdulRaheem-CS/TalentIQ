export interface CompanyProfile {
  name: string;
  website: string;
  industry: string;
  size: string;
  headquarters: string;
  logoInitials: string;
}

export type WorkspaceRole = "Admin" | "Recruiter" | "Hiring Manager" | "Viewer";
export type MemberStatus = "Active" | "Invited";

export interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  role: WorkspaceRole;
  status: MemberStatus;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid";
}

export interface BillingInfo {
  plan: string;
  pricePerMonth: number;
  billingCycle: "Monthly" | "Annual";
  seatsUsed: number;
  seatsTotal: number;
  renewalDate: string;
  features: string[];
  invoices: Invoice[];
}
