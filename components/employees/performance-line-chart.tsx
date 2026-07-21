import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PerformanceReview } from "@/types/employee";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function PerformanceLineChart({ data }: { data: PerformanceReview[] }) {
  if (data.length < 2) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Not enough review history yet to chart a trend.
      </p>
    );
  }

  return (
    <div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={false}
              width={24}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }} />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="sr-only">
        <caption>Performance rating by review period</caption>
        <thead>
          <tr>
            <th>Period</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.period}>
              <td>{row.period}</td>
              <td>{row.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
