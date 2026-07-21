import candidatesData from "@/data/candidates.json";
import employeesData from "@/data/employees.json";
import jobsData from "@/data/jobs.json";
import orgChartData from "@/data/orgChart.json";
import diversityMetricsData from "@/data/diversityMetrics.json";
import onboardingData from "@/data/onboarding.json";
import checklistTemplatesData from "@/data/checklistTemplates.json";
import deiDashboardData from "@/data/deiDashboard.json";
import companyProfileData from "@/data/companyProfile.json";
import workspaceMembersData from "@/data/workspaceMembers.json";
import billingData from "@/data/billing.json";
import type { Candidate } from "@/types/candidate";
import type { Employee } from "@/types/employee";
import type { JobPosting } from "@/types/job";
import type { OrgNode } from "@/types/orgNode";
import type { DiversityMetric } from "@/types/diversityMetric";
import type { ChecklistTemplate, OnboardingHire } from "@/types/onboardingHire";
import type { CandidateStage } from "@/types/candidate";
import type { ActivityItem, DashboardOverview } from "@/types/dashboardOverview";
import type { DeiDashboardData } from "@/types/deiDashboard";
import type { BillingInfo, CompanyProfile, WorkspaceMember } from "@/types/settings";

const candidates = candidatesData as Candidate[];
const employees = employeesData as Employee[];
const jobs = jobsData as JobPosting[];
const orgChart = orgChartData as OrgNode;
const diversityMetrics = diversityMetricsData as DiversityMetric[];
const deiDashboard = deiDashboardData as DeiDashboardData;
const checklistTemplates = checklistTemplatesData as ChecklistTemplate[];
const companyProfile = companyProfileData as CompanyProfile;
const workspaceMembers = workspaceMembersData as WorkspaceMember[];
const billing = billingData as BillingInfo;
const onboardingHires = onboardingData as OnboardingHire[];

const MIN_LATENCY_MS = 300;
const MAX_LATENCY_MS = 800;

/**
 * Simulates network latency for a mock API call. Swap the body of each
 * function below for a real `fetch` once a backend exists — call sites
 * are unaffected since everything here already returns a Promise.
 */
function mockFetch<T>(data: T): Promise<T> {
  const latency = MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), latency);
  });
}

export function getCandidates(): Promise<Candidate[]> {
  return mockFetch(candidates);
}

export function getCandidateById(id: string): Promise<Candidate | undefined> {
  return mockFetch(candidates.find((c) => c.id === id));
}

export function getCandidatesByJob(jobId: string): Promise<Candidate[]> {
  return mockFetch(candidates.filter((c) => c.jobId === jobId));
}

export function getEmployees(): Promise<Employee[]> {
  return mockFetch(employees);
}

export function getEmployeeById(id: string): Promise<Employee | undefined> {
  return mockFetch(employees.find((e) => e.id === id));
}

export function getEmployeesByDepartment(department: string): Promise<Employee[]> {
  return mockFetch(employees.filter((e) => e.department === department));
}

export function getJobs(): Promise<JobPosting[]> {
  return mockFetch(jobs);
}

export function getJobById(id: string): Promise<JobPosting | undefined> {
  return mockFetch(jobs.find((j) => j.id === id));
}

export function getOrgChart(): Promise<OrgNode> {
  return mockFetch(orgChart);
}

export function getDiversityMetrics(): Promise<DiversityMetric[]> {
  return mockFetch(diversityMetrics);
}

export function getDeiDashboard(): Promise<DeiDashboardData> {
  return mockFetch(deiDashboard);
}

export function getOnboardingHires(): Promise<OnboardingHire[]> {
  return mockFetch(onboardingHires);
}

export function getOnboardingHireById(id: string): Promise<OnboardingHire | undefined> {
  return mockFetch(onboardingHires.find((h) => h.id === id));
}

export function getChecklistTemplates(): Promise<ChecklistTemplate[]> {
  return mockFetch(checklistTemplates);
}

export function getCompanyProfile(): Promise<CompanyProfile> {
  return mockFetch(companyProfile);
}

