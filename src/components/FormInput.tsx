import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormInputProps {
  label: string;
  value: string;
  type?: string;
  error?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

export default function FormInput({
  label,
  value,
  type = "text",
  error,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}