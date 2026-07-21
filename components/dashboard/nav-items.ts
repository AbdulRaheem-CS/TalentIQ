import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  ClipboardCheck,
  HeartHandshake,
  LayoutDashboard,
  Network,
  Users,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  ai?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Recruitment", href: "/dashboard/recruitment", icon: Briefcase, ai: true },
  { label: "Employees", href: "/dashboard/employees", icon: Users },
  { label: "Org Chart", href: "/dashboard/org-chart", icon: Network },
  { label: "DEI Analytics", href: "/dashboard/dei", icon: HeartHandshake },
  { label: "Onboarding", href: "/dashboard/onboarding", icon: ClipboardCheck },
];
