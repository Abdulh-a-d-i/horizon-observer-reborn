
import { useState, useEffect } from "react";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulate fetching tickets
    setTickets([
      {
        id: 1,
        title: "Database Connection Error",
        status: "Open",
        priority: "High",
        machine: "web-server-01",
        createdAt: "2024-01-15 10:30:00"
      },
      {
        id: 2,
        title: "Memory Usage Warning",
        status: "In Progress",
        priority: "Medium",
        machine: "api-server-02",
        createdAt: "2024-01-15 09:15:00"
      },
      {
        id: 3,
        title: "Cache Server Offline",
        status: "Resolved",
        priority: "Critical",
        machine: "cache-server-01",
        createdAt: "2024-01-15 08:45:00"
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "text-red-400 bg-red-900/20";
      case "In Progress": return "text-yellow-400 bg-yellow-900/20";
      case "Resolved": return "text-green-400 bg-green-900/20";
      default: return "text-gray-400 bg-gray-900/20";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-500";
      case "High": return "text-orange-500";
      case "Medium": return "text-yellow-500";
      case "Low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Support Tickets</h1>
        <p className="text-gray-600 dark:text-slate-400">Manage and track system issues</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Tickets</h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-slate-700">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {ticket.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-2 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority} Priority
                    </span>
                    <span className="text-gray-500 dark:text-slate-400">
                      Machine: {ticket.machine}
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-slate-400">
                  <div>#{ticket.id}</div>
                  <div>{ticket.createdAt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
