import Link from "next/link";
import { ArrowRight, Mail, MapPin, Star, Users } from "lucide-react";
import { Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, ModalTitle } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { Employee } from "@/types/employee";
import { initials } from "./org-tree-utils";

export interface EmployeeMiniProfileModalProps {
  employee: Employee | null;
  manager?: Employee;
  directReportsCount: number;
  onClose: () => void;
}

export function EmployeeMiniProfileModal({
  employee,
  manager,
  directReportsCount,
  onClose,
}: EmployeeMiniProfileModalProps) {
  return (
    <Modal open={employee !== null} onClose={onClose} className="max-w-md">
      {employee && (
        <>
          <ModalHeader>
            <div className="flex items-center gap-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials(employee.name)}
              </div>
              <div>
                <ModalTitle>{employee.name}</ModalTitle>
                <p className="text-sm text-muted-foreground">
                  {employee.title} · {employee.department}
                </p>
              </div>
            </div>
            <ModalCloseButton onClose={onClose} />
          </ModalHeader>

          <ModalBody className="flex flex-col gap-sm">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              {employee.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Star className="h-4 w-4 shrink-0 text-success" />
              {employee.currentRating} / 5 current rating
            </div>
            {manager && (
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                Reports to {manager.name}
              </div>
            )}
            {directReportsCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {directReportsCount} direct report{directReportsCount === 1 ? "" : "s"}
              </p>
            )}
          </ModalBody>

          <ModalFooter className="justify-end">
            <Link href={`/dashboard/employees/${employee.id}`}>
              <Button size="sm">
                View Full Profile
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}
