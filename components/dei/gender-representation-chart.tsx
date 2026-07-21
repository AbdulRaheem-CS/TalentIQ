import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DiversityMetric } from "@/types/diversityMetric";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function GenderRepresentationChart({ data }: { data: DiversityMetric[] }) {
  const chartData = data.map((m) => ({ department: m.department, women: m.genderBreakdown.women }));

  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="department"
              tickLine={false}
              axisLine={false}
              width={110}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value) => [`${value}%`, "Women"]}
            />
            <Bar dataKey="women" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Women representation by department</caption>
        <thead>
          <tr>
            <th>Department</th>
            <th>Women %</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((row) => (
            <tr key={row.department}>
              <td>{row.department}</td>
              <td>{row.women}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
