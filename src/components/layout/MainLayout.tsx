
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppContext } from "@/context/AppContext";
import { Navigate } from "react-router-dom";

// Import recharts components with proper casing
import {
  PieChart, Pie, Tooltip as RechartsTooltip,
  CartesianGrid, XAxis, YAxis, Bar, BarChart
} from 'recharts';

// This component ensures that the chart components are registered globally
const ChartsRegistry = () => {
  return (
    <div className="hidden">
      <PieChart width={100} height={100}>
        <Pie data={[]} dataKey="value" nameKey="name" cx="50%" cy="50%" />
        <RechartsTooltip />
      </PieChart>
      <BarChart width={100} height={100}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <RechartsTooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-shell flex min-h-screen w-full px-3 py-4 lg:px-8">
      {/* Register chart components - invisible but needed to fix JSX errors */}
      <ChartsRegistry />

      <div className="flex w-full rounded-[32px] border border-white/30 bg-white/70 shadow-[0_35px_120px_rgba(15,23,42,0.20)] backdrop-blur-3xl dark:border-white/5 dark:bg-slate-950/60">
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header onToggleSidebar={toggleSidebar} />
          <main className="relative flex-1 overflow-y-auto px-6 py-8 lg:px-10">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-32 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-3xl lg:inset-x-10" />
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 pb-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
