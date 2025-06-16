
import { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import LogsPage from "./LogsPage";
import TicketsPage from "./TicketsPage";
import VisualizationPage from "./VisualizationPage";

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <HomePage />;
      case "logs":
        return <LogsPage />;
      case "tickets":
        return <TicketsPage />;
      case "visualization":
        return <VisualizationPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
