"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeft, ChevronsRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "./nav-items";

const STORAGE_KEY = "talentiq_sidebar_collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 260 }}
      transition={{ duration: mounted ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-screen shrink-0 flex-col overflow-hidden border-r border-navy-800/60 bg-navy-950 text-slate-300"
    >
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-navy-800/60 px-lg">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-navy-400 to-navy-600 text-sm font-bold text-white">
          IQ
        </div>
        {!collapsed && (
          <span className="truncate text-base font-bold tracking-tight text-white">
            TalentIQ
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-sm">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-navy-800 text-white"
                  : "text-slate-400 hover:bg-navy-900 hover:text-slate-100"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-navy-300"
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && (
                <span className="flex flex-1 items-center justify-between truncate">
                  {item.label}
                  {item.ai && (
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-sm border-t border-navy-800/60 p-sm">
        {!collapsed && (
          <span className="inline-flex w-fit items-center rounded-full border border-navy-700 bg-navy-900 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
            Demo Mode
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-navy-900 hover:text-slate-100"
        >
          {collapsed ? (
            <ChevronsRight className="h-[18px] w-[18px] shrink-0" />
          ) : (
            <>
              <ChevronsLeft className="h-[18px] w-[18px] shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
