import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { DataRole } from "@/data/mock-data";

const roleColors: Record<DataRole, string> = {
  earth: "hsl(16, 63%, 49%)",
  infra: "hsl(224, 76%, 48%)",
  alert: "hsl(48, 96%, 53%)",
};

interface SparklineProps {
  data: number[];
  dataRole: DataRole;
}

export function Sparkline({ data, dataRole }: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div className="sparkline-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="v"
            stroke={roleColors[dataRole]}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
