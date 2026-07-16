import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, CartesianGrid, AreaChart, Area,
} from "recharts";
import { useCases, nonIoTUseCases, generateTimeSeriesData } from "@/data/mock-data";

type Period = "Today" | "Week" | "Month";

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("Week");
  const days = period === "Today" ? 24 : period === "Week" ? 7 : 30;

  const energyData = generateTimeSeriesData(["Solar Generation", "Street Light Energy"], days);
  const waterData = generateTimeSeriesData(["Flow Rate", "pH Level"], days);
  const usageData = generateTimeSeriesData(["WiFi Users", "CCTV Bandwidth"], days);
  const uptimeData = generateTimeSeriesData(["Network Uptime", "CNOC Sync"], days);

  const allDevices = [...useCases.flatMap((uc) => uc.devices), ...nonIoTUseCases.flatMap((uc) => uc.devices)];

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="border-b border-border px-4 py-3 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-base font-bold text-foreground">Analytics</h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Multi-series trends across all use cases · {allDevices.length} devices
          </p>
        </div>
        <div className="flex gap-0">
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
      </header>

      <div className="grid grid-cols-2">
        {/* Energy */}
        <div className="grid-cell">
          <p className="kpi-label mb-2">Energy Consumption</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Area type="monotone" dataKey="Solar Generation" stroke="hsl(16, 63%, 49%)" fill="hsl(16, 63%, 49%)" fillOpacity={0.1} />
                <Area type="monotone" dataKey="Street Light Energy" stroke="hsl(224, 76%, 48%)" fill="hsl(224, 76%, 48%)" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water */}
        <div className="grid-cell">
          <p className="kpi-label mb-2">Water Metrics</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Line type="monotone" dataKey="Flow Rate" stroke="hsl(224, 76%, 48%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pH Level" stroke="hsl(16, 63%, 49%)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage */}
        <div className="grid-cell">
          <p className="kpi-label mb-2">Device Usage</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Bar dataKey="WiFi Users" fill="hsl(224, 76%, 48%)" />
                <Bar dataKey="CCTV Bandwidth" fill="hsl(50, 4%, 75%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Uptime */}
        <div className="grid-cell">
          <p className="kpi-label mb-2">Uptime Metrics</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <CartesianGrid stroke="hsl(50, 4%, 88%)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" />
                <YAxis tick={{ fontSize: 10, fontFamily: "Space Grotesk" }} stroke="hsl(50, 4%, 88%)" width={30} />
                <Line type="monotone" dataKey="Network Uptime" stroke="hsl(224, 76%, 48%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="CNOC Sync" stroke="hsl(16, 63%, 49%)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
