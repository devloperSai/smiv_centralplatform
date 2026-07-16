import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MapPin, BarChart3, Cpu, PenSquare, Map, Settings, ChevronLeft, ChevronRight, Database
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Villages", icon: MapPin, path: "/villages" },
  { label: "IoT Use Cases", icon: Cpu, path: "/iot" },
  { label: "Non-IoT Cases", icon: PenSquare, path: "/non-iot" },
  { label: "Use Case Admin", icon: Database, path: "/use-cases" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Map View", icon: Map, path: "/map" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`shrink-0 border-r border-border bg-background flex flex-col transition-all duration-200 ${
        collapsed ? "w-14" : "w-52"
      }`}
    >
      {/* Logo */}
      <div className="grid-cell flex items-center justify-between border-b border-border">
        {!collapsed && (
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            VoICET
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left border-b border-border transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon size={14} className="shrink-0" />
              {!collapsed && (
                <span className="font-body text-xs font-medium tracking-wide">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="grid-cell border-t border-border">
          <p className="text-[9px] text-muted-foreground font-body uppercase tracking-widest">
            Smart Village Panel v1.0
          </p>
        </div>
      )}
    </div>
  );
}
