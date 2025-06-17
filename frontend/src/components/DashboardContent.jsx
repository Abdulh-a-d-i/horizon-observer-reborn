
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Activity, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardContent = () => {
  const stats = [
    {
      title: "Open Tickets",
      value: "23",
      change: "+12% from last week",
      changeType: "increase",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Resolved Today",
      value: "8",
      change: "+35% from last week",
      changeType: "increase",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Active Logs",
      value: "1,247",
      change: "-3% from last week",
      changeType: "decrease",
      icon: Activity,
      color: "blue",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2 from last week",
      changeType: "increase",
      icon: Users,
      color: "purple",
    },
  ];

  const recentTickets = [
    {
      id: "INC-001",
      title: "Database connection timeout",
      assignee: "@John Smith",
      time: "2 minutes ago",
      priority: "critical",
    },
    {
      id: "INC-002",
      title: "API rate limit exceeded",
      assignee: "@Sarah Johnson",
      time: "15 minutes ago",
      priority: "high",
    },
    {
      id: "INC-003",
      title: "Memory usage spike",
      assignee: "@Mike Wilson",
      time: "1 hour ago",
      priority: "medium",
    },
  ];

  const recentLogs = [
    {
      type: "error",
      source: "api-gateway",
      message: "Failed to connect to database",
      time: "14:32:15",
    },
    {
      type: "warning",
      source: "app-server",
      message: "High memory usage detected",
      time: "14:30:42",
    },
    {
      type: "error",
      source: "auth-service",
      message: "Authentication service timeout",
      time: "14:28:33",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLogTypeColor = (type) => {
    switch (type) {
      case "error": return "bg-red-100 text-red-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's what's happening with your systems.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-slate-800 border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="text-slate-400 text-sm">{stat.title}</div>
                <Icon className="h-5 w-5 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className={`text-xs ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Tickets</h3>
              <p className="text-slate-400 text-sm">Latest incident tickets requiring attention</p>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-start justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-white">{ticket.id}</span>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-1">{ticket.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span>{ticket.assignee}</span>
                    <span>•</span>
                    <span>{ticket.time}</span>
                  </div>
                </div>
                <AlertTriangle className="h-5 w-5 text-slate-400" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Logs */}
        <Card className="p-6 bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Logs</h3>
              <p className="text-slate-400 text-sm">Latest system logs and alerts</p>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg">
                <Activity className="h-4 w-4 text-slate-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getLogTypeColor(log.type)}>
                      {log.type}
                    </Badge>
                    <span className="text-xs text-slate-400">{log.source}</span>
                  </div>
                  <p className="text-sm text-slate-300">{log.message}</p>
                </div>
                <span className="text-xs text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
