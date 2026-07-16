import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid,
} from "recharts";
import type { UseCaseModel } from "@/data/mock-data";
import { generateTimeSeriesData } from "@/data/mock-data";
import { KpiFlipCard } from "./KpiFlipCard";

const roleColors: Record<string, string> = {
  earth: "hsl(16, 63%, 49%)",
  infra: "hsl(224, 76%, 48%)",
  alert: "hsl(48, 96%, 53%)",
};

interface UseCaseDetailProps {
  useCase: UseCaseModel;
}

type Period = "Today" | "Week" | "Month";

export function UseCaseDetail({ useCase }: UseCaseDetailProps) {
  const [period, setPeriod] = useState<Period>("Week");
  const days = period === "Today" ? 24 : period === "Week" ? 7 : 30;
  const chartData = generateTimeSeriesData(useCase.chartLabels, days);
  const color = roleColors[useCase.dataRole];

  return (
    <div className="h-full overflow-y-auto">
      <div className="grid-cell">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-xs font-semibold tracking-wider text-muted-foreground">{useCase.id}</span>
          <h2 className="font-display text-lg font-bold text-foreground">{useCase.name}</h2>
        </div>
        <p className="text-xs text-muted-foreground font-body mt-1">{useCase.provider} · {useCase.subCategory}</p>
      </div>

      <div className="grid grid-cols-3">
        {useCase.kpis.map((kpi) => (
          <KpiFlipCard key={kpi.label} kpi={kpi} devices={useCase.devices} />
        ))}
      </div>

      <div className="grid-cell flex gap-0">
        {(["Today", "Week", "Month"] as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 text-xs font-display font-medium tracking-wider border border-border transition-colors ${
              period === p ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:bg-secondary"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {useCase.chartLabels.length > 0 && (
        <div className="grid-cell overflow-x-auto">
          <p className="kpi-label mb-2">Trend — {useCase.chartLabels[0]}</p>
          <div style={{ minWidth: period === "Month" ? "600px" : "100%" }} className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Line type="monotone" dataKey={useCase.chartLabels[0]} stroke={color} strokeWidth={2} dot={false} />
                {useCase.chartLabels[1] && (
                  <Line type="monotone" dataKey={useCase.chartLabels[1]} stroke="hsl(50, 4%, 70%)" strokeWidth={1.5} dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {useCase.chartLabels.length > 1 && (
        <div className="grid-cell overflow-x-auto">
          <p className="kpi-label mb-2">Comparison</p>
          <div style={{ minWidth: period === "Month" ? "600px" : "100%" }} className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Bar dataKey={useCase.chartLabels[0]} fill={color} />
                <Bar dataKey={useCase.chartLabels[1]} fill="hsl(50, 4%, 75%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {useCase.devices.length > 0 && (
        <div className="grid-cell">
          <p className="kpi-label mb-2">Device Locations</p>
          <table className="w-full text-xs font-display">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 text-muted-foreground font-medium">ID</th>
                <th className="text-left py-1.5 text-muted-foreground font-medium">Label</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Lat</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Lng</th>
              </tr>
            </thead>
            <tbody>
              {useCase.devices.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="py-1.5 text-foreground font-medium">{d.id}</td>
                  <td className="py-1.5 text-foreground">{d.label}</td>
                  <td className="py-1.5 text-right">{d.lat.toFixed(4)}</td>
                  <td className="py-1.5 text-right">{d.lng.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
