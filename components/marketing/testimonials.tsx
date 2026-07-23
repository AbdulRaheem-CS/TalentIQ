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
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote:
      "The AI match scoring didn't replace our recruiters' judgment — it just gave them a head start. Screening time per requisition is down by a third.",
    name: "Marcus Feldman",
    title: "Head of Talent Acquisition",
    company: "Bluecrest Financial",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  },
  {
    quote:
      "Our leadership team finally has one dashboard for diversity metrics instead of a quarterly spreadsheet. It's made the conversation a lot more honest.",
    name: "Renata Silva",
    title: "Chief People Officer",
    company: "Meridian Health Group",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=160&q=80",
  },
];

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
            <motion.div key={t.name} variants={cardVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="flex h-full flex-col justify-between transition-shadow duration-200 hover:shadow-lg">
                <CardContent className="pt-lg">
                  <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                </CardContent>
                <CardContent className="flex items-center gap-sm pt-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                  />
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
