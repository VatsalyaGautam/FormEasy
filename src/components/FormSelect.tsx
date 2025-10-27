import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "../components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  options: Option[];
}

export default function FormSelect({
  label,
  value,
  error,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
