import { useState } from "react";
import type { SensorDevice } from "@/data/mock-data";

interface KpiFlipCardProps {
  kpi: { label: string; value: string | number; unit?: string };
  devices?: SensorDevice[];
}

export function KpiFlipCard({ kpi, devices }: KpiFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="grid-cell cursor-pointer select-none"
      style={{ perspective: "600px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative transition-transform duration-300"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div style={{ backfaceVisibility: "hidden" }}>
          <p className="kpi-label">{kpi.label}</p>
          <p className="kpi-value mt-1">
            {kpi.value}
            {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
          </p>
        </div>
        <div
          className="absolute inset-0 p-3"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {devices && devices.length > 0 ? (
            <div className="space-y-1">
              <p className="kpi-label mb-1">GPS Coordinates</p>
              {devices.slice(0, 3).map((d) => (
                <p key={d.id} className="font-display text-[10px] text-foreground">
                  {d.lat.toFixed(4)}, {d.lng.toFixed(4)}
                  <span className="text-muted-foreground ml-1">— {d.label}</span>
                </p>
              ))}
            </div>
          ) : (
            <p className="kpi-label">No location data</p>
          )}
        </div>
      </div>
    </div>
  );
}
