# VoICET Control Panel — Smart Intelligent Village Dashboard

VoICET Control Panel is a cartographic and telemetry administration system optimized for monitoring, managing, and overriding parameters within Smart Village infrastructures. The application features a centralized Command Center designed to segregate, assign, track, and chart both automated Internet of Things (IoT) sensors and manually overridden Non-IoT agricultural, demographic, utility, and welfare metrics across registered villages.

---

## 🚀 Core Features & Codebase Architecture Map

The table below correlates each required feature spec directly with its corresponding architectural interface and logic block within this codebase:

| Sr. No. | Feature Specification | Technical Implementation Reference | File Path / Module |
| :--- | :--- | :--- | :--- |
| **1** | **Role-Based Access Control** | Strictly permits authenticated roles (`Gram Panchayat Officer`, `System Administrator`) via middleware validation hooks. | `src/hooks/useAuth.ts`<br>`src/pages/Login.tsx` |
| **2** | **Complete Overview of all Smart Villages** | Render blocks listing macro properties (Population, Active Devices, Alert States) for registered locations. | `src/pages/Dashboard.tsx`<br>`src/context/VillageContext.tsx` |
| **3** | **Overview of all Use Cases** | Aggregated data overview panels categorizing sensor counts and live operational parameters. | `src/pages/Dashboard.tsx`<br>`src/components/UseCaseCard.tsx` |
| **4** | **Adding, Updating, Deleting Use Cases** | Form controllers managing Master Data schema operations using `multipart/form-data` payloads. | `src/pages/UseCaseManagement.tsx`<br>`src/components/UseCaseForm.tsx` |
| **5** | **Assignment of Created Use Cases** | View systems linking master features to precise rural geographic locations. | `src/repositories/UseCaseRepository.ts`<br>`src/hooks/useUseCase.ts` |
| **6** | **Control of Entity & Stats for Each Use Case** | Unique detail routes rendering metrics tables, status states, and live telemetry datasets. | `src/pages/IoTDetail.tsx`<br>`src/pages/NonIoTDetail.tsx` |
| **7** | **Adding, Updating, Deleting Villages** | Core layout components interacting with administrative demographic master repositories. | `src/pages/Villages.tsx`<br>`src/repositories/DemographicRepository.ts` |
| **8** | **Segregation of Use Cases (IoT, Non-IoT, Categories)** | Dedicated collection layouts grouping entities explicitly by connectivity layer and function. | `src/pages/IoTList.tsx`<br>`src/pages/NonIoTList.tsx` |
| **9** | **Complete Analytics Suite** | Time-series visualization grids handling Energy Grid Feed, Water Flow/pH, and Bandwidth. | `src/pages/Analytics.tsx` |
| **10** | **Manual Override Data Entry** | Interactive submission forms authorizing manual payload adjustments to overwrite system defaults. | `src/pages/NonIoTDetail.tsx`<br>`src/components/UseCaseForm.tsx` |
| **11** | **Geospatial Map View Interface** | Real-time Leaflet map canvas rendering absolute geo-coordinates and node diagnostics markers. | `src/pages/MapView.tsx` |
| **12** | **Village-Wise Map Querying** | Reactive context provider refreshing hardware visualization grids via top-level workspace selectors. | `src/layouts/DashboardLayout.tsx` |
| **13** | **Use-Case & Entity Specific Filtering** | Context-driven layout filtering localized layout arrays via drop-down map selectors. | `src/pages/MapView.tsx` |
| **14** | **System Settings** | Configuration workspace rendering infrastructure indices, synchronization timestamps, and logs. | `src/pages/Settings.tsx` |

---

## 🛠️ Technology Stack

- **Framework:** React 18 (TypeScript Native Setup)
- **Build Tooling:** Vite
- **State Management & Remote Caching:** TanStack Query v5 (`@tanstack/react-query`)
- **Routing Engine:** React Router DOM v6
- **Data Visualization:** Recharts
- **Mapping Infrastructure:** Leaflet & React Leaflet
- **Styling Architecture:** Tailwind CSS + Radix UI Primitives + Lucide Icons
- **HTTP Client Client:** Axios (Configured with Request/Response Interceptors for Auth)

---

## 📂 Codebase Overview

```text
src/
├── components/          # Reusable structural and design layout units
│   ├── ui/              # Radix component layers styled via Tailwind
│   ├── AppSidebar.tsx   # Central navigation map layout
│   └── UseCaseForm.tsx  # Dual payload (JSON/Multipart) editor form
├── config/              # Central global endpoints declaration dictionary
│   └── api.ts           # Unified API lookup definitions
├── context/             # Global system operations state handlers
│   └── VillageContext.tsx # Command Center top-bar selector scope
├── data/                # Fallback parameters and time-series generators
│   └── mock-data.ts     # Interface shapes and mock assets configuration
├── hooks/               # TanStack Query custom data mutations layer
│   ├── useAuth.ts       # Role screening and authorization token layers
│   ├── useUseCase.ts    # Node details, coordinate trackers, and CRUD workflows
│   └── useDashboard.ts  # Master summary and operational status aggregates
├── layouts/             # Higher-order visual architecture wrappers
│   └── DashboardLayout.tsx # Global layout providing context shell
├── lib/                 # Core framework engine instances
│   └── api-client.ts    # Configured Axios instance with token interceptors
├── pages/               # Functional view controllers
└── repositories/        # Clean implementation of the Repository Pattern
    ├── Repository.ts    # Base class defining abstract CRUD verbs
    └── AuthRepository.ts # Concrete class handling auth endpoints