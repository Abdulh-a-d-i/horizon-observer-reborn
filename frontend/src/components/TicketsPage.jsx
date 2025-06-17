
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.machine_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (selectedMachine !== "all") {
      filtered = filtered.filter(ticket => ticket.machine_id === selectedMachine);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, selectedMachine]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      setTimeout(() => {
        const mockTickets = [
          {
            id: "t1a2b3c4",
            machine_id: "web-server-01",
            log: "Connection timeout after 30s",
            timestamp: new Date().toISOString(),
            title: "Web Server Connection Timeout",
            description: "The web server is experiencing connection timeouts",
            status: "OPEN",
            created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
          },
          {
            id: "t2b3c4d5",
            machine_id: "db-server-01",
            log: "OOM: Out of memory: Kill process 1234 (mysqld)",
            timestamp: new Date().toISOString(),
            title: "Database Server Out of Memory",
            description: "The database server ran out of memory and had to kill some processes",
            status: "IN_PROGRESS",
            created_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
          },
          {
            id: "t3c4d5e6",
            machine_id: "api-server-02",
            log: "API rate limit exceeded by client 192.168.1.42",
            timestamp: new Date().toISOString(),
            title: "API Rate Limit Exceeded",
            description: "A client has exceeded their API rate limit",
            status: "RESOLVED",
            created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            id: "t4d5e6f7",
            machine_id: "cache-server-01",
            log: "Redis connection lost, attempting to reconnect",
            timestamp: new Date().toISOString(),
            title: "Redis Connection Issues",
            description: "The cache server lost connection to Redis",
            status: "CLOSED",
            created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          }
        ];
        
        setTickets(mockTickets);
        
        // Extract unique machines
        const uniqueMachines = [...new Set(mockTickets.map(ticket => ticket.machine_id))];
        setMachines(uniqueMachines);
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error("Failed to load tickets");
      setIsLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      // Simulate API call
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            setTickets(prev => 
              prev.map(ticket => 
                ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
              )
            );
            resolve();
          }, 500);
        }),
        {
          loading: "Updating ticket status...",
          success: "Ticket status updated",
          error: "Failed to update ticket status"
        }
      );
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "IN_PROGRESS": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "RESOLVED": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "CLOSED": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ticket Management</h1>
          <p className="text-gray-600 dark:text-slate-400">Track and manage system issues</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-slate-400">
          {filteredTickets.length} tickets
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2">Search</label>
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-slate-400 mb-2">Machine</label>
            <Select value={selectedMachine} onValueChange={setSelectedMachine}>
              <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select machine" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                <SelectItem value="all">All Machines</SelectItem>
                {machines.map(machine => (
                  <SelectItem key={machine} value={machine}>{machine}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSelectedMachine("all");
              }}
              variant="outline"
              className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="p-8 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
            <div className="text-gray-600 dark:text-slate-400">Loading tickets...</div>
          </Card>
        ) : filteredTickets.length === 0 ? (
          <Card className="p-8 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center">
            <div className="text-gray-600 dark:text-slate-400">No tickets found</div>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="p-6 bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ticket.title}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-slate-400 mb-3">
                    <span>Machine: {ticket.machine_id}</span>
                    <span>Created: {formatDate(ticket.created_at)}</span>
                    <span>ID: {ticket.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 mb-3">{ticket.description}</p>
                  
                  {/* Log Preview */}
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded border border-gray-200 dark:border-slate-600 font-mono text-sm">
                    <div className="text-gray-500 dark:text-slate-500 text-xs mb-1">Original Log:</div>
                    <div className="text-gray-900 dark:text-slate-200">{ticket.log}</div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <Select
                    value={ticket.status}
                    onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                  >
                    <SelectTrigger className="w-32 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
