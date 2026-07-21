import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    heading: "Product",
    links: ["Recruitment", "Performance Analytics", "Org Chart", "DEI Dashboard", "Onboarding"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-lg py-2xl">
        <div className="grid gap-2xl md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-sm">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              The operating system for enterprise talent teams.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-sm">
              <p className="text-sm font-semibold text-foreground">{col.heading}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-2xl flex flex-col gap-2 border-t border-border/60 pt-lg text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TalentIQ. All rights reserved.</p>
          <p>
            TalentIQ is a fictional product built to demonstrate enterprise SaaS UI/UX — not a real
            company. <Link href="/login" className="underline hover:text-foreground">Log in</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