export function getWorkspaceMembers(): Promise<WorkspaceMember[]> {
  return mockFetch(workspaceMembers);
}

export function getBillingInfo(): Promise<BillingInfo> {
  return mockFetch(billing);
}

const FUNNEL_STAGE_ORDER: CandidateStage[] = [
  "Applied",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

function daysBetween(startISO: string, endISO: string): number {
  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function buildHeadcountTrend(): DashboardOverview["headcountTrend"] {
  const years = employees.map((e) => new Date(e.startDate).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const trend: DashboardOverview["headcountTrend"] = [];
  for (let year = minYear; year <= maxYear; year++) {
    const headcount = employees.filter((e) => new Date(e.startDate).getFullYear() <= year).length;
    trend.push({ label: String(year), headcount });
  }
  // Extend two flat points to represent the current year holding steady —
  // no new starters recorded past the most recent hire in the roster.
  const latestCount = trend[trend.length - 1]?.headcount ?? employees.length;
  trend.push({ label: String(maxYear + 1), headcount: latestCount });
  trend.push({ label: String(maxYear + 2), headcount: latestCount });
  return trend;
}

function buildRecentActivity(): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const candidate of candidates) {
    for (const note of candidate.notes) {
      items.push({
        id: `note-${candidate.id}-${note.date}`,
        type: "note",
        actor: note.author,
        description: `left a note on ${candidate.name}: "${note.note}"`,
        date: note.date,
      });
    }
  }

  for (const hire of onboardingHires) {
    const candidate = candidates.find((c) => c.id === hire.candidateId);
    if (!candidate) continue;
    const job = jobs.find((j) => j.id === candidate.jobId);
    const manager = employees.find((e) => e.id === hire.managerId);
    items.push({
      id: `hire-${hire.id}`,
      type: "hire",
      actor: manager?.name ?? "Hiring Manager",
      description: `marked ${candidate.name} as Hired for ${job?.title ?? "an open role"}`,
      date: candidate.notes[candidate.notes.length - 1]?.date ?? hire.startDate,
    });
    items.push({
      id: `onboarding-${hire.id}`,
      type: "onboarding",
      actor: hire.buddy,
      description: `is the onboarding buddy for ${hire.employeeName}`,
      date: hire.startDate,
    });
  }

  for (const job of jobs) {
    const manager = employees.find((e) => e.id === job.hiringManagerId);
    items.push({
      id: `job-${job.id}`,
      type: "job_posted",
      actor: manager?.name ?? "Hiring Team",
      description: `posted a new role — ${job.title}`,
      date: job.postedDate,
    });
  }

  return items.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10);
}

export function getDashboardOverview(): Promise<DashboardOverview> {
  const openJobs = jobs.filter((j) => j.status === "Open");
  const activeCandidates = candidates.filter((c) => c.stage !== "Hired" && c.stage !== "Rejected");
  const hiredCandidates = candidates.filter((c) => c.stage === "Hired");

  const timeToHireSamples = hiredCandidates
    .map((c) => {
      const hire = onboardingHires.find((h) => h.candidateId === c.id);
      if (!hire) return null;
      return daysBetween(c.appliedDate, hire.startDate);
    })
    .filter((n): n is number => n !== null);

  const avgTimeToHireDays = timeToHireSamples.length
    ? Math.round(timeToHireSamples.reduce((sum, n) => sum + n, 0) / timeToHireSamples.length)
    : 0;

  const hiringFunnel = FUNNEL_STAGE_ORDER.map((stage) => ({
    stage,
    count: candidates.filter((c) => c.stage === stage).length,
  }));

  const overview: DashboardOverview = {
    openPositions: openJobs.length,
    totalOpenings: openJobs.reduce((sum, j) => sum + j.openings, 0),
    activeCandidates: activeCandidates.length,
    totalCandidates: candidates.length,
    avgTimeToHireDays,
    satisfactionScore: 4.6,
    satisfactionTrend: 0.2,
    hiringFunnel,
    headcountTrend: buildHeadcountTrend(),
    recentActivity: buildRecentActivity(),
  };

  return mockFetch(overview);
}
