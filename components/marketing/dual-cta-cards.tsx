"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaCardProps {
  image: string;
  imageAlt: string;
  accent: "violet" | "navy";
  peek: "top-left" | "bottom-right";
  badge: string;
  headline: string;
  linkText: string;
  href: string;
}

function CtaCard({ image, imageAlt, accent, peek, badge, headline, linkText, href }: CtaCardProps) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className={cn(
          "absolute -z-10 h-full w-full rounded-2xl",
          accent === "violet" ? "bg-violet-500/70" : "bg-navy-600/70",
          peek === "top-left" ? "-left-4 -top-4" : "-right-4 -bottom-4"
        )}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl shadow-lg"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={imageAlt} className="h-80 w-full object-cover sm:h-96" loading="lazy" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mt-14 ml-6 max-w-[80%] rounded-xl border border-border bg-card p-lg shadow-lg sm:max-w-xs"
      >
        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {badge}
        </span>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">{headline}</h3>
        <Link href={href} className="group mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}

export function DualCtaCards() {
  return (
    <section className="mx-auto max-w-7xl px-lg py-3xl">
      <div className="grid gap-2xl sm:grid-cols-2 sm:gap-xl">
        <CtaCard
          image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
          imageAlt="Two recruiters celebrating a successful hire at their desk"
          accent="violet"
          peek="top-left"
          badge="For Recruiters"
          headline="Fill roles faster with AI-scored pipelines"
          linkText="See the Recruitment module"
          href="/login"
        />
        <CtaCard
          image="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80"
          imageAlt="A candidate working confidently in a modern office"
          accent="navy"
          peek="bottom-right"
          badge="For Candidates"
          headline="A clearer, faster path from application to offer"
          linkText="See how it works"
          href="/login"
        />
      </div>
    </section>
  );
}
