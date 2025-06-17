
import { Card } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const HomePage = () => {
  const stats = [
    {
      title: "Active Logs",
      value: "1,234",
      change: "+12%",
      icon: Activity,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Critical Issues",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400"
    },
    {
      title: "Resolved Tickets",
      value: "89",
      change: "+5",
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Avg Response Time",
      value: "2.3s",
      change: "-0.1s",
      icon: Clock,
      color: "text-purple-600 dark:text-purple-400"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-slate-400">System overview and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-500">
                    {stat.change} from last hour
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {[
              { type: "error", message: "Database connection timeout", time: "2 min ago" },
              { type: "warning", message: "High memory usage detected", time: "5 min ago" },
              { type: "info", message: "System backup completed", time: "10 min ago" }
            ].map((alert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                <div className={`w-2 h-2 rounded-full ${
                  alert.type === 'error' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { name: "Web Server", status: "online", uptime: "99.9%" },
              { name: "Database", status: "online", uptime: "99.8%" },
              { name: "Cache Server", status: "warning", uptime: "98.5%" },
              { name: "Load Balancer", status: "online", uptime: "100%" }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-gray-900 dark:text-white">{service.name}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">{service.uptime}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
