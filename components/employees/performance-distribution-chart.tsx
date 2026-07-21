import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface RatingBucket {
  rating: number;
  count: number;
}

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function PerformanceDistributionChart({ data }: { data: RatingBucket[] }) {
  return (
    <div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="rating"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}★`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={28}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--secondary))" }}
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value) => [`${value} employees`, "Count"]}
              labelFormatter={(label) => `${label} star rating`}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={56}>
              <LabelList dataKey="count" position="top" fill="hsl(var(--foreground))" fontSize={12} fontWeight={600} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Performance rating distribution across the company</caption>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.rating}>
              <td>{row.rating}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
