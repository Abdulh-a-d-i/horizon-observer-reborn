
import { Button } from "@/components/ui/button";
import { Home, FileText, Ticket, BarChart3, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NavBar = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "logs", label: "Log Explorer", icon: FileText },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "visualization", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 dark:bg-slate-800/95 bg-white/95 backdrop-blur-sm dark:border-slate-700 border-gray-200 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold dark:text-white text-gray-900">Log Horizon</div>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-purple-600 text-white"
                        : "dark:text-slate-300 text-gray-700 dark:hover:text-white hover:text-gray-900 dark:hover:bg-slate-700 hover:bg-gray-100"
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
              className="dark:text-slate-300 text-gray-700 dark:hover:text-white hover:text-gray-900 dark:hover:bg-slate-700 hover:bg-gray-100"
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
