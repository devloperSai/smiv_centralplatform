// ===== TYPES =====
export type UseCaseCategory = "IoT" | "Non-IoT";
export type DataRole = "earth" | "infra" | "alert";

export interface SensorDevice {
  id: string;
  label: string;
  lat: number;
  lng: number;
  status: "online" | "offline" | "alert";
  metrics: Record<string, number | string>;
}

export interface UseCaseModel {
  id: string;
  name: string;
  provider: string;
  category: UseCaseCategory;
  subCategory: string;
  dataRole: DataRole;
  description: string;
  kpis: { label: string; value: string | number; unit?: string }[];
  sparkline: number[];
  devices: SensorDevice[];
  chartLabels: string[];
}

export interface VillageDataModel {
  id: string;
  name: string;
  district: string;
  state: string;
  population: number;
  status: "active" | "inactive";
  activeCases: string[];
  totalDevices: number;
  activeSensors: number;
  inactiveSensors: number;
  alerts: number;
  uptimePercent: number;
}

export interface NonIoTRecord {
  id: string;
  date: string;
  data: Record<string, string | number>;
  submittedBy: string;
}

// ===== HELPER =====
export const generateTimeSeriesData = (labels: string[], count: number = 7) => {
  return Array.from({ length: count }, (_, i) => {
    const point: Record<string, number | string> = {
      day: count <= 24 ? `${String(i).padStart(2, "0")}:00` : `Day ${i + 1}`,
    };
    labels.forEach((label) => {
      point[label] = Math.round(Math.random() * 100);
    });
    return point;
  });
};

