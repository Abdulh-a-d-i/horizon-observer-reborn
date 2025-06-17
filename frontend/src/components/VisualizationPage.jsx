
import { useState, useEffect } from "react";

const VisualizationPage = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    totalLogs: 0,
    errorRate: 0,
    systemUptime: 0,
    activeAlerts: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate fetching metrics
    setSystemMetrics({
      totalLogs: 15420,
      errorRate: 2.3,
      systemUptime: 99.8,
      activeAlerts: 5
    });

    setRecentActivity([
      { time: "14:30", event: "High CPU usage detected on web-server-01", type: "warning" },
      { time: "14:25", event: "Database backup completed successfully", type: "success" },
      { time: "14:20", event: "Memory usage spike on api-server-02", type: "error" },
      { time: "14:15", event: "Cache server restarted", type: "info" },
      { time: "14:10", event: "New deployment completed", type: "success" }
    ]);
  }, []);

  const getEventColor = (type) => {
    switch (type) {
      case "error": return "text-red-400";
      case "warning": return "text-yellow-400";
      case "success": return "text-green-400";
      case "info": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">System Analytics</h1>
        <p className="text-gray-600 dark:text-slate-400">Real-time system performance and log analysis</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">{systemMetrics.totalLogs.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Total Logs</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-2">{systemMetrics.errorRate}%</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Error Rate</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">{systemMetrics.systemUptime}%</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">System Uptime</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">{systemMetrics.activeAlerts}</div>
            <div className="text-sm text-gray-600 dark:text-slate-400">Active Alerts</div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Log Volume Over Time</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded">
            <div className="text-gray-500 dark:text-slate-400">Chart visualization would go here</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Error Distribution</h2>
          <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded">
            <div className="text-gray-500 dark:text-slate-400">Pie chart would go here</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-sm text-gray-500 dark:text-slate-400 w-16">{activity.time}</div>
                <div className={`w-2 h-2 rounded-full mt-2 ${getEventColor(activity.type)}`}></div>
                <div className="flex-1 text-sm text-gray-700 dark:text-slate-300">{activity.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPage;
