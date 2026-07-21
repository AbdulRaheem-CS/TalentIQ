export type CandidateStage =
  | "Applied"
  | "Screening"
  | "Interview"
  | "Offer"
  | "Hired"
  | "Rejected";

export interface MatchScore {
  overall: number;
  skills: number;
  experience: number;
  cultureFit: number;
}

export interface CandidateNote {
  author: string;
  date: string;
  note: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  jobId: string;
  stage: CandidateStage;
  appliedDate: string;
  location: string;
  currentTitle: string;
  currentCompany: string;
  yearsOfExperience: number;
  source: string;
  matchScore: MatchScore;
  resumeSummary: string;
  notes: CandidateNote[];
}
