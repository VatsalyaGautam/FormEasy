import { useState } from "react";

export default function useFormEasy<T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (callback: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) callback(values);
  };

  return { values, errors, handleChange, handleSubmit };
}