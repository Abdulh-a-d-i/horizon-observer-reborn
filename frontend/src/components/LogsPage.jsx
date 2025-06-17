
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";
import LogViewer from "./LogViewer";
import SeverityFilter from "./SeverityFilter";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [autoScroll, setAutoScroll] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    // Simulate fetching logs with dynamic data
    const fetchLogs = () => {
      setLoading(true);
      
      const severities = ["INFO", "WARNING", "ERROR", "CRITICAL", "DEBUG"];
      const machines = ["web-server-01", "api-server-02", "db-server-01", "cache-server-01"];
      const messages = [
        "User authentication successful",
        "Database connection established",
        "Memory usage threshold exceeded",
        "API request timeout",
        "SSL certificate validation failed",
        "Cache miss for key: user_session_123",
        "File system write error",
        "Network connection lost",
        "Service started successfully",
        "Configuration loaded"
      ];

      const newLogs = Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, i) => ({
        id: `log-${Date.now()}-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        severity: severities[Math.floor(Math.random() * severities.length)],
        machine: machines[Math.floor(Math.random() * machines.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        details: `Additional context for log entry ${i + 1}`
      }));

      setLogs(newLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      setConnectionStatus(Math.random() > 0.3 ? "Connected" : "Disconnected");
      setLoading(false);
    };

    fetchLogs();
    
    // Simulate real-time log updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new log
        fetchLogs();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.machine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMachine = selectedMachine === "all" || log.machine === selectedMachine;
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity;
    
    return matchesSearch && matchesMachine && matchesSeverity;
  });

  const handleRefresh = () => {
    setLogs([]);
    setLoading(true);
    setTimeout(() => {
      // Trigger useEffect to fetch new data
      window.location.reload();
    }, 500);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMachine("all");
    setSelectedSeverity("all");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Log Explorer</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time log monitoring across all systems</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className={connectionStatus === "Connected" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
            {connectionStatus}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredLogs.length} logs displayed
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600"
            />
          </div>
          
          <div>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                <SelectValue placeholder="All Machines" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                <SelectItem value="all">All Machines</SelectItem>
                <SelectItem value="web-server-01">web-server-01</SelectItem>
                <SelectItem value="api-server-02">api-server-02</SelectItem>
                <SelectItem value="db-server-01">db-server-01</SelectItem>
                <SelectItem value="cache-server-01">cache-server-01</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SeverityFilter value={selectedSeverity} onChange={setSelectedSeverity} />

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600"
            >
              Clear Filters
            </Button>
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="px-3 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Live Log Stream */}
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        <div className="p-4 border-b border-gray-200 dark:border-slate-600">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Log Stream</h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Auto-scroll</span>
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredLogs.length} logs
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <LogViewer logs={filteredLogs} loading={loading} autoScroll={autoScroll} />
        </div>
      </Card>
    </div>
  );
};

export default LogsPage;
