import { useState, useEffect } from "react";
import { useVillages, useVillageDetails } from "@/hooks/useDemographic";

export default function Villages() {
  const { data: res, isLoading: isLoadingList } = useVillages();
  const villageList = res?.data || [];
  
  const [selectedVillageId, setSelectedVillageId] = useState<string | null>(null);

  // Automatically select the first village when the list loads
  useEffect(() => {
    if (villageList.length > 0 && !selectedVillageId) {
      setSelectedVillageId(villageList[0].id);
    }
  }, [villageList, selectedVillageId]);

  const { data: detailRes, isLoading: isLoadingDetail } = useVillageDetails(selectedVillageId || undefined);
  const villageDetail = detailRes?.data;

  if (isLoadingList) {
    return <div className="p-4 text-foreground font-display">Loading villages...</div>;
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 shrink-0">
        <div>
          <h1 className="font-display text-base font-bold text-foreground">
            Demographic Villages
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {villageList.length} villages · Master Data
          </p>
        </div>
      </header>

      {/* Village Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 shrink-0 max-h-48 overflow-y-auto">
        {villageList.map((v: any) => (
          <button
            key={v.id}
            onClick={() => setSelectedVillageId(v.id)}
            className={`grid-cell text-left transition-colors ${
              selectedVillageId === v.id ? "bg-foreground text-background" : "hover:bg-secondary"
            }`}
          >
            <p className={`font-display text-[10px] font-semibold tracking-wider ${selectedVillageId === v.id ? "text-background/70" : "text-muted-foreground"}`}>{v.id.substring(0, 8)}</p>
            <p className={`font-display text-sm font-bold ${selectedVillageId === v.id ? "text-background" : "text-foreground"}`}>{v.name}</p>
            <p className={`text-[10px] font-body mt-1 ${selectedVillageId === v.id ? "text-background/60" : "text-muted-foreground"}`}>
              {v.population ? `Pop: ${v.population.toLocaleString()}` : "No pop data"}
            </p>
          </button>
        ))}
      </div>

      {/* Village Stats Detail */}
      <div className="flex-1 overflow-y-auto bg-background p-4">
        {isLoadingDetail ? (
          <div className="text-muted-foreground font-display">Loading details...</div>
        ) : villageDetail ? (
          <div className="max-w-4xl border border-border">
            <div className="grid-cell bg-secondary/20">
              <h2 className="font-display text-xl font-bold text-foreground">{villageDetail.name} Details</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { label: "Gram Panchayat", value: villageDetail.gramPanchayat || "N/A" },
                { label: "Villages in GP", value: villageDetail.villagesInGramPanchayat || "0" },
                { label: "Population", value: (villageDetail.population || 0).toLocaleString() },
                { label: "Households", value: (villageDetail.households || 0).toLocaleString() },
                { label: "Approx Area", value: villageDetail.approxArea ? `${villageDetail.approxArea} sq km` : "N/A" },
                { label: "Agri Land", value: villageDetail.agriLand ? `${villageDetail.agriLand} sq km` : "N/A" },
                { label: "Taluka", value: villageDetail.taluka?.name || "N/A" },
                { label: "District", value: villageDetail.taluka?.district?.name || "N/A" },
              ].map((stat) => (
                <div key={stat.label} className="grid-cell">
                  <p className="kpi-label">{stat.label}</p>
                  <p className="font-display text-base font-medium mt-1 text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground font-display">Select a village to view demographic details.</div>
        )}
      </div>
    </div>
  );
}
