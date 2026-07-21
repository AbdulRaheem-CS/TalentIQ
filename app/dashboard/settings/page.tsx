"use client";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { BillingCard } from "@/components/settings/billing-card";
import { CompanyProfileForm } from "@/components/settings/company-profile-card";
import { TeamMembersList } from "@/components/settings/team-members-list";
import { useAsync } from "@/lib/hooks/use-async";
import { getBillingInfo, getCompanyProfile, getWorkspaceMembers } from "@/lib/api";

export default function SettingsPage() {
  const { data: profile, isLoading: loadingProfile } = useAsync(getCompanyProfile);
  const { data: members, isLoading: loadingMembers } = useAsync(getWorkspaceMembers);
  const { data: billing, isLoading: loadingBilling } = useAsync(getBillingInfo);

  return (
    <div>
      <PageHeader title="Settings" description="Manage your company profile, team access, and billing." />

      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Basic information about your organization.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {loadingProfile || !profile ? (
            <div className="flex flex-col gap-md">
              <Skeleton className="h-14 w-14 rounded-lg" />
              <div className="grid gap-md sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <CompanyProfileForm profile={profile} />
          )}
        </CardContent>
      </Card>

      <Card className="mt-lg">
        <CardHeader className="flex-row items-center justify-between gap-md">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Who has access to this TalentIQ workspace.</CardDescription>
          </div>
          <Button size="sm">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </CardHeader>
        <CardContent className="pt-0">
          {loadingMembers || !members ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <TeamMembersList members={members} />
          )}
        </CardContent>
      </Card>

      <Card className="mt-lg">
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Your current plan, features, and invoice history.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {loadingBilling || !billing ? (
            <div className="flex flex-col gap-md">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : (
            <BillingCard billing={billing} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
