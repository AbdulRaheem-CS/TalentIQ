import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HiringFunnelDiversityStage } from "@/types/deiDashboard";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function HiringDiversityFunnelChart({ data }: { data: HiringFunnelDiversityStage[] }) {
  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 28, bottom: 4, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} hide />
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
              formatter={(value) => [`${value}%`, "Diverse candidates"]}
            />
            <Bar dataKey="diversePercentage" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={28}>
              <LabelList
                dataKey="diversePercentage"
                position="right"
                formatter={(v) => `${v}%`}
                fill="hsl(var(--foreground))"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Share of candidates from underrepresented groups at each pipeline stage</caption>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Diverse candidates</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.stage}>
              <td>{row.stage}</td>
              <td>{row.diversePercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
