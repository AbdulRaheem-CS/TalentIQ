import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PayEquityBand } from "@/types/deiDashboard";

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "var(--radius-md)",
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export function PayEquityChart({ data }: { data: PayEquityBand[] }) {
  // Floating range bars: an invisible base segment up to ratioLow, then a
  // visible segment spanning ratioLow → ratioHigh — the standard Recharts
  // technique for banded/ranged data.
  const chartData = data.map((band) => ({
    level: band.level,
    base: band.ratioLow,
    range: band.ratioHigh - band.ratioLow,
    ratioMid: band.ratioMid,
  }));

  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 8 }}>
            <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              domain={[80, 110]}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="level"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <ReferenceLine x={100} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value, name, item) => {
                if (name === "base") return [null, null];
                const payload = item?.payload;
                return [`${payload.base}% – ${payload.base + payload.range}% (median ${payload.ratioMid}%)`, "Pay ratio"];
              }}
            />
            <Bar dataKey="base" stackId="band" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="range" stackId="band" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        Women&apos;s median compensation as a % of men&apos;s, by level band. Dashed line marks pay parity (100%).
      </p>
      <table className="sr-only">
        <caption>Pay equity ratio range by level</caption>
        <thead>
          <tr>
            <th>Level</th>
            <th>Range</th>
            <th>Median</th>
          </tr>
        </thead>
        <tbody>
          {data.map((band) => (
            <tr key={band.level}>
              <td>{band.level}</td>
              <td>
                {band.ratioLow}% – {band.ratioHigh}%
              </td>
              <td>{band.ratioMid}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
