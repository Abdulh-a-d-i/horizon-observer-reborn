
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const VisualizationPage = () => {
  const [logData, setLogData] = useState<any[]>([]);
  const [severityData, setSeverityData] = useState<any[]>([]);
  const [machineData, setMachineData] = useState<any[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate analytics data
    setSeverityData([
      { name: "CRITICAL", value: 15, color: "#ef4444" },
      { name: "ERROR", value: 45, color: "#f97316" },
      { name: "WARNING", value: 78, color: "#eab308" },
      { name: "INFO", value: 120, color: "#3b82f6" },
    ]);

    setMachineData([
      { machine: "web-server-01", logs: 85 },
      { machine: "api-server-02", logs: 120 },
      { machine: "db-server-01", logs: 95 },
      { machine: "cache-server-01", logs: 45 },
      { machine: "worker-01", logs: 67 },
    ]);

    setTimeSeriesData([
      { time: "00:00", critical: 2, error: 5, warning: 8 },
      { time: "04:00", critical: 1, error: 3, warning: 12 },
      { time: "08:00", critical: 4, error: 8, warning: 15 },
      { time: "12:00", critical: 3, error: 6, warning: 10 },
      { time: "16:00", critical: 5, error: 12, warning: 18 },
      { time: "20:00", critical: 2, error: 4, warning: 9 },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-slate-400">System performance and log analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Log Severity Distribution</h2>
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
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Logs by Machine */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Logs by Machine</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis 
                dataKey="machine" 
                stroke="#94a3b8"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="logs" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Time Series */}
        <Card className="p-6 bg-slate-800/50 border-slate-700 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Log Trends (24 Hours)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '6px'
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
        <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
          <div className="text-2xl font-bold text-red-400 mb-2">15</div>
          <div className="text-sm text-slate-400">Critical Issues</div>
          <div className="text-xs text-red-400 mt-1">↑ 20% from yesterday</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
          <div className="text-2xl font-bold text-orange-400 mb-2">45</div>
          <div className="text-sm text-slate-400">Error Messages</div>
          <div className="text-xs text-orange-400 mt-1">↓ 5% from yesterday</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">78</div>
          <div className="text-sm text-slate-400">Warnings</div>
          <div className="text-xs text-yellow-400 mt-1">↑ 12% from yesterday</div>
        </Card>

        <Card className="p-6 bg-slate-800/50 border-slate-700 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">98.5%</div>
          <div className="text-sm text-slate-400">System Uptime</div>
          <div className="text-xs text-green-400 mt-1">Excellent</div>
        </Card>
      </div>
    </div>
  );
};

export default VisualizationPage;
