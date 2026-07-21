"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const hiresTrend = [
  { month: "Jan", hires: 4 },
  { month: "Feb", hires: 6 },
  { month: "Mar", hires: 5 },
  { month: "Apr", hires: 8 },
  { month: "May", hires: 11 },
  { month: "Jun", hires: 14 },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-navy-50 to-transparent dark:from-navy-950/40"
      />
      <div className="mx-auto grid max-w-7xl gap-2xl px-lg py-3xl lg:grid-cols-2 lg:items-center lg:py-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-lg"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="ai">
              AI-Powered Talent Intelligence
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            The operating system for enterprise talent teams
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-balance text-lg text-muted-foreground"
          >
            TalentIQ unifies recruiting, performance, org planning, and DEI
            analytics into one platform — so your HR team spends less time
            switching tools and more time making decisions that matter.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-sm">
            <Link href="/login">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </a>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs text-muted-foreground">
            No credit card required · Full demo environment · Setup in minutes
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative"
        >
          <Card variant="elevated" className="relative overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border/60 px-lg py-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/40" />
              <span className="ml-2 text-xs font-medium text-muted-foreground">
                TalentIQ — Recruiting Overview
              </span>
            </div>

            <div className="grid grid-cols-3 gap-sm p-lg pb-md">
              <div className="rounded-md bg-secondary/60 p-sm">
                <p className="text-xs text-muted-foreground">Open Roles</p>
                <p className="text-xl font-semibold text-foreground">10</p>
              </div>
              <div className="rounded-md bg-secondary/60 p-sm">
                <p className="text-xs text-muted-foreground">Candidates</p>
                <p className="text-xl font-semibold text-foreground">28</p>
              </div>
              <div className="rounded-md bg-secondary/60 p-sm">
                <p className="text-xs text-muted-foreground">Avg. Time to Hire</p>
                <p className="text-xl font-semibold text-foreground">24d</p>
              </div>
            </div>

            <div className="h-32 px-lg pb-lg">
              <div className="mb-1 flex items-center gap-1 text-xs font-medium text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                Hires trending up 18% this quarter
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hiresTrend} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="heroHires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--navy-500))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--navy-500))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="hires"
                    stroke="hsl(var(--navy-600))"
                    strokeWidth={2}
                    fill="url(#heroHires)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.9 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute -right-4 -top-6 hidden sm:block"
          >
            <Card variant="ai" className="w-48 px-md py-sm">
              <div className="flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-300">
                <Sparkles className="h-3.5 w-3.5" />
                AI Match Score
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">Jenna Park — 94%</p>
              <p className="text-xs text-muted-foreground">Senior Software Engineer</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.05 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
            className="absolute -bottom-6 -left-4 hidden sm:block"
          >
            <Card variant="elevated" className="w-44 px-md py-sm">
              <p className="text-xs text-muted-foreground">Time to Hire</p>
              <p className="text-sm font-semibold text-success">↓ 18% this quarter</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
