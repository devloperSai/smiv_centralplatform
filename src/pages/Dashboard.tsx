import { useNavigate } from "react-router-dom";
import { useVillageStats, useAssignmentStats } from "../hooks/useDashboard";
import { useVillageContext } from "../context/VillageContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectedVillageId, setSelectedVillageId, villages: villagesList, isLoading: isLoadingVillages } = useVillageContext();

  const { data: villageStatsRes, isLoading: isLoadingVillageStats } = useVillageStats(selectedVillageId);
  const { data: assignmentStatsRes, isLoading: isLoadingAssignStats } = useAssignmentStats(selectedVillageId);

  const villageStats = villageStatsRes?.data;
  const assignmentStats = assignmentStatsRes?.data;
  const valUseCases = villageStats?.total_use_cases ?? 0;
  const valActiveDevices = villageStats?.total_devices ?? 0;
  const valSensorsOnline = villageStats?.device_active ?? 0;
  const valAlerts = villageStats?.device_inactive ?? 0;
  const iotUseCasesList = assignmentStats?.iot_use_cases || [];
  const nonIotUseCasesList = assignmentStats?.non_iot_use_cases || [];

  const isLoading = isLoadingVillages || isLoadingVillageStats || isLoadingAssignStats;

  if (isLoading) {
    return <div className="p-4 text-foreground font-display">Loading dashboard...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-base font-bold text-foreground tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            Smart Intelligent Village · {villagesList.length} active villages · {valUseCases} use cases
          </p>
        </div>
      </header>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-7">
        {[
          { label: "Total Use Cases", value: valUseCases },
          { label: "Total Devices", value: valActiveDevices },
          { label: "Active Devices", value: valSensorsOnline },
          { label: "In-Active Devices", value: valAlerts, isAlert: true }
        ].map((card) => (
          <div key={card.label} className="grid-cell">
            <p className="kpi-label">{card.label}</p>
            <p className={`font-display text-xl font-bold ${card.isAlert ? "text-alert" : "text-foreground"}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* IoT / Non-IoT Split */}
      <div className="grid grid-cols-2">
        <div className="grid-cell">
          <div className="flex items-baseline justify-between mb-2">
            <p className="kpi-label">IoT Use Cases · {iotUseCasesList.length}</p>
            <button
              onClick={() => navigate("/iot")}
              className="text-[10px] font-display font-medium tracking-wider text-infra hover:underline"
            >
              VIEW ALL →
            </button>
          </div>
          <div className="space-y-1">
            {iotUseCasesList.slice(0, 6).map((uc: any) => (
              <button
                key={uc.use_case_id}
                onClick={() => navigate(`/iot/${uc.assignment_id}`)}
                className="w-full flex items-baseline justify-between py-1 border-b border-border last:border-0 hover:bg-secondary px-1 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="status-active" />
                  <span className="font-body text-xs text-foreground truncate max-w-[200px]">{uc.use_case_name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{uc.number_of_entities} devices</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid-cell">
          <div className="flex items-baseline justify-between mb-2">
            <p className="kpi-label">Non-IoT Use Cases · {nonIotUseCasesList.length}</p>
            <button
              onClick={() => navigate("/non-iot")}
              className="text-[10px] font-display font-medium tracking-wider text-earth hover:underline"
            >
              VIEW ALL →
            </button>
          </div>
          <div className="space-y-1">
            {nonIotUseCasesList.slice(0, 6).map((uc: any) => (
              <button
                key={uc.use_case_id}
                onClick={() => navigate(`/non-iot/${uc.use_case_id}`)}
                className="w-full flex items-baseline justify-between py-1 border-b border-border last:border-0 hover:bg-secondary px-1 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-earth" />
                  <span className="font-body text-xs text-foreground truncate max-w-[200px]">{uc.use_case_name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{uc.number_of_entities} records</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Village Overview */}
      <div className="grid-cell">
        <div className="flex items-baseline justify-between mb-2">
          <p className="kpi-label">Villages · {villagesList.length}</p>
          <button
            onClick={() => navigate("/villages")}
            className="text-[10px] font-display font-medium tracking-wider text-infra hover:underline"
          >
            VIEW ALL →
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {villagesList.map((v: any) => (
          <button
            key={v.id}
            onClick={() => setSelectedVillageId(v.id)}
            className={`grid-cell text-left hover:bg-secondary transition-colors ${selectedVillageId === v.id ? 'border border-foreground' : 'border border-transparent'}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {v.inactive === 0 ? <span className="status-active" /> : <span className="inline-block w-2 h-2 bg-alert rounded-full" />}
              <span className="font-display text-[10px] text-muted-foreground">{v.id.substring(0, 8)}</span>
            </div>
            <p className="font-display text-sm font-bold text-foreground">{v.name}</p>
            <p className="text-[10px] text-muted-foreground font-body">
              {v.district || 'Nagpur'} · Pop. {v.population?.toLocaleString() || 0}
            </p>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div>
                <p className="text-[9px] text-muted-foreground uppercase">Devices</p>
                <p className="font-display text-xs font-semibold">{v.total_device || 0}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground uppercase">Active</p>
                <p className="font-display text-xs font-semibold">{v.active || 0}</p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground uppercase">Alerts</p>
                <p className="font-display text-xs font-semibold text-alert">{v.inactive || 0}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
