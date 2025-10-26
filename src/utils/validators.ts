export const isEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
export const isRequired = (value: any) =>
  value === null || value === undefined || value === "" ? "This field is required" : "";

export function validateForm(values: Record<string, any>) {
  const errors: Record<string, string> = {};

  if (!values.username) errors.username = "Username is required";
  if (!values.email) errors.email = "Email is required";
  else if (!isEmail(values.email)) errors.email = "Invalid email address";

  return errors;
}