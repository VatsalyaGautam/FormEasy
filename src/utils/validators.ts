
import inputChecker from "./inputChecker";
type ValidatorFn = (v: any) => string | null;

export function getError(type: string, value: any): string | null {
  const validator = inputChecker[type as keyof typeof inputChecker] as ValidatorFn | undefined;
  if (validator) return validator(value);
  if (typeof value === "string" && !value.trim()) return "This field is required.";
  return null;
}