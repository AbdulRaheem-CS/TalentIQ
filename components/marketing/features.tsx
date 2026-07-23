"use client";

import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "./feature-data";

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
          <motion.div
            key={feature.title}
            id={feature.slug}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            className="scroll-mt-24"
          >
            <Card variant={feature.ai ? "ai" : "default"} className="h-full transition-shadow duration-200 hover:shadow-lg">
              <CardHeader className="gap-sm">
                <motion.div
                  whileHover={
                    feature.ai
                      ? { boxShadow: "0 0 0 6px rgb(139 61 246 / 0.18)" }
                      : { boxShadow: "0 0 0 6px hsl(var(--primary) / 0.14)" }
                  }
                  transition={{ duration: 0.25 }}
                  className={
                    feature.ai
                      ? "flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-navy-600 text-white"
                      : "flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary"
                  }
                >
                  <feature.icon className="h-5 w-5" />
                </motion.div>
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
