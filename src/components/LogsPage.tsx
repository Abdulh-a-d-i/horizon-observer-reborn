
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LogViewer from "./LogViewer";
import SeverityFilter from "./SeverityFilter";
import TicketModal from "./TicketModal";

interface LogEntry {
  machine_id: string;
  log: string;
  timestamp: string;
  severity: string;
  source?: string;
}

const LogsPage = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [machines, setMachines] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket for real-time logs
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8000/ws/logs');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Connected to log stream');
      };

      ws.onmessage = (event) => {
        const logEntry: LogEntry = JSON.parse(event.data);
        setLogs(prev => [logEntry, ...prev].slice(0, 1000)); // Keep last 1000 logs
        
        // Update machines list
        setMachines(prev => {
          if (!prev.includes(logEntry.machine_id)) {
            return [...prev, logEntry.machine_id];
          }
          return prev;
        });
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed, attempting to reconnect...');
        setTimeout(connectWebSocket, 3000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
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

  const handleLogClick = (log: LogEntry) => {
    setSelectedLog(log);
    setShowTicketModal(true);
  };

  const handleCreateTicket = async (ticketData: any) => {
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
          <h1 className="text-3xl font-bold text-white mb-2">Log Explorer</h1>
          <p className="text-slate-400">Real-time log monitoring across all systems</p>
        </div>
        <div className="text-sm text-slate-400">
          {filteredLogs.length} logs displayed
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-slate-800/50 border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Search</label>
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Machine</label>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Machines</SelectItem>
                {machines.map(machine => (
                  <SelectItem key={machine} value={machine}>{machine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Severity</label>
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
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Log Viewer */}
      <Card className="bg-slate-800/50 border-slate-700">
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
