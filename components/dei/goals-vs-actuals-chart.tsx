import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DeiGoal } from "@/types/deiDashboard";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function GoalsVsActualsChart({ data }: { data: DeiGoal[] }) {
  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="metric"
              tickLine={false}
              axisLine={false}
              width={150}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
            <Bar dataKey="goal" name="Goal" fill="hsl(var(--slate-300))" radius={[0, 4, 4, 0]} maxBarSize={14} />
            <Bar dataKey="actual" name="Actual" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>DEI goals vs actuals</caption>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Goal</th>
            <th>Actual</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.goal}%</td>
              <td>{row.actual}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
