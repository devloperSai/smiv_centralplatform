import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { VillageProvider, useVillageContext } from "@/context/VillageContext";

function GlobalHeader() {
  const { selectedVillageId, setSelectedVillageId, villages, isLoading } = useVillageContext();

  return (
    <header className="border-b border-border bg-background px-4 py-2 flex items-center justify-between z-10 sticky top-0">
      <div className="font-display font-bold text-sm tracking-widest text-foreground">
        COMMAND CENTER
      </div>
      <div>
        {isLoading ? (
          <span className="text-xs text-muted-foreground">Loading villages...</span>
        ) : (
          <select 
            className="bg-secondary border border-border text-sm p-1.5 text-foreground focus:outline-none focus:border-foreground min-w-[200px]"
            value={selectedVillageId || ''}
            onChange={(e) => setSelectedVillageId(e.target.value)}
          >
            {villages.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        )}
      </div>
    </header>
  );
}

export default function DashboardLayout() {
  return (
    <VillageProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          <GlobalHeader />
          <Outlet />
        </div>
      </div>
    </VillageProvider>
  );
}
