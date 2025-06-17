
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardContent from "./DashboardContent";
import LogsPage from "./LogsPage";
import TicketsPage from "./TicketsPage";
import VisualizationPage from "./VisualizationPage";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "logs":
        return <LogsPage />;
      case "tickets":
        return <TicketsPage />;
      case "visualization":
        return <VisualizationPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
