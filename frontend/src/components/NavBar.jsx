
import { Button } from "@/components/ui/button";
import { Home, FileText, Ticket, BarChart3, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "logs", label: "Logs Explorer", icon: FileText },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "visualization", label: "Monitoring", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">R</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">Resolvix</div>
              <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 ml-2">
                Logs & Incident Management
              </div>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
