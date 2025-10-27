import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

interface FormTextareaProps {
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function FormTextarea({
  label,
  value,
  error,
  onChange,
  placeholder,
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
