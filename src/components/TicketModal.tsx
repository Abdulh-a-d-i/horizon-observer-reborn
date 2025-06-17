
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface LogEntry {
  machine_id: string;
  log: string;
  timestamp: string;
  severity: string;
}

interface TicketModalProps {
  log: LogEntry;
  onCreateTicket: (ticketData: { title: string; description: string }) => void;
  onClose: () => void;
}

const TicketModal = ({ log, onCreateTicket, onClose }: TicketModalProps) => {
  const [title, setTitle] = useState(`${log.severity} on ${log.machine_id}`);
  const [description, setDescription] = useState(log.log);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTicket({ title, description });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "text-red-400";
      case "ERROR": return "text-orange-400";
      case "WARNING": return "text-yellow-400";
      default: return "text-blue-400";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Create Ticket</h2>
          <p className="text-slate-400">Create a ticket for this log entry</p>
        </div>

        {/* Log Preview */}
        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                {log.machine_id}
              </span>
              <span className={`text-xs font-medium ${getSeverityColor(log.severity)}`}>
                {log.severity}
              </span>
            </div>
            <span className="text-xs text-slate-500">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-slate-200 font-mono">
            {log.log}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-slate-200">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-slate-200">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white min-h-24"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Create Ticket
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TicketModal;
