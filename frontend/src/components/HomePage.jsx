
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalLogsToday: 0,
    openTickets: 0,
    resolvedToday: 0,
    avgResolutionTime: "0h"
  });

  const [recentTickets, setRecentTickets] = useState([]);
  const [systemHealth, setSystemHealth] = useState([]);

  useEffect(() => {
    // Simulate fetching stats with dynamic data
    const fetchStats = () => {
      setStats({
        totalLogsToday: Math.floor(Math.random() * 2000) + 1000,
        openTickets: Math.floor(Math.random() * 50) + 10,
        resolvedToday: Math.floor(Math.random() * 30) + 5,
        avgResolutionTime: `${(Math.random() * 5 + 1).toFixed(1)}h`
      });
    };

    // Simulate recent tickets with dynamic data
    const fetchRecentTickets = () => {
      const ticketTypes = [
        "Database connection timeout",
        "API rate limit exceeded", 
        "Memory leak in service",
        "Authentication failure",
        "SSL certificate expired",
        "Disk space running low"
      ];
      
      setRecentTickets([
        {
          id: "TKT-001",
          title: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
          priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          status: ["open", "in-progress", "resolved"][Math.floor(Math.random() * 3)],
          description: ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
        },
        {
          id: "TKT-002", 
          title: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
          priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          status: ["open", "in-progress", "resolved"][Math.floor(Math.random() * 3)],
          description: ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
        },
        {
          id: "TKT-003",
          title: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
          priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          status: ["open", "in-progress", "resolved"][Math.floor(Math.random() * 3)],
          description: ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
        },
        {
          id: "TKT-004",
          title: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
          priority: ["high", "medium", "low"][Math.floor(Math.random() * 3)],
          status: ["open", "in-progress", "resolved"][Math.floor(Math.random() * 3)],
          description: ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
        }
      ]);
    };

    // Simulate system health with dynamic data
    const fetchSystemHealth = () => {
      setSystemHealth([
        { name: "Log Ingestion Rate", status: Math.random() > 0.3 ? "Normal" : "Warning" },
        { name: "Error Detection", status: Math.random() > 0.2 ? "Active" : "Inactive" },
        { name: "AI Assistant", status: Math.random() > 0.1 ? "Online" : "Offline" },
        { name: "Notification Queue", value: `${Math.floor(Math.random() * 10)} pending` }
      ]);
    };

    fetchStats();
    fetchRecentTickets();
    fetchSystemHealth();

    // Update data every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
      fetchRecentTickets();
      fetchSystemHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getHealthStatusColor = (status) => {
    switch (status) {
      case "Normal":
      case "Active":
      case "Online": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Inactive":
      case "Offline": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your logs and incidents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Logs Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLogsToday.toLocaleString()}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12% from yesterday</p>
            </div>
            <Copy className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.openTickets}</p>
              <p className="text-xs text-red-600 dark:text-red-400">+3 from yesterday</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.resolvedToday}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+15% from yesterday</p>
            </div>
            <CheckCircle className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgResolutionTime}</p>
              <p className="text-xs text-green-600 dark:text-green-400">-0.3h from yesterday</p>
            </div>
            <Clock className="h-8 w-8 text-gray-400" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Tickets</h2>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="border-b border-gray-200 dark:border-slate-600 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{ticket.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Health</h2>
          <div className="space-y-4">
            {systemHealth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                <Badge className={getHealthStatusColor(item.status || item.value)}>
                  {item.status || item.value}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
