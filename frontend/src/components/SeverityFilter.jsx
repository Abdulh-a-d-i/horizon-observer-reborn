
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SeverityFilter = ({ value, onChange }) => {
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
      <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white">
        <SelectValue placeholder="Select severity" />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
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
