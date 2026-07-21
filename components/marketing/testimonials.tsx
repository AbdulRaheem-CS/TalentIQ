"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "We cut our average time-to-hire from six weeks to under a month in the first quarter. The pipeline view alone changed how our recruiters run their day.",
    name: "Denise Okafor",
    title: "VP of People",
    company: "Anthem Robotics",
  },
  {
    quote:
      "The AI match scoring didn't replace our recruiters' judgment — it just gave them a head start. Screening time per requisition is down by a third.",
    name: "Marcus Feldman",
    title: "Head of Talent Acquisition",
    company: "Bluecrest Financial",
  },
  {
    quote:
      "Our leadership team finally has one dashboard for diversity metrics instead of a quarterly spreadsheet. It's made the conversation a lot more honest.",
    name: "Renata Silva",
    title: "Chief People Officer",
    company: "Meridian Health Group",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary/40 py-3xl">
      <div className="mx-auto max-w-7xl px-lg">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Loved by HR teams
          </p>
          <h2 className="mt-sm text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trusted by people leaders who need answers, not just dashboards
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="mt-2xl grid gap-lg md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={cardVariants}>
              <Card className="flex h-full flex-col justify-between">
                <CardContent className="pt-lg">
                  <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                </CardContent>
                <CardContent className="flex items-center gap-sm pt-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials(t.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
