/**
 * Field configuration for the "Submit Data" form shown on each Non-IoT use case.
 *
 * Each entry maps a use case (matched loosely by name, so it works whether the
 * name comes from the mock data, the live API, or the admin-created "Use Case
 * Management" records) to the list of fields an operator should fill in.
 *
 * Field lists are derived from SMIV_Usecase_APIResponces.xlsx (Non-IoT section) —
 * i.e. these are the actual fields the backend expects in the telemetry payload.
 */

export type FieldType = "number" | "text" | "date" | "boolean" | "select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface UseCaseFieldDef {
  /** Key sent to the API — must match the backend field name exactly. */
  key: string;
  /** Human readable label shown above the input. */
  label: string;
  type: FieldType;
  /** Unit suffix shown next to the label, e.g. "kgCO2e", "hrs", "%". */
  unit?: string;
  /** Options for type "select". */
  options?: SelectOption[];
  placeholder?: string;
  /** Marks the field optional — everything else is required. */
  optional?: boolean;
}

interface FieldConfigEntry {
  /** Lowercase keywords — if the use case name contains ANY of these, this config applies. */
  match: string[];
  fields: UseCaseFieldDef[];
}

const YES_NO_OPTIONS: SelectOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

// Ordered from most specific → most generic. The first match wins, so more
// specific use case names (e.g. "Agriculture and Fire Safety Drone") must be
// checked before broader keyword sets (e.g. "fire safety").
const FIELD_CONFIGS: FieldConfigEntry[] = [
  // ---- One-Stop Destination for Healthcare Needs (a.k.a. Telemedicine) ----
  {
    match: ["one-stop", "one stop", "telemedicine"],
    fields: [
      { key: "consultantion", label: "Consultations", type: "number" },
      { key: "patient_count", label: "Patient Count", type: "number" },
      { key: "male_patient", label: "Male Patients", type: "number" },
      { key: "female_patient", label: "Female Patients", type: "number" },
      {
        key: "medicine_dispensed",
        label: "Medicine Dispensed",
        type: "number",
      },
      {
        key: "stock_report",
        label: "Stock Report",
        type: "text",
        optional: true,
      },
      {
        key: "downtime",
        label: "System Downtime",
        type: "number",
        unit: "hrs",
      },
      {
        key: "status",
        label: "System Status",
        type: "select",
        options: [
          { value: "operational", label: "Operational" },
          { value: "down", label: "Down" },
        ],
      },
    ],
  },

  // ---- Engineering Healthcare / Healthcare ----
  {
    match: ["engineering healthcare", "healthcare"],
    fields: [
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
        label: "System Downtime",
        type: "number",
        unit: "hrs",
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        optional: true,
        options: [
          { value: "operational", label: "Operational" },
          { value: "down", label: "Down" },
        ],
      },
    ],
  },

  // ---- Smart Anganwadi ----
  {
    match: ["anganwadi"],
    fields: [
      {
        key: "anganwadi_student_count",
        label: "Student Count",
        type: "number",
      },
      { key: "anganwadi_staff_count", label: "Staff Count", type: "number" },
      {
        key: "anganwadi_video_lesson_count",
        label: "Video Lessons Played",
        type: "number",
      },
      {
        key: "anganwadi_video_lesson_hour",
        label: "Video Lesson Hours",
        type: "number",
        unit: "hrs",
      },
      {
        key: "projector_count",
        label: "Projector Usage",
        type: "number",
        unit: "hrs",
      },
      {
        key: "log_available_day_count",
        label: "Log Available Days",
        type: "number",
      },
    ],
  },

  // ---- Agriculture and Fire Safety Drone (must be matched before "fire safety") ----
  {
    match: [
      "fire safety drone",
      "agriculture and fire safety drone",
      "agri drone",
      "drone",
    ],
    fields: [
      {
        key: "flying_hours",
        label: "Flying Hours",
        type: "number",
        unit: "hrs",
      },
      {
        key: "acres_sprayed",
        label: "Acres Sprayed",
        type: "number",
        unit: "acres",
      },
      { key: "farmer_count", label: "Farmers Assisted", type: "number" },
      { key: "fire_prevented", label: "Fires Prevented", type: "number" },
      { key: "announcement_made", label: "Announcements Made", type: "number" },
    ],
  },

  // ---- Automatic Fire Extinguisher / Fire Safety ----
  {
    match: ["fire extinguisher", "fire safety"],
    fields: [
      { key: "expiry", label: "Extinguisher Expiry Date", type: "date" },
      { key: "latitude", label: "Latitude", type: "number", optional: true },
      { key: "longitude", label: "Longitude", type: "number", optional: true },
    ],
  },

  // ---- Smart School ----
  {
    match: ["smart school"],
    fields: [
      { key: "school_student_count", label: "Student Count", type: "number" },
      { key: "school_staff_count", label: "Staff Count", type: "number" },
      {
        key: "cbse_video_lesson_count",
        label: "CBSE Video Lessons Played",
        type: "number",
      },
      {
        key: "mah_video_lesson_count",
        label: "MAH Video Lessons Played",
        type: "number",
      },
      {
        key: "cbse_video_lesson_hour",
        label: "CBSE Video Lesson Hours",
        type: "number",
        unit: "hrs",
      },
      {
        key: "mah_video_lesson_hour",
        label: "MAH Video Lesson Hours",
        type: "number",
        unit: "hrs",
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
  },

  // ---- Climate Smart Agriculture (Non-IoT farmer diary) ----
  {
    match: ["climate smart agriculture", "climate smart agri"],
    fields: [
      { key: "crop", label: "Crop", type: "text" },
      { key: "farmer", label: "Farmer Name", type: "text" },
      {
        key: "using_solar_pump",
        label: "Using Solar Pump",
        type: "boolean",
        options: YES_NO_OPTIONS,
      },
      {
        key: "carbon_emissions_kgCO2e",
        label: "Carbon Emissions",
        type: "number",
        unit: "kgCO₂e",
      },
      {
        key: "using_natural_fertilizer",
        label: "Using Natural Fertilizer",
        type: "boolean",
        options: YES_NO_OPTIONS,
      },
      {
        key: "water_consumption_liters",
        label: "Water Consumption",
        type: "number",
        unit: "L",
      },
      {
        key: "eligible_for_green_credits",
        label: "Eligible for Green Credits",
        type: "boolean",
        options: YES_NO_OPTIONS,
      },
      {
        key: "natural_produce_certification",
        label: "Natural Produce Certification",
        type: "boolean",
        options: YES_NO_OPTIONS,
      },
    ],
  },

  // ---- Public Protection and Disaster Relief System ----
  {
    match: ["protection and disaster", "ppdr"],
    fields: [
      { key: "sos_trigger_count", label: "SOS Triggers", type: "number" },
      { key: "ptt_pressed_count", label: "PTT Presses", type: "number" },
      { key: "announcement_count", label: "Announcements", type: "number" },
      {
        key: "system_deployed_count",
        label: "Systems Deployed",
        type: "number",
      },
    ],
  },

  // ---- Wi-Fi Hotspots ----
  {
    match: ["wi-fi hotspot", "wifi hotspot", "public wifi"],
    fields: [
      { key: "hotspot_id", label: "Hotspot ID", type: "text" },
      {
        key: "overall_uptime",
        label: "Overall Uptime",
        type: "number",
        unit: "%",
      },
      {
        key: "network_uptime",
        label: "Network Uptime",
        type: "number",
        unit: "%",
      },
      { key: "unique_user_count", label: "Unique Users", type: "number" },
      {
        key: "bandwidth_consumed",
        label: "Bandwidth Consumed",
        type: "number",
        unit: "Mbps",
      },
      {
        key: "hotspot_status",
        label: "Hotspot Status",
        type: "select",
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ],
      },
      {
        key: "data_usage_per_user",
        label: "Data Usage / User",
        type: "number",
        unit: "GB",
      },
    ],
  },

  // ---- EV Auto ----
  {
    match: ["ev auto", "electric vehicle"],
    fields: [
      {
        key: "vehicle_deployed_count",
        label: "Vehicles Deployed",
        type: "number",
      },
      { key: "trip_count", label: "Total Trips", type: "number" },
      { key: "school_trip_count", label: "School Trips", type: "number" },
      { key: "village_trip_count", label: "Village Trips", type: "number" },
    ],
  },

  // ---- E-Governance ----
  {
    match: ["e-governance", "governance"],
    fields: [
      { key: "newApplications", label: "New Applications", type: "number" },
      { key: "processed", label: "Processed Today", type: "number" },
    ],
  },

  // ---- Smart Waste Management ----
  {
    match: ["waste"],
    fields: [
      { key: "binsFull", label: "Bins Full", type: "number" },
      {
        key: "collectionDone",
        label: "Collection Done Today",
        type: "boolean",
        options: YES_NO_OPTIONS,
      },
    ],
  },
];

/**
 * Use cases that exist in the system but have no submittable fields yet
 * (their backend payload is currently an empty array): eQoSim Proposal,
 * Control Center Infra, WiFi Enabled CCTV Cameras, Smart Intelligent
 * Village - Central NOC. These intentionally fall through to `[]` below.
 */
export function getFieldsForUseCase(
  useCaseName?: string | null,
): UseCaseFieldDef[] {
  if (!useCaseName) return [];
  const name = useCaseName.toLowerCase();
  const entry = FIELD_CONFIGS.find((cfg) =>
    cfg.match.some((keyword) => name.includes(keyword)),
  );
  return entry ? entry.fields : [];
}
