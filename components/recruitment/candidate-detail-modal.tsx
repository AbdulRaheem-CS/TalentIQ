"use client";

import { Calendar, FileText, Mail, MapPin, Phone } from "lucide-react";
import { Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { StageBadge } from "@/components/dashboard/stage-badge";
import { AIMatchScore } from "./ai-match-score";
import type { Candidate, CandidateStage } from "@/types/candidate";
import type { JobPosting } from "@/types/job";

const STAGES: CandidateStage[] = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];
const ROUND_LABELS = ["Recruiter Screen", "Technical Interview", "Final Debrief"];

function fakePhone(id: string) {
  const digits = id.replace(/\D/g, "").padStart(4, "0").slice(-4);
  return `(415) 555-${digits}`;
}

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export interface CandidateDetailModalProps {
  candidate: Candidate | null;
  job: JobPosting | undefined;
  onClose: () => void;
  onChangeStage: (candidateId: string, stage: CandidateStage) => void;
}

export function CandidateDetailModal({ candidate, job, onClose, onChangeStage }: CandidateDetailModalProps) {
  return (
    <Modal open={candidate !== null} onClose={onClose} className="max-w-2xl">
      {candidate && (
        <>
          <ModalHeader>
            <div className="flex items-center gap-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {candidate.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div>
                <ModalTitle>{candidate.name}</ModalTitle>
                <p className="text-sm text-muted-foreground">
                  {candidate.currentTitle} · {candidate.currentCompany}
                </p>
              </div>
            </div>
            <ModalCloseButton onClose={onClose} />
          </ModalHeader>

          <ModalBody className="flex max-h-[65vh] flex-col gap-lg overflow-y-auto">
            <div className="flex flex-wrap items-center gap-sm">
              <StageBadge stage={candidate.stage} />
              <AIMatchScore candidateId={candidate.id} matchScore={candidate.matchScore} size="md" />
              {job && (
                <span className="text-xs text-muted-foreground">
                  Applying for <span className="font-medium text-foreground">{job.title}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-sm rounded-lg border border-border bg-secondary/30 p-md sm:grid-cols-3">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                {fakePhone(candidate.id)}
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{candidate.location}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <FileText className="h-4 w-4" />
                Resume Preview
              </p>
              <div className="rounded-lg border border-border p-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">
                    {candidate.currentTitle}, {candidate.currentCompany}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {candidate.yearsOfExperience} years experience · sourced via {candidate.source}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{candidate.resumeSummary}</p>
                {job && job.requirements.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-foreground">Key requirements for this role</p>
                    <ul className="mt-1 list-inside list-disc text-xs text-muted-foreground">
                      {job.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4" />
                Interview Schedule
              </p>
              {candidate.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No interviews scheduled yet.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {candidate.notes.map((note, i) => (
                    <div
                      key={note.date + i}
                      className="flex items-center justify-between gap-sm rounded-md border border-border/60 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {ROUND_LABELS[i] ?? `Round ${i + 1}`}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">with {note.author}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{formatDate(note.date)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-foreground">Notes</p>
              {candidate.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notes yet.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {candidate.notes.map((note, i) => (
                    <div key={note.date + i} className="rounded-md bg-secondary/50 px-3 py-2">
                      <p className="text-sm text-foreground">{note.note}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {note.author} · {formatDate(note.date)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModalBody>

          <ModalFooter className="justify-between">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Move to stage
              <select
                value={candidate.stage}
                onChange={(e) => onChangeStage(candidate.id, e.target.value as CandidateStage)}
                className="h-8 rounded-md border border-input bg-card px-2 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </label>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}
