import { useState } from "react";
import { getError } from "../utils/validators";

export default function useFormEasy<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

  const handleChange = (name: keyof T, value: any) => {
    // 1️⃣ Update value
    setValues((prev) => ({ ...prev, [name]: value }));

    // 2️⃣ Live validate this field
    const error = getError(name as string, value);
    setErrors((prev) => ({ ...prev, [name]: error || "" }));
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