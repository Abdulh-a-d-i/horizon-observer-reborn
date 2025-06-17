
import { useState, useEffect, useRef } from "react";

interface LogEntry {
  machine_id: string;
  log: string;
  timestamp: string;
  severity: string;
  source?: string;
}

interface LogViewerProps {
  logs: LogEntry[];
  onLogClick: (log: LogEntry) => void;
}

const LogViewer = ({ logs, onLogClick }: LogViewerProps) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs, autoScroll]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL": return "text-red-400 bg-red-900/20 border-red-500/30";
      case "ERROR": return "text-orange-400 bg-orange-900/20 border-orange-500/30";
      case "WARNING": return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30";
      case "INFO": return "text-blue-400 bg-blue-900/20 border-blue-500/30";
      case "DEBUG": return "text-green-400 bg-green-900/20 border-green-500/30";
      default: return "text-slate-400 bg-slate-900/20 border-slate-500/30";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="h-96 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Log Stream</h3>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded border-slate-600 bg-slate-700"
            />
            <span>Auto-scroll</span>
          </label>
          <div className="text-sm text-slate-400">
            {logs.length} logs
          </div>
        </div>
      </div>

      {/* Log Content */}
      <div 
        ref={logContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm bg-slate-900/50"
      >
        {logs.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            No logs available. Waiting for log data...
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              onClick={() => onLogClick(log)}
              className={`p-3 rounded border cursor-pointer hover:bg-slate-700/30 transition-colors ${getSeverityColor(log.severity)}`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-3">
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                    {log.machine_id}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(log.severity)}`}>
                    {log.severity}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {formatTimestamp(log.timestamp)}
                </span>
              </div>
              <div className="text-slate-200 break-words">
                {log.log}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogViewer;
