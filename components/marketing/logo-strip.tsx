"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Cloudbase Systems", className: "font-bold tracking-tight text-navy-700" },
  { name: "Vantiq", className: "font-serif italic tracking-wide text-slate-600" },
  { name: "Northbeam", className: "font-semibold uppercase tracking-widest text-slate-700" },
  { name: "Formstack Labs", className: "font-medium tracking-tight text-navy-600" },
  { name: "Corebase", className: "font-mono font-semibold tracking-tighter text-slate-700" },
  { name: "DataForge", className: "font-extrabold tracking-tight text-navy-800" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

export function LogoStrip() {
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-2xl">
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-lg grid grid-cols-2 gap-sm sm:grid-cols-3 lg:grid-cols-6"
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              variants={cardVariants}
              className="flex h-20 items-center justify-center rounded-xl border border-border/60 bg-card px-sm text-center shadow-xs transition-shadow hover:shadow-sm"
            >
              <span className={company.className}>{company.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
