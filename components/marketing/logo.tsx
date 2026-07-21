import { cn } from "@/lib/utils";

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("text-lg font-bold tracking-tight", className)}>
      <span className={dark ? "text-white" : "text-foreground"}>Talent</span>
      <span className={dark ? "text-navy-300" : "text-primary"}>IQ</span>
    </span>
  );
}
