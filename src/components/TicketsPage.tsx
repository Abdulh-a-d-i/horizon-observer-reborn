import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: string;
  machine_id: string;
  log: string;
  timestamp: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMachine, setSelectedMachine] = useState("all");
  const [machines, setMachines] = useState<string[]>([]);

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
    try {
      const response = await fetch('http://localhost:8000/tickets');
      const data: Ticket[] = await response.json();
      setTickets(data);
      
      // Extract unique machines with proper typing
      const uniqueMachines: string[] = [...new Set(data.map((ticket: Ticket) => ticket.machine_id))];
      setMachines(uniqueMachines);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const updateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8000/tickets/${ticketId}?status=${newStatus}`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        setTickets(prev => 
          prev.map(ticket => 
            ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
          )
        );
      }
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "IN_PROGRESS": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "RESOLVED": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "CLOSED": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ticket Management</h1>
          <p className="text-slate-400">Track and manage system issues</p>
        </div>
        <div className="text-sm text-slate-400">
          {filteredTickets.length} tickets
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-slate-800/50 border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Search</label>
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="flex items-end">
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSelectedMachine("all");
              }}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card className="p-8 bg-slate-800/50 border-slate-700 text-center">
            <div className="text-slate-400">No tickets found</div>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="p-6 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                    <span>Machine: {ticket.machine_id}</span>
                    <span>Created: {formatDate(ticket.created_at)}</span>
                    <span>ID: {ticket.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-slate-300 mb-3">{ticket.description}</p>
                  
                  {/* Log Preview */}
                  <div className="p-3 bg-slate-900/50 rounded border border-slate-600 font-mono text-sm">
                    <div className="text-slate-500 text-xs mb-1">Original Log:</div>
                    <div className="text-slate-200">{ticket.log}</div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <Select
                    value={ticket.status}
                    onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                  >
                    <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
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
