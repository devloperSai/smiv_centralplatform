import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nonIoTUseCases } from "@/data/mock-data";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useUseCaseDetails, useUseCaseEntities } from "@/hooks/useUseCase";

export default function NonIoTDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: res, isLoading } = useUseCaseDetails(id);
  const ucAPI = res?.data;

  const { data: entRes, isLoading: isLoadingEnt } = useUseCaseEntities(id);
  const entities = entRes?.data?.data_list || [];
  const pageTitle = entRes?.data?.pageTitle || "Entities";

  const ucMock = nonIoTUseCases.find((u) => u.id === id);
  const uc = ucAPI || ucMock;

  // Safe property resolution
  const name = uc?.useCaseName || uc?.name || "";
  const description = uc?.description || uc?.useCaseDescription || "";
  const displayId = uc?.useCaseId || id;
  const editableFields = uc?.editableFields || [];
  const history = uc?.history || [];
  const kpis = uc?.stats || uc?.kpis || [];
  const dashboardImage = uc?.dashboardImageUrl;

  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editableFields.length > 0 && Object.keys(formData).length === 0) {
      const initial: Record<string, string> = {};
      editableFields.forEach((f: any) => (initial[f.key] = ""));
      setFormData(initial);
    }
  }, [editableFields, formData]);

  if (isLoading || isLoadingEnt) {
    return <div className="p-4 text-foreground font-display">Loading details...</div>;
  }

  if (!uc) return <div className="grid-cell">Use case not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Data submitted for ${name}`);
    // Reset form
    const reset: Record<string, string> = {};
    editableFields.forEach((f: any) => (reset[f.key] = ""));
    setFormData(reset);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="border-b border-border px-4 py-3">
        <div className="flex items-start gap-4">
          <button onClick={() => navigate("/non-iot")} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
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
      <div className="grid grid-cols-3 lg:grid-cols-5">
        {kpis.map((kpi: any) => (
          <div key={kpi.name || kpi.label} className="grid-cell">
            <p className="kpi-label">{kpi.name || kpi.label}</p>
            <p className="kpi-value mt-1">
              {kpi.value}
              {kpi.unit && <span className="text-sm text-muted-foreground ml-1">{kpi.unit}</span>}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2">
        {/* Data Entry Form */}
        <div className="grid-cell">
          <p className="kpi-label mb-3">Submit New Data</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {editableFields.map((field: any) => (
              <div key={field.key}>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-body block mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={formData[field.key] || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full bg-background border border-border px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-foreground transition-colors"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-foreground text-background font-display text-xs font-medium py-2.5 hover:bg-foreground/90 transition-colors tracking-wider mt-2"
            >
              SUBMIT DATA
            </button>
          </form>
        </div>
      </div>

      {/* Entity Table */}
      {entities.length > 0 && (
        <div className="grid-cell mt-px">
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
