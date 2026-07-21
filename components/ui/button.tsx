"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "ai"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground border border-navy-950/10 shadow-sm hover:bg-navy-700 dark:hover:bg-navy-300",
  secondary:
    "bg-secondary text-secondary-foreground border border-border hover:bg-slate-200 dark:hover:bg-slate-700",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-secondary",
  ghost: "bg-transparent text-foreground hover:bg-secondary",
  // AI-only surface — the single place violet is allowed to lead a component.
  ai: "bg-gradient-to-br from-violet-600 to-navy-600 text-white border border-violet-400/20 shadow-glow-violet hover:from-violet-500 hover:to-navy-500",
  destructive: "bg-danger text-danger-foreground shadow-sm hover:brightness-95",
  link: "h-auto rounded-none border-0 bg-transparent p-0 text-primary shadow-none underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 rounded-md px-3 text-xs gap-1.5",
  md: "h-10 rounded-md px-4 text-sm gap-2",
  lg: "h-12 rounded-lg px-6 text-base gap-2",
  icon: "h-10 w-10 rounded-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", isLoading, disabled, children, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap font-medium tracking-tight transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
