import { useNavigate } from "react-router-dom";
import { nonIoTUseCases } from "@/data/mock-data";
import { useVillageContext } from "@/context/VillageContext";
import { useUseCasesByCategory } from "@/hooks/useUseCase";

export default function NonIoTList() {
  const navigate = useNavigate();
  const { selectedVillageId } = useVillageContext();
  const { data: res, isLoading } = useUseCasesByCategory(selectedVillageId, 'non-iot');

  const apiCases = res?.data || nonIoTUseCases; // fallback

  if (isLoading) {
    return <div className="p-4 text-foreground font-display">Loading Non-IoT use cases...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="border-b border-border px-4 py-3">
        <h1 className="font-display text-base font-bold text-foreground">Non-IoT Use Cases</h1>
        <p className="text-xs text-muted-foreground font-body mt-0.5">
          {apiCases.length} use cases · Manual data input · Editable
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-3">
        {apiCases.map((uc: any) => (
          <button
            key={uc.assignmentId || uc.id || uc.useCaseId}
            onClick={() => navigate(`/non-iot/${uc.assignmentId || uc.id || uc.useCaseId}`)}
            className="grid-cell text-left hover:bg-secondary transition-colors"
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display text-[10px] font-semibold tracking-wider text-muted-foreground">{(uc.id || uc.useCaseId || "").substring(0, 8)}</span>
              <span className="text-[10px] text-muted-foreground">{uc.category || "Non-IoT"}</span>
            </div>
            <h3 className="font-display text-sm font-bold text-foreground truncate">{uc.name || uc.useCaseName}</h3>
            <p className="text-[10px] text-muted-foreground font-body mb-2">{uc.provider || uc.useCaseProvider} · {uc.subCategory || uc.subcategory}</p>

            {(uc.stats || uc.kpis || []).slice(0, 4).map((stat: any) => (
              <div key={stat.name || stat.label} className="flex items-baseline justify-between py-0.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.name || stat.label}</span>
                <span className="font-display text-xs font-medium">{stat.value}{stat.unit && <span className="text-[9px] text-muted-foreground ml-0.5">{stat.unit}</span>}</span>
              </div>
            ))}

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
              <span className="text-[10px] text-muted-foreground">{uc.totalEntitiesCount ?? (uc.history?.length || 0)} entities</span>
              <span className="text-[10px] text-earth font-display font-medium">EDIT →</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
