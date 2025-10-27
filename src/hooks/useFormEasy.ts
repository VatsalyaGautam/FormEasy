import { useState } from "react";
import { getError } from "../utils/validators";
import useDebounce from "./useDebounce";

export default function useFormEasy<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<
    keyof T,
    string
  >);

  // 🧠 Debounce field validation, not the input update
  const debouncedValidate = useDebounce(
    (name: keyof T, value: any) => {
      const error = getError(name as string, value);
      setErrors((prev) => ({ ...prev, [name]: error || "" }));
    },
    400 // Adjust delay for validation responsiveness
  );

  const handleChange = (name: keyof T, value: any) => {
    // Instant value update
    setValues((prev) => ({ ...prev, [name]: value }));

    // Debounced validation — avoids laggy input
    debouncedValidate(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;

    for (const key in values) {
      const value = values[key];
      const error = getError(key as string, value);
      if (error) newErrors[key] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({} as Record<keyof T, string>);
    onSubmit(values);
  };

  return { values, errors, handleChange, handleSubmit };
}