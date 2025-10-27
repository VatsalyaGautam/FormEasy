import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

interface FormCheckboxProps {
  label: string;
  checked: boolean;
  error?: string;
  onChange: (v: boolean) => void;
}

export default function FormCheckbox({
  label,
  checked,
  error,
  onChange,
}: FormCheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Checkbox checked={checked} onCheckedChange={onChange} id={label} />
        <Label htmlFor={label}>{label}</Label>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}