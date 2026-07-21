"use client";

import { motion } from "framer-motion";

const companies = ["Cloudbase Systems", "Vantiq", "Northbeam", "Formstack Labs", "Corebase", "DataForge"];

export function LogoStrip() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-xl">
      <div className="mx-auto max-w-7xl px-lg">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          Trusted by talent teams at
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-md flex flex-wrap items-center justify-center gap-x-2xl gap-y-sm"
        >
          {companies.map((name) => (
            <span
              key={name}
              className="text-base font-semibold tracking-tight text-muted-foreground/70 grayscale"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
