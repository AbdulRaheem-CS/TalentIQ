import type { PerformanceReview } from "@/types/employee";

export function ManagerFeedbackLog({
  reviews,
  managerName,
}: {
  reviews: PerformanceReview[];
  managerName?: string;
}) {
  if (reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No feedback recorded yet.</p>;
  }

  return (
    <div className="flex flex-col gap-sm">
      {[...reviews].reverse().map((review) => (
        <div key={review.period} className="rounded-md border border-border/60 p-md">
          <div className="flex items-center justify-between gap-sm">
            <p className="text-sm font-semibold text-foreground">{review.period}</p>
            <span className="text-sm font-medium text-foreground">{review.rating} / 5</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{review.summary}</p>
          {managerName && <p className="mt-2 text-xs text-muted-foreground">— {managerName}</p>}
        </div>
      ))}
    </div>
  );
}
