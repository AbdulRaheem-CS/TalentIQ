import {
  Briefcase,
  ClipboardCheck,
  HeartHandshake,
  Network,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  ai?: boolean;
}

export const features: FeatureItem[] = [
  {
    slug: "recruitment",
    icon: Briefcase,
    title: "AI-Powered Recruitment",
    description:
      "Score, rank, and move candidates through a pipeline built for high-volume enterprise hiring — with match scoring across skills, experience, and culture fit.",
    ai: true,
  },
  {
    slug: "performance-analytics",
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Track performance history, ratings, and trends across every team so managers and leadership always know where the org stands.",
  },
  {
    slug: "org-chart",
    icon: Network,
    title: "Living Org Chart",
    description:
      "Visualize reporting lines across the entire company, updated automatically as your team grows and changes.",
  },
  {
    slug: "dei-dashboard",
    icon: HeartHandshake,
    title: "DEI Dashboard",
    description:
      "Track representation and leadership diversity by department, with year-over-year trends to hold your org accountable.",
  },
  {
    slug: "onboarding",
    icon: ClipboardCheck,
    title: "Guided Onboarding",
    description:
      "Give every new hire a clear checklist, an assigned buddy, and full visibility into ramp progress from day one.",
  },
];
