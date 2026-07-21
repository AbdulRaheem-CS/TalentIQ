import { Check, Download, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BillingInfo } from "@/types/settings";

function formatDate(dateISO: string) {
  return new Date(dateISO).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function BillingCard({ billing }: { billing: BillingInfo }) {
  return (
    <div>
      <div className="flex flex-col gap-lg rounded-lg border border-violet-400/30 bg-gradient-to-br from-violet-500/10 to-navy-500/5 p-lg sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="ai">
              <Sparkles className="h-3 w-3" />
              {billing.plan} Plan
            </Badge>
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {formatCurrency(billing.pricePerMonth)}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {billing.seatsUsed} of {billing.seatsTotal} seats used · renews {formatDate(billing.renewalDate)}
          </p>
        </div>
        <div className="flex shrink-0 gap-sm">
          <Button variant="outline" size="sm">
            Manage Seats
          </Button>
          <Button size="sm">Upgrade Plan</Button>
        </div>
      </div>

      <ul className="mt-md grid gap-2 sm:grid-cols-2">
        {billing.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
            <Check className="h-4 w-4 shrink-0 text-success" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-lg">
        <p className="mb-2 text-sm font-semibold text-foreground">Invoice History</p>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-xs text-muted-foreground">
                <th className="px-4 py-2.5 font-medium">Invoice</th>
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Amount</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {billing.invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-foreground">{invoice.id}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{formatDate(invoice.date)}</td>
                  <td className="px-4 py-2.5 text-foreground">{formatCurrency(invoice.amount)}</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="success">{invoice.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      type="button"
                      aria-label={`Download ${invoice.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
