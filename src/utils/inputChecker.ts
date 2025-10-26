const inputChecker = {
  // 🧍 Text or name
  text: (value: string) =>
    value.trim() ? null : "This field cannot be empty.",

  name: (value: string) =>
    value.trim() ? null : "Name cannot be empty. Please provide your full name.",

  // 📧 Email
  email: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim())
      ? null
      : "Invalid email format. Please enter a valid email address.",

  // 📞 Phone
  phone: (value: string) =>
    /^(\+?\d{1,3}[-.\s]?)?\d{10}$/.test(value.trim())
      ? null
      : "Phone number must be 10 digits and can include a country code.",

  // 🔒 Password
  password: (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%^&*#])[A-Za-z\d!@$%^&*#]{8,}$/.test(value)
      ? null
      : "Password must be at least 8 characters and include letters, numbers, and a special character.",

  // 📝 Textarea
  textarea: (value: string) =>
    value.trim().length > 0 ? null : "Please enter some text.",

  // 📅 Date
  date: (value: string) =>
    value ? null : "Please select a valid date.",

  // ⏰ Time
  time: (value: string) =>
    value ? null : "Please select a valid time.",

  // 📂 File
  file: (value: File | null) =>
    value ? null : "Please select a file.",

  // ✅ Checkbox
  checkbox: (value: boolean) =>
    value ? null : "You must check this box to continue.",

  // 🔘 Radio
  radio: (value: string) =>
    value ? null : "Please select an option.",

  // ⬇️ Select dropdown
  select: (value: string) =>
    value ? null : "Please choose an option.",
};

export default inputChecker ;