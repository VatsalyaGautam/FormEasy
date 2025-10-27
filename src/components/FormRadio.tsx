import {
  RadioGroup,
  RadioGroupItem,
} from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

interface Option {
  label: string;
  value: string;
}

interface FormRadioProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  error?: string;
  onChange: (v: string) => void;
}

export default function FormRadio({
  label,
  name,
  value,
  options,
  error,
  onChange,
}: FormRadioProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex gap-4 mt-1"
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <RadioGroupItem value={opt.value} id={`${name}-${opt.value}`} />
            <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}