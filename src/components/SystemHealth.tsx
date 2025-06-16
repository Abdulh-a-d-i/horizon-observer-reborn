
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface MachineHealth {
  id: string;
  name: string;
  status: "online" | "offline" | "warning";
  cpu: number;
  memory: number;
  disk: number;
  lastSeen: string;
}

const SystemHealth = () => {
  const [machines, setMachines] = useState<MachineHealth[]>([]);

  useEffect(() => {
    // Simulate machine health data
    setMachines([
      {
        id: "1",
        name: "web-server-01",
        status: "online",
        cpu: 45,
        memory: 67,
        disk: 34,
        lastSeen: "1 min ago"
      },
      {
        id: "2",
        name: "api-server-02",
        status: "warning",
        cpu: 78,
        memory: 89,
        disk: 56,
        lastSeen: "2 min ago"
      },
      {
        id: "3",
        name: "db-server-01",
        status: "online",
        cpu: 32,
        memory: 54,
        disk: 67,
        lastSeen: "30 sec ago"
      },
      {
        id: "4",
        name: "cache-server-01",
        status: "offline",
        cpu: 0,
        memory: 0,
        disk: 0,
        lastSeen: "15 min ago"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "offline": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "online": return "bg-green-400";
      case "warning": return "bg-yellow-400";
      case "offline": return "bg-red-400";
      default: return "bg-slate-400";
    }
  };

  return (
    <div className="space-y-4">
      {machines.map((machine) => (
        <div key={machine.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${getStatusDot(machine.status)}`}></div>
              <span className="text-white font-medium">{machine.name}</span>
              <span className={`text-sm capitalize ${getStatusColor(machine.status)}`}>
                {machine.status}
              </span>
            </div>
            <span className="text-xs text-slate-500">{machine.lastSeen}</span>
          </div>

          {machine.status !== "offline" && (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">CPU</span>
                  <span className="text-slate-300">{machine.cpu}%</span>
                </div>
                <Progress value={machine.cpu} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Memory</span>
                  <span className="text-slate-300">{machine.memory}%</span>
                </div>
                <Progress value={machine.memory} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Disk</span>
                  <span className="text-slate-300">{machine.disk}%</span>
                </div>
                <Progress value={machine.disk} className="h-2" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SystemHealth;
