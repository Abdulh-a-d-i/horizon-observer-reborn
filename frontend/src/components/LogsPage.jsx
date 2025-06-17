
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Simulate real-time log data
  useEffect(() => {
    const generateLog = () => {
      const levels = ["INFO", "WARNING", "ERROR", "DEBUG"];
      const services = ["web-server", "database", "cache", "api-gateway"];
      const messages = [
        "User authentication successful",
        "Database query executed",
        "Cache miss for key",
        "API request processed",
        "Memory usage threshold exceeded",
        "Connection timeout occurred",
        "Service started successfully",
        "Configuration updated"
      ];

      return {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        level: levels[Math.floor(Math.random() * levels.length)],
        service: services[Math.floor(Math.random() * services.length)],
        message: messages[Math.floor(Math.random() * messages.length)]
      };
    };

    // Add initial logs
    const initialLogs = Array.from({ length: 20 }, generateLog);
    setLogs(initialLogs);

    // Simulate real-time log streaming
    const interval = setInterval(() => {
      const newLog = generateLog();
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 99)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Filter logs based on search term and level
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(log => log.level === selectedLevel);
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedLevel]);

  const getLevelColor = (level) => {
    switch (level) {
      case "ERROR": return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20";
      case "WARNING": return "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20";
      case "INFO": return "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20";
      case "DEBUG": return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
      default: return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Logs Explorer</h1>
        <p className="text-gray-600 dark:text-slate-400">Monitor and analyze system logs in real-time</p>
      </div>

      {/* Controls */}
      <Card className="p-4 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="ERROR">Error</option>
              <option value="WARNING">Warning</option>
              <option value="INFO">Info</option>
              <option value="DEBUG">Debug</option>
            </select>
          </div>

          <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Logs List */}
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Live Logs ({filteredLogs.length})
          </h2>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredLogs.map(log => (
            <div key={log.id} className="p-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{log.service}</span>
                    <span className="text-xs text-gray-500 dark:text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-slate-300">{log.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LogsPage;
