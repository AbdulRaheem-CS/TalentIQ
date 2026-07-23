"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedBlobs } from "./animated-blobs";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-background">
      <AnimatedBlobs />
      <div className="mx-auto grid w-full max-w-7xl gap-2xl px-lg py-2xl lg:grid-cols-2 lg:items-center 2xl:max-w-[96rem] 2xl:gap-3xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-lg 2xl:gap-xl"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="ai" className="2xl:px-4 2xl:py-1.5 2xl:text-sm">
              AI-Powered Talent Intelligence
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-balance font-semibold tracking-tight text-foreground text-[clamp(2.5rem,1.6vw+2rem,5.5rem)] leading-[1.05]"
          >
            The operating system for enterprise talent teams
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-balance text-muted-foreground text-[clamp(1.125rem,0.4vw+1rem,1.5rem)] 2xl:max-w-2xl"
          >
            TalentIQ unifies recruiting, performance, org planning, and DEI
            analytics into one platform — so your HR team spends less time
            switching tools and more time making decisions that matter.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-sm">
            <Link href="/login">
              <Button size="lg" className="2xl:h-14 2xl:px-8 2xl:text-lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="2xl:h-14 2xl:px-8 2xl:text-lg">
                See how it works
              </Button>
            </a>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xs text-muted-foreground 2xl:text-sm">
            No credit card required · Full demo environment · Setup in minutes
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-2xl shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="A team of engineers collaborating around laptops in a modern office"
              className="w-full object-cover h-[clamp(360px,52vh,720px)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.9 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute -right-4 -top-6 hidden sm:block"
          >
            <Card variant="ai" className="w-48 px-md py-sm 2xl:w-56 2xl:px-lg 2xl:py-md">
              <div className="flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-300 2xl:text-sm">
                <Sparkles className="h-3.5 w-3.5" />
                AI Match Score
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground 2xl:text-base">Jenna Park — 94%</p>
              <p className="text-xs text-muted-foreground 2xl:text-sm">Senior Software Engineer</p>
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
            <Card variant="elevated" className="w-44 px-md py-sm 2xl:w-52 2xl:px-lg 2xl:py-md">
              <p className="text-xs text-muted-foreground 2xl:text-sm">Time to Hire</p>
              <p className="text-sm font-semibold text-success 2xl:text-base">↓ 18% this quarter</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