// ===== IOT USE CASES =====
export const useCases: UseCaseModel[] = [
  {
    id: "UC001",
    name: "Smart Kheti",
    provider: "INVAS",
    category: "IoT",
    subCategory: "Agriculture",
    dataRole: "earth",
    description:
      "Smart agriculture monitoring system tracking soil health, pump systems, and energy across multiple farms.",
    kpis: [
      { label: "Nitrogen", value: 42, unit: "mg/kg" },
      { label: "Phosphorus", value: 38, unit: "mg/kg" },
      { label: "Potassium", value: 156, unit: "mg/kg" },
      { label: "Soil Moisture", value: 67, unit: "%" },
      { label: "Temperature", value: 28, unit: "°C" },
      { label: "Pump Hours", value: 6.2, unit: "hrs" },
      { label: "Energy", value: 14.5, unit: "kWh" },
    ],
    sparkline: [
      42, 45, 41, 48, 44, 46, 43, 47, 42, 45, 44, 43, 46, 48, 42, 44, 45, 43,
      47, 46, 44, 43, 45, 42, 48, 44, 46, 43, 45, 47,
    ],
    chartLabels: ["Soil Moisture", "Temperature"],
    devices: [
      {
        id: "F001",
        label: "Farm A — Sensor Hub",
        lat: 19.8762,
        lng: 75.3433,
        status: "online",
        metrics: { Nitrogen: 42, Moisture: 68, Temp: 28 },
      },
      {
        id: "F002",
        label: "Farm B — Sensor Hub",
        lat: 19.878,
        lng: 75.345,
        status: "online",
        metrics: { Nitrogen: 39, Moisture: 71, Temp: 27 },
      },
      {
        id: "F003",
        label: "Farm C — Pump Station",
        lat: 19.8745,
        lng: 75.341,
        status: "online",
        metrics: { Nitrogen: 45, Moisture: 62, Temp: 29 },
      },
      {
        id: "F004",
        label: "Farm D — Sensor Hub",
        lat: 19.879,
        lng: 75.3465,
        status: "offline",
        metrics: { Nitrogen: 0, Moisture: 0, Temp: 0 },
      },
      {
        id: "F005",
        label: "Farm E — Sensor Hub",
        lat: 19.873,
        lng: 75.3395,
        status: "online",
        metrics: { Nitrogen: 44, Moisture: 65, Temp: 28 },
      },
    ],
  },
  {
    id: "UC002",
    name: "Smart Pond",
    provider: "AquaTech",
    category: "IoT",
    subCategory: "Agriculture",
    dataRole: "earth",
    description:
      "Fish pond monitoring system tracking water quality, dissolved oxygen, and aerator performance.",
    kpis: [
      { label: "Water Temp", value: 26.4, unit: "°C" },
      { label: "Dissolved O₂", value: 6.8, unit: "mg/L" },
      { label: "Aerator Hours", value: 18.5, unit: "hrs" },
      { label: "pH Level", value: 7.2 },
      { label: "Turbidity", value: 12, unit: "NTU" },
    ],
    sparkline: [
      7.1, 7.3, 7.2, 7.0, 7.4, 7.2, 7.1, 7.3, 7.2, 7.4, 7.1, 7.0, 7.3, 7.2, 7.1,
      7.4, 7.2, 7.3, 7.0, 7.1, 7.2, 7.4, 7.3, 7.1, 7.2, 7.0, 7.3, 7.4, 7.2, 7.1,
    ],
    chartLabels: ["Dissolved O₂", "Water Temp"],
    devices: [
      {
        id: "POND-O2-01",
        label: "Oxygen Sensor A",
        lat: 19.8758,
        lng: 75.3428,
        status: "online",
        metrics: { "Dissolved O₂": 6.8, Temp: 26.4 },
      },
      {
        id: "POND-T-01",
        label: "Temperature Sensor A",
        lat: 19.876,
        lng: 75.343,
        status: "online",
        metrics: { Temp: 26.4 },
      },
      {
        id: "POND-AER-01",
        label: "Aerator Controller",
        lat: 19.8756,
        lng: 75.3425,
        status: "online",
        metrics: { "Aerator Hrs": 18.5, Status: "ON" },
      },
    ],
  },
  {
    id: "UC003",
    name: "Climate Smart Agri",
    provider: "TerraView",
    category: "IoT",
    subCategory: "Agriculture",
    dataRole: "earth",
    description:
      "Tracks GHG emissions, water consumption, solar adoption, and bio-fertilizer usage across crops.",
    kpis: [
      { label: "GHG Emission", value: 4.2, unit: "tCO₂" },
      { label: "Water Usage", value: 2400, unit: "L/day" },
      { label: "Solar Adoption", value: 68, unit: "%" },
      { label: "Bio-Fertilizer", value: 340, unit: "kg" },
    ],
    sparkline: [
      4.2, 4.1, 4.3, 4.0, 4.4, 4.2, 4.1, 4.3, 4.2, 4.0, 4.4, 4.1, 4.2, 4.3, 4.0,
      4.2, 4.1, 4.4, 4.3, 4.2, 4.0, 4.1, 4.3, 4.4, 4.2, 4.1, 4.0, 4.3, 4.2, 4.4,
    ],
    chartLabels: ["GHG Emission", "Water Usage"],
    devices: [
      {
        id: "CROP-RICE",
        label: "Rice Field Monitor",
        lat: 19.877,
        lng: 75.344,
        status: "online",
        metrics: { GHG: 1.8, Water: 800 },
      },
      {
        id: "CROP-COTTON",
        label: "Cotton Field Monitor",
        lat: 19.8775,
        lng: 75.3445,
        status: "online",
        metrics: { GHG: 0.9, Water: 600 },
      },
      {
        id: "CROP-WHEAT",
        label: "Wheat Field Monitor",
        lat: 19.8768,
        lng: 75.3438,
        status: "online",
        metrics: { GHG: 0.8, Water: 500 },
      },
      {
        id: "CROP-BRINJAL",
        label: "Brinjal Field Monitor",
        lat: 19.8765,
        lng: 75.3435,
        status: "online",
        metrics: { GHG: 0.4, Water: 300 },
      },
      {
        id: "CROP-SARSON",
        label: "Sarson Field Monitor",
        lat: 19.8772,
        lng: 75.3442,
        status: "alert",
        metrics: { GHG: 0.3, Water: 200 },
      },
    ],
  },
  {
    id: "UC004",
    name: "Agri Drone",
    provider: "Optimus Logic",
    category: "IoT",
    subCategory: "Agriculture",
    dataRole: "earth",
    description:
      "Agriculture drone monitoring — flight hours, spray coverage, and battery health tracking.",
    kpis: [
      { label: "Flight Hours", value: 126, unit: "hrs" },
      { label: "Acres Sprayed", value: 9.6, unit: "acres" },
      { label: "Battery", value: 84, unit: "%" },
    ],
    sparkline: [
      8, 12, 9, 15, 11, 10, 14, 9, 13, 11, 10, 12, 8, 14, 11, 9, 13, 10, 12, 15,
      11, 9, 14, 10, 13, 12, 8, 11, 15, 10,
    ],
    chartLabels: ["Flight Hours", "Acres Sprayed"],
    devices: [
      {
        id: "DRONE-01",
        label: "Drone Alpha",
        lat: 19.8762,
        lng: 75.3433,
        status: "online",
        metrics: { Battery: 84, "Hours Today": 2.4 },
      },
      {
        id: "DRONE-02",
        label: "Drone Beta",
        lat: 19.878,
        lng: 75.345,
        status: "online",
        metrics: { Battery: 72, "Hours Today": 1.8 },
      },
    ],
  },
  {
    id: "UC005",
    name: "Smart Cattle",
    provider: "AgriSense",
    category: "IoT",
    subCategory: "Agriculture",
    dataRole: "earth",
    description:
      "Monitors cattle health using sensor belts — body temperature, heart rate, activity, and heat alerts.",
    kpis: [
      { label: "Cattle Count", value: 284 },
      { label: "Body Temp (avg)", value: 38.6, unit: "°C" },
      { label: "Heart Rate (avg)", value: 72, unit: "bpm" },
      { label: "Activity Level", value: "Normal" },
      { label: "Heat Alerts", value: 3 },
      { label: "Health Alerts", value: 5 },
    ],
    sparkline: [
      284, 282, 285, 283, 286, 284, 282, 285, 283, 284, 286, 282, 284, 285, 283,
      284, 282, 286, 285, 284, 283, 282, 285, 286, 284, 282, 283, 285, 284, 286,
    ],
    chartLabels: ["Body Temp", "Heart Rate"],
    devices: [
      {
        id: "BELT001",
        label: "Belt 001 — Cow A",
        lat: 19.8755,
        lng: 75.342,
        status: "online",
        metrics: { Temp: 38.5, HR: 70, Activity: "High" },
      },
      {
        id: "BELT002",
        label: "Belt 002 — Cow B",
        lat: 19.8758,
        lng: 75.3425,
        status: "online",
        metrics: { Temp: 38.8, HR: 74, Activity: "Normal" },
      },
      {
        id: "BELT003",
        label: "Belt 003 — Cow C",
        lat: 19.876,
        lng: 75.343,
        status: "alert",
        metrics: { Temp: 39.4, HR: 82, Activity: "Low" },
      },
    ],
  },
  {
    id: "UC006",
    name: "Smart Street Light",
    provider: "LumiGrid",
    category: "IoT",
    subCategory: "Infrastructure",
    dataRole: "infra",
    description:
      "Solar smart street lights — monitoring light status, battery, energy consumption, and luminance hours.",
    kpis: [
      { label: "Lights ON", value: 8 },
      { label: "Lights OFF", value: 2 },
      { label: "Battery Charging", value: 6 },
      { label: "Battery Discharging", value: 4 },
      { label: "Energy Today", value: 14.5, unit: "kWh" },
      { label: "Lumen Hours", value: 82, unit: "hrs" },
    ],
    sparkline: [
      156, 154, 155, 156, 153, 156, 155, 154, 156, 155, 153, 156, 154, 155, 156,
      153, 156, 155, 154, 156, 155, 153, 156, 154, 155, 156, 153, 156, 155, 154,
    ],
    chartLabels: ["Energy Consumption", "Battery Level"],
    devices: Array.from({ length: 10 }, (_, i) => ({
      id: `SL${String(i + 1).padStart(3, "0")}`,
      label: `Street Light ${i + 1}`,
      lat: 19.875 + Math.random() * 0.005,
      lng: 75.341 + Math.random() * 0.005,
      status: (i < 8 ? "online" : "offline") as "online" | "offline",
      metrics: {
        Battery: Math.round(60 + Math.random() * 40),
        Status: i < 8 ? "ON" : "OFF",
        Current: (0.8 + Math.random() * 0.4).toFixed(1) + "A",
      },
    })),
  },
  {
    id: "UC009",
    name: "WiFi CCTV",
    provider: "SecureVision",
    category: "IoT",
    subCategory: "Safety",
    dataRole: "infra",
    description:
      "WiFi-enabled CCTV surveillance — bandwidth, storage health, and camera status monitoring.",
    kpis: [
      { label: "Cameras", value: 24 },
      { label: "Storage Health", value: 98, unit: "%" },
      { label: "Bandwidth", value: 340, unit: "Mbps" },
      { label: "Online", value: 22 },
      { label: "Offline", value: 2 },
    ],
    sparkline: [
      98, 97, 99, 96, 98, 97, 99, 98, 96, 97, 99, 98, 97, 96, 99, 98, 97, 99,
      96, 98, 97, 99, 98, 96, 97, 99, 98, 97, 96, 99,
    ],
    chartLabels: ["Bandwidth", "Storage"],
    devices: Array.from({ length: 6 }, (_, i) => ({
      id: `CAM${String(i + 1).padStart(3, "0")}`,
      label: `Camera ${i + 1} — ${["Gate", "Market", "School", "Temple", "Panchayat", "Well"][i]}`,
      lat: 19.875 + Math.random() * 0.006,
      lng: 75.341 + Math.random() * 0.006,
      status: (i < 5 ? "online" : "offline") as "online" | "offline",
      metrics: {
        Bandwidth: Math.round(40 + Math.random() * 20) + " Mbps",
        Storage: Math.round(90 + Math.random() * 10) + "%",
      },
    })),
  },
  {
    id: "UC010",
    name: "Water Management",
    provider: "HydroNet",
    category: "IoT",
    subCategory: "Infrastructure",
    dataRole: "infra",
    description:
      "Village water supply monitoring — flow rate, pH, motor runtime, and water quality alerts.",
    kpis: [
      { label: "Flow Rate", value: 450, unit: "L/min" },
      { label: "pH Level", value: 7.1 },
      { label: "Electricity", value: "Available" },
      { label: "Motor Runtime", value: 8.5, unit: "hrs" },
      { label: "Supply Duration", value: 6, unit: "hrs" },
      { label: "Quality Alerts", value: 0 },
    ],
    sparkline: [
      450, 445, 455, 440, 460, 450, 448, 452, 455, 445, 450, 458, 442, 450, 455,
      448, 452, 440, 460, 450, 445, 455, 448, 452, 450, 458, 442, 450, 455, 448,
    ],
    chartLabels: ["Flow Rate", "pH Level"],
    devices: [
      {
        id: "TANK001",
        label: "Main Water Tank",
        lat: 19.8762,
        lng: 75.3433,
        status: "online",
        metrics: { Flow: "450 L/min", pH: 7.1, Motor: "Running" },
      },
      {
        id: "TANK002",
        label: "Reserve Tank",
        lat: 19.877,
        lng: 75.3445,
        status: "online",
        metrics: { Flow: "220 L/min", pH: 7.0, Motor: "Idle" },
      },
    ],
  },
  {
    id: "UC011",
    name: "Public WiFi",
    provider: "NetBridge",
    category: "IoT",
    subCategory: "Connectivity",
    dataRole: "infra",
    description:
      "Village internet infrastructure — hotspot status, users, bandwidth, and data usage.",
    kpis: [
      { label: "Active Hotspots", value: 7 },
      { label: "Unique Users", value: 412 },
      { label: "Bandwidth", value: 850, unit: "Mbps" },
      { label: "Uptime", value: 99.1, unit: "%" },
      { label: "Data/User", value: 1.2, unit: "GB" },
    ],
    sparkline: [
      412, 405, 420, 410, 425, 412, 408, 418, 422, 410, 412, 420, 406, 412, 422,
      408, 418, 410, 425, 412, 406, 420, 411, 418, 412, 422, 406, 412, 420, 411,
    ],
    chartLabels: ["Unique Users", "Bandwidth"],
    devices: Array.from({ length: 8 }, (_, i) => ({
      id: `WF${String(i + 1).padStart(3, "0")}`,
      label: `Hotspot ${i + 1} — ${["Village Center", "School", "Market", "Temple", "Hospital", "Panchayat", "Bus Stop", "Library"][i]}`,
      lat: 19.8748 + Math.random() * 0.008,
      lng: 75.3408 + Math.random() * 0.008,
      status: (i < 7 ? "online" : "offline") as "online" | "offline",
      metrics: {
        Users: Math.round(30 + Math.random() * 80),
        Bandwidth: Math.round(80 + Math.random() * 40) + " Mbps",
        Uptime: (98 + Math.random() * 2).toFixed(1) + "%",
      },
    })),
  },
  // Additional IoT
  {
    id: "UC012",
    name: "CNOC",
    provider: "NetOps",
    category: "IoT",
    subCategory: "Connectivity",
    dataRole: "infra",
    description:
      "Central Network Operations Center — sync rate, resolution time, secure uptime.",
    kpis: [
      { label: "Sync Rate", value: 99.2, unit: "%" },
      { label: "Avg Resolve", value: 4.2, unit: "min" },
      { label: "Uptime", value: 99.8, unit: "%" },
    ],
    sparkline: [
      99.2, 99.1, 99.3, 99.0, 99.4, 99.2, 99.1, 99.3, 99.2, 99.0, 99.4, 99.1,
      99.2, 99.3, 99.0, 99.2, 99.1, 99.4, 99.3, 99.2, 99.0, 99.1, 99.3, 99.4,
      99.2, 99.1, 99.0, 99.3, 99.2, 99.4,
    ],
    chartLabels: ["Sync Rate", "Uptime"],
    devices: [],
  },
  {
    id: "UC020",
    name: "Solar Grid",
    provider: "SunVolt",
    category: "IoT",
    subCategory: "Energy",
    dataRole: "earth",
    description:
      "Solar energy grid — generation, grid feed, and panel health monitoring.",
    kpis: [
      { label: "Generation", value: 48, unit: "kWh" },
      { label: "Grid Feed", value: 12, unit: "kWh" },
      { label: "Panels OK", value: 36 },
    ],
    sparkline: [
      48, 45, 50, 42, 52, 48, 46, 49, 51, 45, 48, 50, 44, 48, 51, 46, 49, 42,
      52, 48, 44, 50, 47, 49, 48, 51, 44, 48, 50, 47,
    ],
    chartLabels: ["Generation", "Grid Feed"],
    devices: [],
  },
  {
    id: "UC024",
    name: "Disaster Alert",
    provider: "AlertSys",
    category: "IoT",
    subCategory: "Safety",
    dataRole: "alert",
    description:
      "Environmental disaster alert system — flood, earthquake, and fire early warning sensors.",
    kpis: [
      { label: "Sensors Active", value: 18 },
      { label: "Alerts (24h)", value: 0 },
      { label: "Coverage", value: 96, unit: "%" },
    ],
    sparkline: [
      0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0,
    ],
    chartLabels: ["Alerts", "Sensor Coverage"],
    devices: [],
  },
];

