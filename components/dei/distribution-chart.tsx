import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DistributionBucket } from "@/types/diversityMetric";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

// Sequential, single-hue ramp (light → dark) for ordered buckets like age
// range or tenure — never a categorical rainbow for ordered data.
const SEQUENTIAL_SHADES = [
  "hsl(var(--navy-300))",
  "hsl(var(--navy-500))",
  "hsl(var(--navy-700))",
  "hsl(var(--navy-900))",
];

export interface DistributionRow {
  department: string;
  buckets: DistributionBucket[];
}

export function DistributionChart({ rows, bucketLabels }: { rows: DistributionRow[]; bucketLabels: string[] }) {
  const chartData = rows.map((row) => {
    const entry: Record<string, string | number> = { department: row.department };
    for (const bucket of row.buckets) {
      entry[bucket.label] = bucket.percentage;
    }
    return entry;
  });

  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 8, bottom: 4, left: 8 }}>
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
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
            {bucketLabels.map((label, i) => (
              <Bar
                key={label}
                dataKey={label}
                stackId="distribution"
                fill={SEQUENTIAL_SHADES[i % SEQUENTIAL_SHADES.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Distribution by department</caption>
        <thead>
          <tr>
            <th>Department</th>
            {bucketLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.department}>
              <td>{row.department}</td>
              {row.buckets.map((b) => (
                <td key={b.label}>{b.percentage}%</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
