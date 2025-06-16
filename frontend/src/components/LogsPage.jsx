
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LogViewer from "./LogViewer";
import SeverityFilter from "./SeverityFilter";
import TicketModal from "./TicketModal";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [machines, setMachines] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8000/ws/logs');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to log stream');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const logEntry = JSON.parse(event.data);
          setLogs(prev => [logEntry, ...prev].slice(0, 1000));
          
          setMachines(prev => {
            if (!prev.includes(logEntry.machine_id)) {
              return [...prev, logEntry.machine_id];
            }
            return prev;
          });
        } catch (error) {
          console.error('Error parsing log data:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed, attempting to reconnect...');
        setIsConnected(false);
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    let filtered = logs;

    if (selectedMachine !== "all") {
      filtered = filtered.filter(log => log.machine_id === selectedMachine);
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.log.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.machine_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [logs, selectedMachine, selectedSeverity, searchTerm]);

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setShowTicketModal(true);
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const response = await fetch('http://localhost:8000/create-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          machine_id: selectedLog?.machine_id,
          log: selectedLog?.log,
          timestamp: selectedLog?.timestamp,
          title: ticketData.title,
          description: ticketData.description,
          status: "OPEN"
        }),
      });

      if (response.ok) {
        console.log('Ticket created successfully');
        setShowTicketModal(false);
        setSelectedLog(null);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">Log Explorer</h1>
          <p className="dark:text-slate-400 text-gray-600">Real-time log monitoring across all systems</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isConnected 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div className="text-sm dark:text-slate-400 text-gray-600">
            {filteredLogs.length} logs displayed
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 dark:bg-slate-800/50 bg-gray-50 dark:border-slate-700 border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm dark:text-slate-400 text-gray-600 mb-2">Search</label>
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:bg-slate-700 bg-white dark:border-slate-600 border-gray-300 dark:text-white text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm dark:text-slate-400 text-gray-600 mb-2">Machine</label>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger className="dark:bg-slate-700 bg-white dark:border-slate-600 border-gray-300 dark:text-white text-gray-900">
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-700 bg-white dark:border-slate-600 border-gray-300">
                <SelectItem value="all">All Machines</SelectItem>
                {machines.map(machine => (
                  <SelectItem key={machine} value={machine}>{machine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm dark:text-slate-400 text-gray-600 mb-2">Severity</label>
            <SeverityFilter value={selectedSeverity} onChange={setSelectedSeverity} />
          </div>

          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSelectedMachine("all");
                setSelectedSeverity("all");
                setSearchTerm("");
              }}
              variant="outline"
              className="dark:bg-slate-700 bg-gray-100 dark:border-slate-600 border-gray-300 dark:text-slate-300 text-gray-700 dark:hover:bg-slate-600 hover:bg-gray-200"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Log Viewer */}
      <Card className="dark:bg-slate-800/50 bg-gray-50 dark:border-slate-700 border-gray-200">
        <LogViewer logs={filteredLogs} onLogClick={handleLogClick} />
      </Card>

      {/* Ticket Modal */}
      {showTicketModal && selectedLog && (
        <TicketModal
          log={selectedLog}
          onCreateTicket={handleCreateTicket}
          onClose={() => {
            setShowTicketModal(false);
            setSelectedLog(null);
          }}
        />
      )}
    </div>
  );
};

export default LogsPage;
