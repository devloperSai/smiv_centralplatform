import { useState, useMemo } from "react";
import { useVillageContext } from "@/context/VillageContext";
import { useVillageCoordinates } from "@/hooks/useUseCase";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to auto-fit bounds
function MapBoundsUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useMemo(() => {
    if (bounds && (bounds as any).length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export default function MapView() {
  const { selectedVillageId } = useVillageContext();
  const { data: res, isLoading } = useVillageCoordinates(selectedVillageId);
  
  const allDevices = res?.data || [];
  const [filter, setFilter] = useState<string>("all");
  
  const useCaseNames = [...new Set(allDevices.map((d: any) => d.usecase_name).filter(Boolean))];
  const filtered = filter === "all" ? allDevices : allDevices.filter((d: any) => d.usecase_name === filter);

  // Calculate bounds for positioning
  const validDevices = filtered.filter((d: any) => d.lat && d.lon && !isNaN(parseFloat(d.lat)) && !isNaN(parseFloat(d.lon)));
  const bounds = validDevices.map((d: any) => [parseFloat(d.lat), parseFloat(d.lon)] as [number, number]);
  const defaultCenter: [number, number] = bounds.length > 0 ? bounds[0] : [20.5937, 78.9629]; // Default to India if no data

  if (isLoading) {
    return <div className="p-4 text-foreground font-display">Loading map data...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="border-b border-border px-4 py-3 flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-base font-bold text-foreground">Map View</h1>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {filtered.length} devices · GPS coordinates
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-background border border-border px-3 py-1.5 text-xs font-body text-foreground focus:outline-none focus:border-foreground"
        >
          <option value="all">All Use Cases</option>
          {useCaseNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </header>

      {/* Leaflet Map */}
      <div className="grid-cell p-0 overflow-hidden relative">
        <div style={{ height: "500px", width: "100%" }}>
          <MapContainer center={defaultCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {bounds.length > 0 && <MapBoundsUpdater bounds={bounds} />}
            {validDevices.map((d: any, index: number) => {
              const lat = parseFloat(d.lat);
              const lon = parseFloat(d.lon);
              return (
                <Marker key={`${d.device_name}-${index}`} position={[lat, lon]}>
                  <Popup>
                    <div className="font-display">
                      <p className="font-bold text-sm">{d.device_name}</p>
                      <p className="text-xs text-muted-foreground">{d.usecase_name}</p>
                      <p className="text-[10px] mt-1">{lat.toFixed(4)}, {lon.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Device Table */}
      <div className="grid-cell">
        <p className="kpi-label mb-2">All Devices — {filtered.length}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-display">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-1.5 text-muted-foreground font-medium">Device Name</th>
                <th className="text-left py-1.5 text-muted-foreground font-medium">Use Case</th>
                <th className="text-left py-1.5 text-muted-foreground font-medium">Location</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Lat</th>
                <th className="text-right py-1.5 text-muted-foreground font-medium">Lng</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d: any, index: number) => {
                const lat = parseFloat(d.lat);
                const lon = parseFloat(d.lon);
                return (
                  <tr key={`${d.device_name}-${index}`} className="border-b border-border last:border-0">
                    <td className="py-1.5 font-medium text-foreground">{d.device_name || 'N/A'}</td>
                    <td className="py-1.5 text-foreground">{d.usecase_name}</td>
                    <td className="py-1.5 text-foreground">{d.location || '—'}</td>
                    <td className="py-1.5 text-right">{!isNaN(lat) ? lat.toFixed(4) : '—'}</td>
                    <td className="py-1.5 text-right">{!isNaN(lon) ? lon.toFixed(4) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
