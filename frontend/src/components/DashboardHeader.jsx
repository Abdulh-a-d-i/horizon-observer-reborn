
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="bg-slate-800 text-white px-6 py-4 border-b border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">R</span>
          </div>
          <div>
            <div className="font-bold text-lg">Resolvix</div>
            <div className="text-slate-400 text-sm">Logs & Incident Management</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
