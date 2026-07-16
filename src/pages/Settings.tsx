export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <header className="border-b border-border px-4 py-3">
        <h1 className="font-display text-base font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground font-body mt-0.5">System configuration</p>
      </header>

      <div className="grid grid-cols-2">
        <div className="grid-cell">
          <p className="kpi-label mb-3">System Information</p>
          {[
            { label: "Version", value: "1.0.0" },
            { label: "Data Mode", value: "Mock Data" },
            { label: "API Status", value: "Simulated" },
            { label: "Last Sync", value: "2026-03-10 09:30" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground font-body">{item.label}</span>
              <span className="font-display text-xs font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="grid-cell">
          <p className="kpi-label mb-3">Villages Registered</p>
          <p className="font-display text-2xl font-bold text-foreground">4</p>
          <p className="text-xs text-muted-foreground font-body mt-1">3 active · 1 inactive</p>
        </div>
      </div>
    </div>
  );
}
