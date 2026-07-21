"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CompanyProfile } from "@/types/settings";

export function CompanyProfileForm({ profile }: { profile: CompanyProfile }) {
  const [name, setName] = useState(profile.name);
  const [website, setWebsite] = useState(profile.website);
  const [industry, setIndustry] = useState(profile.industry);
  const [size, setSize] = useState(profile.size);
  const [headquarters, setHeadquarters] = useState(profile.headquarters);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center gap-sm">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
          {profile.logoInitials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Company Logo</p>
          <p className="text-xs text-muted-foreground">Shown on invoices and candidate-facing pages.</p>
        </div>
      </div>

      <div className="mt-lg grid gap-md sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company-name" className="text-xs font-medium text-foreground">
            Company name
          </label>
          <Input id="company-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company-website" className="text-xs font-medium text-foreground">
            Website
          </label>
          <Input id="company-website" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company-industry" className="text-xs font-medium text-foreground">
            Industry
          </label>
          <Input id="company-industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company-size" className="text-xs font-medium text-foreground">
            Company size
          </label>
          <Input id="company-size" value={size} onChange={(e) => setSize(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="company-hq" className="text-xs font-medium text-foreground">
            Headquarters
          </label>
          <Input id="company-hq" value={headquarters} onChange={(e) => setHeadquarters(e.target.value)} />
        </div>
      </div>

      <div className="mt-lg flex items-center gap-sm">
        <Button onClick={handleSave}>Save Changes</Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-success">
            <Check className="h-4 w-4" />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
