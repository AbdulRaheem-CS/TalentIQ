"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBlobs } from "./animated-blobs";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-3xl">
      <AnimatedBlobs variant="dark" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center gap-lg px-lg text-center"
      >
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to see TalentIQ in action?
        </h2>
        <p className="text-balance text-slate-300">
          Log in to the live demo dashboard and explore recruiting, analytics,
          org planning, DEI tracking, and onboarding — all in one place.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-sm">
          <Link href="/login">
            <Button
              size="lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 32px 6px rgb(255 255 255 / 0.3)" }}
              className="bg-white text-navy-950 hover:bg-slate-100"
            >
              Log In to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="ghost" className="text-slate-200 hover:bg-white/10 hover:text-white">
              Talk to Sales
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
