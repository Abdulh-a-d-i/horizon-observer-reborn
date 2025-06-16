
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import SystemHealth from "./SystemHealth";

interface SystemStats {
  totalMachines: number;
  activeMachines: number;
  totalLogs: number;
  criticalAlerts: number;
  openTickets: number;
}

const HomePage = () => {
  const [stats, setStats] = useState<SystemStats>({
    totalMachines: 0,
    activeMachines: 0,
    totalLogs: 0,
    criticalAlerts: 0,
    openTickets: 0
  });

  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalMachines: 5,
      activeMachines: 4,
      totalLogs: 1250,
      criticalAlerts: 3,
      openTickets: 7
    });

    // Simulate recent logs
    setRecentLogs([
      { id: 1, machine: "web-server-01", message: "Database connection timeout", severity: "ERROR", time: "2 min ago" },
      { id: 2, machine: "api-server-02", message: "High memory usage detected", severity: "WARNING", time: "5 min ago" },
      { id: 3, machine: "cache-server-01", message: "Redis connection lost", severity: "CRITICAL", time: "8 min ago" },
    ]);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "text-red-400";
      case "ERROR": return "text-orange-400";
      case "WARNING": return "text-yellow-400";
      default: return "text-blue-400";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-slate-400">Real-time monitoring and log analysis</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.totalMachines}</div>
            <div className="text-sm text-slate-400">Total Machines</div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.activeMachines}</div>
            <div className="text-sm text-slate-400">Active Machines</div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.totalLogs}</div>
            <div className="text-sm text-slate-400">Total Logs</div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{stats.criticalAlerts}</div>
            <div className="text-sm text-slate-400">Critical Alerts</div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.openTickets}</div>
            <div className="text-sm text-slate-400">Open Tickets</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">System Health</h2>
          <SystemHealth />
        </Card>

        {/* Recent Logs */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Critical Logs</h2>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                <div className="flex-1">
                  <div className="text-sm text-slate-300">{log.machine}</div>
                  <div className="text-sm text-slate-400">{log.message}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </div>
                  <div className="text-xs text-slate-500">{log.time}</div>
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
