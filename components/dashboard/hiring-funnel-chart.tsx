import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HiringFunnelStage } from "@/types/dashboardOverview";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function HiringFunnelChart({ data }: { data: HiringFunnelStage[] }) {
  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="stage"
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={28}>
              <LabelList
                dataKey="count"
                position="right"
                fill="hsl(var(--foreground))"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Hiring funnel snapshot by stage</caption>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Candidates</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.stage}>
              <td>{row.stage}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
