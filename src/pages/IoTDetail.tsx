import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUseCaseDetails, useUseCaseEntities } from "@/hooks/useUseCase";

const roleColors: Record<string, string> = {
  earth: "hsl(16, 63%, 49%)",
  infra: "hsl(224, 76%, 48%)",
  alert: "hsl(48, 96%, 53%)",
};

export default function IoTDetail() {
  const { id } = useParams(); // assignmentId
  const navigate = useNavigate();

  const { data: res, isLoading } = useUseCaseDetails(id);
  const uc = res?.data;

  const { data: entRes, isLoading: isLoadingEnt } = useUseCaseEntities(id);
  const entities = entRes?.data?.data_list || [];
  const pageTitle = entRes?.data?.pageTitle || "Entities";

  if (isLoading || isLoadingEnt) {
    return <div className="p-4 text-foreground font-display">Loading details...</div>;
  }

  if (!uc) return <div className="grid-cell">Use case not found</div>;

  const name = uc.useCaseName;
  const description = uc.description || "";
  const displayId = uc.useCaseId;
  const kpis = uc.stats || [];
  const dashboardImage = uc.dashboardImageUrl;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="border-b border-border px-4 py-3">
        <div className="flex items-start gap-4">
          <button onClick={() => navigate("/iot")} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <h1 className="font-display text-lg font-bold text-foreground">{name}</h1>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{description}</p>
          </div>
          {dashboardImage && (
            <div className="w-32 h-20 rounded overflow-hidden shrink-0 hidden md:block">
              <img src={dashboardImage} alt={name} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi: any) => (
          <div key={kpi.name} className="grid-cell">
            <p className="kpi-label">{kpi.name}</p>
            <p className="kpi-value mt-1">
              {kpi.value}
              {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Entity Table */}
      {entities.length > 0 && (
        <div className="grid-cell">
          <p className="kpi-label mb-2">{pageTitle} · {entities.length}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-display">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1.5 text-muted-foreground font-medium">ID</th>
                  <th className="text-left py-1.5 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-1.5 text-muted-foreground font-medium">Location</th>
                  <th className="text-right py-1.5 text-muted-foreground font-medium">Lat</th>
                  <th className="text-right py-1.5 text-muted-foreground font-medium">Lng</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((ent: any) => (
                  <tr key={ent.id} className="border-b border-border last:border-0">
                    <td className="py-1.5 text-foreground font-medium">{ent.id.substring(0, 8)}</td>
                    <td className="py-1.5 text-foreground">{ent.name}</td>
                    <td className="py-1.5 text-muted-foreground">{ent.location}</td>
                    <td className="py-1.5 text-right">{parseFloat(ent.latitude).toFixed(4)}</td>
                    <td className="py-1.5 text-right">{parseFloat(ent.longitude).toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
