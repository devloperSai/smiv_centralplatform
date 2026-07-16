import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Villages from "./pages/Villages";
import IoTList from "./pages/IoTList";
import IoTDetail from "./pages/IoTDetail";
import NonIoTList from "./pages/NonIoTList";
import NonIoTDetail from "./pages/NonIoTDetail";
import Analytics from "./pages/Analytics";
import MapView from "./pages/MapView";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import UseCaseManagement from "./pages/UseCaseManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/villages" element={<Villages />} />
            <Route path="/iot" element={<IoTList />} />
            <Route path="/iot/:id" element={<IoTDetail />} />
            <Route path="/non-iot" element={<NonIoTList />} />
            <Route path="/non-iot/:id" element={<NonIoTDetail />} />
            <Route path="/use-cases" element={<UseCaseManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
