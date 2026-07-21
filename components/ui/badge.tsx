import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "ai"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-secondary text-secondary-foreground border border-border",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
  danger: "bg-danger/10 text-danger border border-danger/20",
  info: "bg-info/10 text-info border border-info/20",
  // AI-only — the only badge variant permitted to use the violet accent.
  ai: "bg-gradient-to-r from-violet-500/15 to-navy-500/10 text-violet-700 dark:text-violet-300 border border-violet-400/30",
  outline: "bg-transparent text-foreground border border-border",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {variant === "ai" && <Sparkles className="h-3 w-3" />}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";
