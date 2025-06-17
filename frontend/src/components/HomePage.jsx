
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, AlertTriangle, CheckCircle, Clock, Server, Database } from "lucide-react";

const HomePage = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    totalLogs: 0,
    activeIncidents: 0,
    resolvedToday: 0,
    systemUptime: "00:00:00"
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        totalLogs: prev.totalLogs + Math.floor(Math.random() * 5) + 1,
        activeIncidents: Math.max(0, prev.activeIncidents + (Math.random() > 0.7 ? 1 : -1)),
        resolvedToday: prev.resolvedToday + (Math.random() > 0.8 ? 1 : 0),
        systemUptime: new Date().toLocaleTimeString()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    {
      title: "Total Logs Today",
      value: systemMetrics.totalLogs.toLocaleString(),
      icon: Activity,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Active Incidents",
      value: systemMetrics.activeIncidents,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      title: "Resolved Today",
      value: systemMetrics.resolvedToday,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "System Uptime",
      value: systemMetrics.systemUptime,
      icon: Clock,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-slate-400">Monitor your system health and incidents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Incidents</h2>
          <div className="space-y-3">
            {[
              { type: "ERROR", message: "Database connection timeout", time: "2 min ago", status: "active" },
              { type: "WARNING", message: "High memory usage detected", time: "5 min ago", status: "investigating" },
              { type: "INFO", message: "System backup completed", time: "1 hour ago", status: "resolved" }
            ].map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    incident.type === "ERROR" ? "bg-red-500" : 
                    incident.type === "WARNING" ? "bg-yellow-500" : "bg-blue-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{incident.message}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{incident.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  incident.status === "active" ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" :
                  incident.status === "investigating" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" :
                  "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Health</h2>
          <div className="space-y-4">
            {[
              { name: "Web Server", status: "healthy", uptime: "99.9%" },
              { name: "Database", status: "warning", uptime: "98.5%" },
              { name: "Cache Layer", status: "healthy", uptime: "100%" },
              { name: "API Gateway", status: "healthy", uptime: "99.8%" }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Server className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-slate-400">{service.uptime}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === "healthy" ? "bg-green-500" : "bg-yellow-500"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
