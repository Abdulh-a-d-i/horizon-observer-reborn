
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const VisualizationPage = () => {
  const [severityData, setSeverityData] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchData = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Dynamic data generation with some randomness for realistic values
        setSeverityData([
          { name: "CRITICAL", value: 10 + Math.floor(Math.random() * 10), color: "#ef4444" },
          { name: "ERROR", value: 40 + Math.floor(Math.random() * 15), color: "#f97316" },
          { name: "WARNING", value: 70 + Math.floor(Math.random() * 20), color: "#eab308" },
          { name: "INFO", value: 110 + Math.floor(Math.random() * 30), color: "#3b82f6" },
        ]);

        setMachineData([
          { machine: "web-server-01", logs: 75 + Math.floor(Math.random() * 20) },
          { machine: "api-server-02", logs: 110 + Math.floor(Math.random() * 25) },
          { machine: "db-server-01", logs: 85 + Math.floor(Math.random() * 20) },
          { machine: "cache-server-01", logs: 35 + Math.floor(Math.random() * 20) },
          { machine: "worker-01", logs: 60 + Math.floor(Math.random() * 15) },
        ]);

        const currentHour = new Date().getHours();
        setTimeSeriesData([
          { time: "00:00", critical: 1 + Math.floor(Math.random() * 3), error: 4 + Math.floor(Math.random() * 4), warning: 6 + Math.floor(Math.random() * 4) },
          { time: "04:00", critical: 1 + Math.floor(Math.random() * 2), error: 2 + Math.floor(Math.random() * 3), warning: 9 + Math.floor(Math.random() * 6) },
          { time: "08:00", critical: 3 + Math.floor(Math.random() * 3), error: 7 + Math.floor(Math.random() * 4), warning: 12 + Math.floor(Math.random() * 6) },
          { time: "12:00", critical: 2 + Math.floor(Math.random() * 2), error: 5 + Math.floor(Math.random() * 3), warning: 8 + Math.floor(Math.random() * 4) },
          { time: "16:00", critical: 4 + Math.floor(Math.random() * 3), error: 10 + Math.floor(Math.random() * 4), warning: 15 + Math.floor(Math.random() * 6) },
          { time: "20:00", critical: 1 + Math.floor(Math.random() * 2), error: 3 + Math.floor(Math.random() * 3), warning: 7 + Math.floor(Math.random() * 4) },
        ]);
        
        setLoading(false);
      }, 1500);
    };

    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 300000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-slate-400">System performance and log analytics</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600 dark:text-slate-400">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-slate-400">System performance and log analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Log Severity Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  color: '#333'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Logs by Machine */}
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Logs by Machine</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="machine" 
                stroke="#6b7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  color: '#333'
                }}
              />
              <Bar dataKey="logs" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Time Series */}
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Log Trends (24 Hours)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  color: '#333'
                }}
              />
              <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="error" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="warning" stroke="#eab308" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{severityData[0]?.value || 0}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Critical Issues</div>
          <div className="text-xs text-red-600 dark:text-red-400 mt-1">↑ {Math.floor(Math.random() * 30)}% from yesterday</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">{severityData[1]?.value || 0}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Error Messages</div>
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">↓ {Math.floor(Math.random() * 10)}% from yesterday</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{severityData[2]?.value || 0}</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">Warnings</div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">↑ {Math.floor(Math.random() * 15)}% from yesterday</div>
        </Card>

        <Card className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{Math.round(98.5 - Math.random())}%</div>
          <div className="text-sm text-gray-600 dark:text-slate-400">System Uptime</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">Excellent</div>
        </Card>
      </div>
    </div>
  );
};

export default VisualizationPage;
