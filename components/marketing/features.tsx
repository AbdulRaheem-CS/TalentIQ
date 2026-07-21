"use client";

import { motion, type Variants } from "framer-motion";
import {
  Briefcase,
  ClipboardCheck,
  HeartHandshake,
  Network,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Briefcase,
    title: "AI-Powered Recruitment",
    description:
      "Score, rank, and move candidates through a pipeline built for high-volume enterprise hiring — with match scoring across skills, experience, and culture fit.",
    ai: true,
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Track performance history, ratings, and trends across every team so managers and leadership always know where the org stands.",
  },
  {
    icon: Network,
    title: "Living Org Chart",
    description:
      "Visualize reporting lines across the entire company, updated automatically as your team grows and changes.",
  },
  {
    icon: HeartHandshake,
    title: "DEI Dashboard",
    description:
      "Track representation and leadership diversity by department, with year-over-year trends to hold your org accountable.",
  },
  {
    icon: ClipboardCheck,
    title: "Guided Onboarding",
    description:
      "Give every new hire a clear checklist, an assigned buddy, and full visibility into ramp progress from day one.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-lg py-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Everything your people team needs
        </p>
        <h2 className="mt-sm text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          One platform, five ways to work smarter
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
        className="mt-2xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={cardVariants}>
            <Card variant={feature.ai ? "ai" : "default"} className="h-full">
              <CardHeader className="gap-sm">
                <div
                  className={
                    feature.ai
                      ? "flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-navy-600 text-white"
                      : "flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"
                  }
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  {feature.title}
                  {feature.ai && <Badge variant="ai">AI</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
