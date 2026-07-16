import type { UseCaseModel } from "@/data/mock-data";
import { Sparkline } from "./Sparkline";

interface UseCaseCardProps {
  useCase: UseCaseModel;
  onClick?: () => void;
}

export function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  return (
    <button
      onClick={onClick}
      className="grid-cell text-left w-full hover:bg-secondary transition-colors duration-150 cursor-pointer"
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-display text-xs font-semibold tracking-wider text-muted-foreground">
          {useCase.id}
        </span>
        <span className="text-xs text-muted-foreground font-body">{useCase.category}</span>
      </div>

      <h3 className="font-display text-sm font-semibold text-foreground mb-0.5">
        {useCase.name}
      </h3>
      <p className="text-xs text-muted-foreground font-body mb-3">
        {useCase.provider} · {useCase.subCategory}
      </p>

      <div className="space-y-1 mb-3">
        {useCase.kpis.slice(0, 3).map((kpi) => (
          <div key={kpi.label} className="flex items-baseline justify-between">
            <span className="kpi-label text-[10px]">{kpi.label}</span>
            <span className="font-display text-sm font-medium text-foreground">
              {kpi.value}
              {kpi.unit && (
                <span className="text-[10px] text-muted-foreground ml-0.5">{kpi.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <Sparkline data={useCase.sparkline} dataRole={useCase.dataRole} />

      <div className="flex items-center gap-1.5 mt-2">
        {useCase.dataRole === "alert" ? (
          <span className="status-alert" />
        ) : (
          <span className="status-active" />
        )}
        <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">
          {useCase.dataRole === "alert" ? "Alert" : "Active"}
        </span>
      </div>
    </button>
  );
}
