import { useNavigate } from "react-router-dom";
import { useCases } from "@/data/mock-data";
import { useVillageContext } from "@/context/VillageContext";
import { useUseCasesByCategory } from "@/hooks/useUseCase";

export default function IoTList() {
  const navigate = useNavigate();
  const { selectedVillageId } = useVillageContext();
  const { data: res, isLoading } = useUseCasesByCategory(selectedVillageId, 'iot');

  const apiCases = res?.data || useCases; // fallback to mock data if API is empty/loading

  if (isLoading) {
    return <div className="p-4 text-foreground font-display">Loading IoT use cases...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="border-b border-border px-4 py-3">
        <h1 className="font-display text-base font-bold text-foreground">IoT Use Cases</h1>
        <p className="text-xs text-muted-foreground font-body mt-0.5">
          {apiCases.length} use cases · Auto-updated via API · View only
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apiCases.map((uc: any) => (
          <button
            key={uc.assignmentId || uc.id || uc.useCaseId}
            onClick={() => navigate(`/iot/${uc.assignmentId || uc.id || uc.useCaseId}`)}
            className="grid-cell text-left hover:bg-secondary transition-colors"
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display text-[10px] font-semibold tracking-wider text-muted-foreground">{(uc.id || uc.useCaseId || "").substring(0, 8)}</span>
              <span className="text-[10px] text-muted-foreground">{uc.category || "IoT"}</span>
            </div>
            <h3 className="font-display text-sm font-bold text-foreground truncate">{uc.name || uc.useCaseName}</h3>
            <p className="text-[10px] text-muted-foreground font-body mb-2">{uc.provider || uc.useCaseProvider} · {uc.subCategory || uc.subcategory}</p>

            {(uc.stats || uc.kpis || []).slice(0, 4).map((stat: any) => (
              <div key={stat.name || stat.label} className="flex items-baseline justify-between py-0.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.name || stat.label}</span>
                <span className="font-display text-xs font-medium">{stat.value}{stat.unit && <span className="text-[9px] text-muted-foreground ml-0.5">{stat.unit}</span>}</span>
              </div>
            ))}

            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border">
              <span className="font-display text-[10px] text-muted-foreground">{uc.totalEntitiesCount ?? (uc.devices?.length || 0)} entities</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
