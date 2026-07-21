"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/lib/hooks/use-click-outside";

const notifications = [
  {
    id: 1,
    title: "New candidate applied",
    detail: "Chloe Bennett applied to Staff Software Engineer, Backend.",
    time: "2h ago",
  },
  {
    id: 2,
    title: "Onboarding checklist completed",
    detail: "Priya Shah finished her 30-day onboarding checklist.",
    time: "5h ago",
  },
  {
    id: 3,
    title: "Diversity report ready",
    detail: "The Q2 DEI analytics report is ready for review.",
    time: "1d ago",
  },
];

const CURRENT_USER = { name: "Jasmine Cole", title: "Technical Recruiter", initials: "JC" };

export function Header() {
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen);
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-md border-b border-border bg-card px-lg">
      <div className="w-full max-w-sm">
        <Input icon={<Search />} placeholder="Search candidates, employees, roles..." />
      </div>

      <div className="flex items-center gap-sm">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg"
              >
                <div className="border-b border-border px-md py-sm">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                </div>
                <ul className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="border-b border-border/60 px-md py-sm last:border-0">
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{n.detail}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md p-1 pr-2 transition-colors hover:bg-secondary"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {CURRENT_USER.initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold leading-tight text-foreground">
                {CURRENT_USER.name}
              </p>
              <p className="text-[11px] leading-tight text-muted-foreground">{CURRENT_USER.title}</p>
            </div>
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-card p-1 shadow-lg"
              >
                <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/dashboard/settings");
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={() => router.push("/")}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
