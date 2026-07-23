"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/lib/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { features } from "./feature-data";

const plainLinks = [
  { key: "customers", label: "Customers", href: "#testimonials" },
  { key: "pricing", label: "Pricing", href: "#" },
];

function NavPillLink({
  href,
  active,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  children,
}: {
  href: string;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative rounded-full px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {active && (
        <motion.span
          layoutId="navHoverPill"
          className="absolute inset-0 -z-10 rounded-full bg-secondary"
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useClickOutside(featuresRef, () => setFeaturesOpen(false), featuresOpen);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md transition-all duration-300",
        scrolled ? "border-border shadow-md" : "border-border/60 shadow-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-lg transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/talentiq-logo-navbar.svg"
            alt="TalentIQ"
            width={200}
            height={45}
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div
            ref={featuresRef}
            className="relative"
            onMouseEnter={() => {
              setFeaturesOpen(true);
              setHovered("features");
            }}
            onMouseLeave={() => {
              setFeaturesOpen(false);
              setHovered(null);
            }}
          >
            <button
              onClick={() => setFeaturesOpen((o) => !o)}
              className="relative flex items-center gap-1 rounded-full px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={featuresOpen}
            >
              {hovered === "features" && (
                <motion.span
                  layoutId="navHoverPill"
                  className="absolute inset-0 -z-10 rounded-full bg-secondary"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              Features
              <motion.span animate={{ rotate: featuresOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-full z-50 mt-2 w-[560px] -translate-x-1/2 rounded-xl border border-border bg-card p-sm shadow-xl"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {features.map((feature) => (
                      <a
                        key={feature.slug}
                        href={`#${feature.slug}`}
                        onClick={() => setFeaturesOpen(false)}
                        className="flex items-start gap-sm rounded-lg p-sm transition-colors hover:bg-secondary"
                      >
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                            feature.ai
                              ? "bg-gradient-to-br from-violet-500 to-navy-600 text-white"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          <feature.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1 text-sm font-medium text-foreground">
                            {feature.title}
                            {feature.ai && <Sparkles className="h-3 w-3 text-violet-500" />}
                          </p>
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {plainLinks.map((link) => (
            <NavPillLink
              key={link.key}
              href={link.href}
              active={hovered === link.key}
              onMouseEnter={() => setHovered(link.key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(link.key)}
              onBlur={() => setHovered(null)}
            >
              {link.label}
            </NavPillLink>
          ))}
        </nav>

        <div className="flex items-center gap-md">
          <Link
            href="/login"
            className="hidden text-base font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            Log in
          </Link>
          <Link href="/login" className="hidden sm:inline-block">
            <Button size="md">Get Started</Button>
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-1 px-lg py-md">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Features
              </p>
              {features.map((feature) => (
                <a
                  key={feature.slug}
                  href={`#${feature.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base text-foreground hover:bg-secondary"
                >
                  <feature.icon className="h-4 w-4 text-muted-foreground" />
                  {feature.title}
                </a>
              ))}
              <div className="my-1 h-px bg-border" />
              {plainLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-sm flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
