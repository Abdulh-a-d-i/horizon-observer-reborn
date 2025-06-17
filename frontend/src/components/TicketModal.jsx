
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const TicketModal = ({ log, onCreateTicket, onClose }) => {
  const [title, setTitle] = useState(`${log.severity} on ${log.machine_id}`);
  const [description, setDescription] = useState(log.log);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsCreating(true);
    
    try {
      await onCreateTicket({ title, description });
      toast.success("Ticket created successfully");
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket");
    } finally {
      setIsCreating(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL": return "text-red-600 dark:text-red-400";
      case "ERROR": return "text-orange-600 dark:text-orange-400";
      case "WARNING": return "text-yellow-600 dark:text-yellow-400";
      default: return "text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Create Ticket</h2>
          <p className="text-gray-600 dark:text-slate-400">Create a ticket for this log entry</p>
        </div>

        {/* Log Preview */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded text-gray-700 dark:text-slate-300">
                {log.machine_id}
              </span>
              <span className={`text-xs font-medium ${getSeverityColor(log.severity)}`}>
                {log.severity}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-slate-500">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-gray-900 dark:text-slate-200 font-mono">
            {log.log}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-700 dark:text-slate-200">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 dark:text-slate-200">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white min-h-24"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {isCreating ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TicketModal;