// ===== NON-IOT USE CASES =====
export interface NonIoTUseCase {
  id: string;
  name: string;
  provider: string;
  subCategory: string;
  dataRole: DataRole;
  description: string;
  kpis: { label: string; value: string | number; unit?: string }[];
  editableFields: {
    key: string;
    label: string;
    type: "number" | "text" | "date";
  }[];
  history: NonIoTRecord[];
  devices: SensorDevice[];
}

export const nonIoTUseCases: NonIoTUseCase[] = [
  {
    id: "UC007",
    name: "Smart Anganwadi",
    provider: "EduPulse",
    subCategory: "Education",
    dataRole: "infra",
    description:
      "Anganwadi monitoring — student attendance, staff, video lessons, and projector usage.",
    kpis: [
      { label: "Students", value: 45 },
      { label: "Staff", value: 4 },
      { label: "Video Lessons", value: 12 },
      { label: "Lesson Hours", value: 6.5, unit: "hrs" },
      { label: "Projector Usage", value: 4.2, unit: "hrs" },
    ],
    editableFields: [
      { key: "student_count", label: "Student Count", type: "number" },
      { key: "staff_count", label: "Staff Count", type: "number" },
      {
        key: "video_lesson_count",
        label: "Video Lessons Played",
        type: "number",
      },
      { key: "video_lesson_hour", label: "Video Lesson Hours", type: "number" },
      {
        key: "projector_count",
        label: "Projector Usage Hours",
        type: "number",
      },
      {
        key: "log_available_day_count",
        label: "Log Available Days",
        type: "number",
      },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { attendance: 42, lessonsPlayed: 3, projectorHrs: 2.5 },
        submittedBy: "Operator A",
      },
      {
        id: "R002",
        date: "2026-03-08",
        data: { attendance: 38, lessonsPlayed: 4, projectorHrs: 3.0 },
        submittedBy: "Operator A",
      },
      {
        id: "R003",
        date: "2026-03-07",
        data: { attendance: 44, lessonsPlayed: 2, projectorHrs: 1.5 },
        submittedBy: "Operator B",
      },
    ],
    devices: [],
  },
  {
    id: "UC008",
    name: "Healthcare",
    provider: "MedConnect",
    subCategory: "Healthcare",
    dataRole: "infra",
    description:
      "Healthcare center — patient footfall, appointments, telemedicine, and doctor availability.",
    kpis: [
      { label: "Patients Today", value: 47 },
      { label: "Male", value: 28 },
      { label: "Female", value: 19 },
      { label: "Telemedicine", value: 8 },
      { label: "Doctor Avail.", value: "Yes" },
    ],
    editableFields: [
      { key: "patient_footfall", label: "Patient Footfall", type: "number" },
      { key: "male_patients", label: "Male Patients", type: "number" },
      { key: "female_patients", label: "Female Patients", type: "number" },
      {
        key: "total_tests_offered",
        label: "Total Tests Offered",
        type: "number",
      },
      { key: "tests_completed", label: "Tests Completed", type: "number" },
      {
        key: "system_downtime",
        label: "System Downtime (hrs)",
        type: "number",
      },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: {
          patientCount: 47,
          maleCount: 28,
          femaleCount: 19,
          teleconsults: 8,
        },
        submittedBy: "Dr. Sharma",
      },
      {
        id: "R002",
        date: "2026-03-08",
        data: {
          patientCount: 52,
          maleCount: 30,
          femaleCount: 22,
          teleconsults: 6,
        },
        submittedBy: "Dr. Sharma",
      },
    ],
    devices: [],
  },
  {
    id: "UC013",
    name: "Smart School",
    provider: "EduPulse",
    subCategory: "Education",
    dataRole: "infra",
    description:
      "Smart school monitoring — students, staff, video lessons, and classroom session tracking.",
    kpis: [
      { label: "Students", value: 312 },
      { label: "Staff", value: 18 },
      { label: "Video Lessons", value: 24 },
      { label: "Classrooms Active", value: 8 },
      { label: "Weekly Plan", value: 20 },
      { label: "Completed", value: 16 },
    ],
    editableFields: [
      { key: "student_count", label: "Student Count", type: "number" },
      { key: "staff_count", label: "Staff Count", type: "number" },
      {
        key: "cbse_video_lesson_count",
        label: "CBSE Video Lessons",
        type: "number",
      },
      {
        key: "mah_video_lesson_count",
        label: "MAH Video Lessons",
        type: "number",
      },
      {
        key: "cbse_video_lesson_hour",
        label: "CBSE Video Lesson Hours",
        type: "number",
      },
      {
        key: "mah_video_lesson_hour",
        label: "MAH Video Lesson Hours",
        type: "number",
      },
      {
        key: "online_classroom_count",
        label: "Online Classrooms Active",
        type: "number",
      },
      {
        key: "planned_lesson_week_count",
        label: "Planned Lessons (Week)",
        type: "number",
      },
      {
        key: "played_lesson_week_count",
        label: "Played Lessons (Week)",
        type: "number",
      },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { attendance: 289, lessonsCompleted: 4, sessionHours: 6 },
        submittedBy: "Teacher A",
      },
      {
        id: "R002",
        date: "2026-03-08",
        data: { attendance: 302, lessonsCompleted: 5, sessionHours: 7 },
        submittedBy: "Teacher B",
      },
    ],
    devices: [],
  },
  {
    id: "UC015",
    name: "PPDR System",
    provider: "SafeNet",
    subCategory: "Safety",
    dataRole: "alert",
    description:
      "Public Protection and Disaster Relief — SOS triggers, push-to-talk, and announcements.",
    kpis: [
      { label: "SOS Triggers", value: 3 },
      { label: "PTT Presses", value: 142 },
      { label: "Announcements", value: 28 },
      { label: "Deployed Systems", value: 3 },
    ],
    editableFields: [
      { key: "sos_trigger_count", label: "SOS Triggers", type: "number" },
      { key: "ptt_pressed_count", label: "PTT Presses", type: "number" },
      { key: "announcement_count", label: "Announcements", type: "number" },
      {
        key: "system_deployed_count",
        label: "Systems Deployed",
        type: "number",
      },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { sosTriggers: 1, pttPresses: 48, announcements: 8 },
        submittedBy: "Control Room",
      },
    ],
    devices: [
      {
        id: "PPDR001",
        label: "PPDR Unit A — Village Center",
        lat: 19.8762,
        lng: 75.3433,
        status: "online",
        metrics: { Status: "Active" },
      },
      {
        id: "PPDR002",
        label: "PPDR Unit B — School",
        lat: 19.877,
        lng: 75.3445,
        status: "online",
        metrics: { Status: "Active" },
      },
      {
        id: "PPDR003",
        label: "PPDR Unit C — Market",
        lat: 19.8755,
        lng: 75.342,
        status: "online",
        metrics: { Status: "Active" },
      },
    ],
  },
  {
    id: "UC016",
    name: "Fire Safety",
    provider: "FireGuard",
    subCategory: "Safety",
    dataRole: "alert",
    description:
      "Fire extinguisher monitoring — count, pressure levels, and expiry tracking.",
    kpis: [
      { label: "Extinguishers", value: 14 },
      { label: "Pressure OK", value: 12 },
      { label: "Pressure Low", value: 2 },
      { label: "Expiring Soon", value: 2 },
    ],
    editableFields: [
      { key: "extinguisherCount", label: "Extinguisher Count", type: "number" },
      { key: "pressureOK", label: "Pressure OK Count", type: "number" },
      { key: "pressureLow", label: "Pressure Low Count", type: "number" },
      { key: "expiry", label: "Extinguisher Expiry Date", type: "date" },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { extinguisherCount: 14, pressureOK: 12, pressureLow: 2 },
        submittedBy: "Safety Officer",
      },
    ],
    devices: [
      {
        id: "FE-01",
        label: "Ext. #1 — Panchayat",
        lat: 19.876,
        lng: 75.343,
        status: "online",
        metrics: { Pressure: "OK", Expiry: "2027" },
      },
      {
        id: "FE-02",
        label: "Ext. #2 — School",
        lat: 19.8768,
        lng: 75.3442,
        status: "alert",
        metrics: { Pressure: "Low", Expiry: "2026" },
      },
      {
        id: "FE-03",
        label: "Ext. #3 — Market",
        lat: 19.8753,
        lng: 75.3418,
        status: "alert",
        metrics: { Pressure: "OK", Expiry: "2025" },
      },
    ],
  },
  {
    id: "UC017",
    name: "Smart Waste",
    provider: "CleanTech",
    subCategory: "Environment",
    dataRole: "earth",
    description:
      "Smart bins monitoring — fill level, temperature, gas sensor status.",
    kpis: [
      { label: "Bins Active", value: 3 },
      { label: "Avg Fill Level", value: 62, unit: "%" },
      { label: "Gas Alerts", value: 0 },
    ],
    editableFields: [
      { key: "binsFull", label: "Bins Full", type: "number" },
      { key: "collectionDone", label: "Collection Done", type: "text" },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { binsFull: 1, collectionDone: "Yes" },
        submittedBy: "Operator",
      },
    ],
    devices: [
      {
        id: "BIN001",
        label: "Bin A — Market",
        lat: 19.8762,
        lng: 75.3433,
        status: "online",
        metrics: { Fill: "72%", Temp: "28°C", Gas: "Normal" },
      },
      {
        id: "BIN002",
        label: "Bin B — Temple",
        lat: 19.877,
        lng: 75.3445,
        status: "online",
        metrics: { Fill: "45%", Temp: "27°C", Gas: "Normal" },
      },
      {
        id: "BIN003",
        label: "Bin C — School",
        lat: 19.8755,
        lng: 75.342,
        status: "online",
        metrics: { Fill: "68%", Temp: "29°C", Gas: "Normal" },
      },
    ],
  },
  {
    id: "UC019",
    name: "EV Auto",
    provider: "GreenMile",
    subCategory: "Transport",
    dataRole: "infra",
    description:
      "Electric vehicle auto transport — trips, battery SoC, range, and route tracking.",
    kpis: [
      { label: "Trips Today", value: 18 },
      { label: "School Trips", value: 8 },
      { label: "Village Trips", value: 10 },
      { label: "Battery SoC", value: 72, unit: "%" },
      { label: "Range", value: 45, unit: "km" },
    ],
    editableFields: [
      {
        key: "vehicle_deployed_count",
        label: "Vehicles Deployed",
        type: "number",
      },
      { key: "trip_count", label: "Total Trips", type: "number" },
      { key: "school_trip_count", label: "School Trips", type: "number" },
      { key: "village_trip_count", label: "Village Trips", type: "number" },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { schoolTrips: 8, villageTrips: 10, batterySoC: 72 },
        submittedBy: "Driver",
      },
    ],
    devices: [],
  },
  {
    id: "UC014",
    name: "Telemedicine",
    provider: "MedConnect",
    subCategory: "Healthcare",
    dataRole: "infra",
    description:
      "Telemedicine platform — remote consultations, uptime, and session duration tracking.",
    kpis: [
      { label: "Consultations", value: 18 },
      { label: "Uptime", value: 99.5, unit: "%" },
      { label: "Avg Duration", value: 12, unit: "min" },
    ],
    editableFields: [
      { key: "consultation", label: "Consultations", type: "number" },
      { key: "patient_count", label: "Patient Count", type: "number" },
      { key: "male_patient", label: "Male Patients", type: "number" },
      { key: "female_patient", label: "Female Patients", type: "number" },
      {
        key: "medicine_dispensed",
        label: "Medicine Dispensed",
        type: "number",
      },
      { key: "downtime", label: "System Downtime (hrs)", type: "number" },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { consultations: 18, avgDuration: 12 },
        submittedBy: "Dr. Patel",
      },
    ],
    devices: [],
  },
  {
    id: "UC021",
    name: "E-Governance",
    provider: "GovTech",
    subCategory: "Governance",
    dataRole: "infra",
    description:
      "Digital governance platform — applications, processing, and pending requests.",
    kpis: [
      { label: "Applications", value: 234 },
      { label: "Processed", value: 198 },
      { label: "Pending", value: 36 },
    ],
    editableFields: [
      { key: "newApplications", label: "New Applications", type: "number" },
      { key: "processed", label: "Processed Today", type: "number" },
    ],
    history: [
      {
        id: "R001",
        date: "2026-03-09",
        data: { newApplications: 12, processed: 15 },
        submittedBy: "Admin",
      },
    ],
    devices: [],
  },
];

