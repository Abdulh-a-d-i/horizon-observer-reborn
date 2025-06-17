
import { useState } from "react";
import { Home, FileText, Ticket, BarChart3, Bell, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "logs", label: "Logs Explorer", icon: FileText },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "visualization", label: "Monitoring", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">R</span>
          </div>
          <div>
            <div className="font-bold text-lg">Resolvix</div>
            <div className="text-slate-400 text-sm">Incident Management</div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-6">
        <div className="px-3 mb-4">
          <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Navigation</h3>
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-slate-300 text-sm font-medium">AA</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Alice Admin</div>
            <div className="text-xs text-slate-400 bg-red-600 px-2 py-0.5 rounded text-white">admin</div>
          </div>
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
