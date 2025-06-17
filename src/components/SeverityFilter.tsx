
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SeverityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SeverityFilter = ({ value, onChange }: SeverityFilterProps) => {
  const severities = [
    { value: "all", label: "All Severities" },
    { value: "CRITICAL", label: "Critical" },
    { value: "ERROR", label: "Error" },
    { value: "WARNING", label: "Warning" },
    { value: "INFO", label: "Info" },
    { value: "DEBUG", label: "Debug" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
        <SelectValue placeholder="Select severity" />
      </SelectTrigger>
      <SelectContent className="bg-slate-700 border-slate-600">
        {severities.map(severity => (
          <SelectItem key={severity.value} value={severity.value}>
            {severity.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SeverityFilter;
