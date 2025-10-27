import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
interface FormInputProps {
  label: string;
  value: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  label,
  value,
  type = "text",
  error,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 dark:border-gray-700 focus:ring-blue-300"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