// ===== COMBINED ACCESSOR =====
export const getAllUseCases = () => {
  const iot = useCases.map((uc) => ({
    id: uc.id,
    name: uc.name,
    category: uc.category as UseCaseCategory,
    subCategory: uc.subCategory,
    dataRole: uc.dataRole,
    provider: uc.provider,
    kpiCount: uc.kpis.length,
    deviceCount: uc.devices.length,
  }));
  const nonIot = nonIoTUseCases.map((uc) => ({
    id: uc.id,
    name: uc.name,
    category: "Non-IoT" as UseCaseCategory,
    subCategory: uc.subCategory,
    dataRole: uc.dataRole,
    provider: uc.provider,
    kpiCount: uc.kpis.length,
    deviceCount: uc.devices.length,
  }));
  return [...iot, ...nonIot].sort((a, b) => a.id.localeCompare(b.id));
};

// ===== VILLAGES =====
export const villages: VillageDataModel[] = [
  {
    id: "V001",
    name: "Satnavari",
    district: "Aurangabad",
    state: "Maharashtra",
    population: 4200,
    status: "active",
    activeCases: [
      "UC001",
      "UC002",
      "UC004",
      "UC005",
      "UC006",
      "UC008",
      "UC009",
      "UC010",
      "UC011",
      "UC012",
      "UC015",
      "UC016",
      "UC019",
    ],
    totalDevices: 48,
    activeSensors: 44,
    inactiveSensors: 4,
    alerts: 3,
    uptimePercent: 98.4,
  },
  {
    id: "V002",
    name: "Khandala",
    district: "Pune",
    state: "Maharashtra",
    population: 3800,
    status: "active",
    activeCases: [
      "UC001",
      "UC003",
      "UC005",
      "UC006",
      "UC007",
      "UC010",
      "UC011",
      "UC013",
      "UC017",
      "UC020",
    ],
    totalDevices: 36,
    activeSensors: 34,
    inactiveSensors: 2,
    alerts: 1,
    uptimePercent: 99.1,
  },
  {
    id: "V003",
    name: "Devgaon",
    district: "Nashik",
    state: "Maharashtra",
    population: 5100,
    status: "active",
    activeCases: [
      "UC001",
      "UC002",
      "UC006",
      "UC008",
      "UC009",
      "UC013",
      "UC014",
      "UC017",
      "UC021",
      "UC024",
    ],
    totalDevices: 42,
    activeSensors: 40,
    inactiveSensors: 2,
    alerts: 0,
    uptimePercent: 99.6,
  },
  {
    id: "V004",
    name: "Pimpalgaon",
    district: "Beed",
    state: "Maharashtra",
    population: 2900,
    status: "inactive",
    activeCases: ["UC001", "UC009", "UC016"],
    totalDevices: 12,
    activeSensors: 8,
    inactiveSensors: 4,
    alerts: 2,
    uptimePercent: 92.1,
  },
];
