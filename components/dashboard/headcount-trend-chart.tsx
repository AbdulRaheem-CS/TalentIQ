import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HeadcountTrendPoint } from "@/types/dashboardOverview";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function HeadcountTrendChart({ data }: { data: HeadcountTrendPoint[] }) {
  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="headcountFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              allowDecimals={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }} />
            <Area
              type="monotone"
              dataKey="headcount"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#headcountFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Headcount trend by year</caption>
        <thead>
          <tr>
            <th>Year</th>
            <th>Headcount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.headcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
