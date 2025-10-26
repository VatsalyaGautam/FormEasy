```
███████╗ ██████╗ ██████╗ ███╗   ███╗███████╗ █████╗ ███████╗██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗████╗ ████║██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝
█████╗  ██║   ██║██████╔╝██╔████╔██║█████╗  ███████║███████╗ ╚████╔╝ 
██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║██╔══╝  ██╔══██║╚════██║  ╚██╔╝  
██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗██║  ██║███████║   ██║   
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
```
# 🧩 FormEasy — Beautiful, Type-Safe, and Minimal React Form Handling

> A lightweight, fully type-safe React + TypeScript form validation library built for modern UI — with Shadcn/Tailwind styling, live validation, and zero boilerplate.

![Vite](https://img.shields.io/badge/Vite-React-blue?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- ⚡ **Type-safe hook** – `useFormEasy<T>` with full TypeScript generics.
- 💡 **Instant validation** – run validation as you type (debounced).
- 🧠 **Built-in validators** – email, password, phone, date, select, radio, and more.
- 🎨 **Pre-styled inputs** – ready-to-use components with Shadcn/Tailwind.
- 🔁 **Reusable** – plug-and-play across forms of any shape.
- 🧰 **Utility hooks** – includes `useDebounce`, `useThrottle`, and helpers.
- 🧼 **Husky + Prettier + ESLint** ready – enforces clean commits automatically.

---

## 🏗️ Project Structure

src/
├── components/
│   ├── FormInput.tsx
│   ├── FormTextarea.tsx
│   ├── FormSelect.tsx
│   ├── FormCheckbox.tsx
│   ├── FormRadio.tsx
│   └── FormWrapper.tsx
│
├── hooks/
│   ├── useFormEasy.ts
│   ├── useDebounce.ts
│   └── useThrottle.ts
│
├── utils/
│   ├── validators.ts
│   ├── getError.ts
│   └── helpers.ts
│
├── lib/
│   └── utils.ts
│
├── App.tsx
└── main.tsx

---

## ⚙️ Installation

Clone or fork the repo, then install dependencies:

```bash
git clone https://github.com/<your-username>/form-easy.git
cd form-easy
npm install
npm run dev


⸻

🧠 Usage Example

Here’s a full working form using useFormEasy and built-in components 👇

import useFormEasy from "./hooks/useFormEasy";
import FormWrapper from "./components/FormWrapper";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";
import FormCheckbox from "./components/FormCheckbox";
import FormRadio from "./components/FormRadio";

export default function App() {
  const { values, errors, handleChange, handleSubmit } = useFormEasy(
    {
      name: "",
      email: "",
      password: "",
      bio: "",
      gender: "",
      country: "",
      agree: false,
    },
    (vals) => console.log("✅ Form submitted:", vals)
  );

  return (
    <FormWrapper
      title="FormEasy Example"
      description="Beautifully validated form built with useFormEasy"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Full Name"
        value={values.name}
        error={errors.name}
        onChange={(v) => handleChange("name", v)}
      />

      <FormInput
        label="Email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(v) => handleChange("email", v)}
      />

      <FormInput
        label="Password"
        type="password"
        value={values.password}
        error={errors.password}
        onChange={(v) => handleChange("password", v)}
      />

      <FormSelect
        label="Country"
        value={values.country}
        error={errors.country}
        onChange={(v) => handleChange("country", v)}
        options={[
          { label: "India", value: "IN" },
          { label: "USA", value: "US" },
          { label: "Canada", value: "CA" },
        ]}
      />

      <FormRadio
        label="Gender"
        name="gender"
        value={values.gender}
        error={errors.gender}
        onChange={(v) => handleChange("gender", v)}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]}
      />

      <FormTextarea
        label="Short Bio"
        value={values.bio}
        error={errors.bio}
        onChange={(v) => handleChange("bio", v)}
      />

      <FormCheckbox
        label="I agree to the terms"
        checked={values.agree}
        error={errors.agree}
        onChange={(v) => handleChange("agree", v)}
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Submit
      </button>
    </FormWrapper>
  );
}


⸻

🔍 Validators

All validation logic lives in /src/utils/validators.ts.

Built-in validators include:

Field	Validation Rule
name	Must not be empty
email	Must follow valid email format
phone	10-digit or country code format
password	Must contain upper, lower, number, special char
select	Must select one option
radio	Must choose an option
checkbox	Must be checked
file	File required
date, time	Must be provided
textarea	Must not be empty

You can easily extend it:

validationSchemas.username = (value) =>
  value.length < 4 ? "Username too short" : null;


⸻

⚡ Debounce Hook Example

Your custom debounce hook (useDebounce.ts):

import { useRef } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), delay);
  };
}

Use it inside your input:

const debouncedChange = useDebounce(onChange, 400);
onChange={(e) => debouncedChange(e.target.value)}


⸻

🧰 Available Components

Component	Purpose
FormWrapper	Wraps the form with consistent styling
FormInput	Text / email / password input
FormSelect	Dropdown field
FormTextarea	Multiline input
FormCheckbox	Boolean field
FormRadio	Radio group

All are styled with Shadcn + TailwindCSS and follow the same prop structure:

interface FormInputProps {
  label: string;
  value: string;
  error?: string;
  type?: string;
  onChange: (value: string) => void;
}


⸻

🧹 Developer Setup

Run locally

npm run dev

Format + Lint (runs automatically on commit via Husky)

npm run format
npm run lint

Build for production

npm run build


⸻

🌈 Roadmap
	•	Add resetForm and isSubmitting
	•	Async validation example
	•	Add FormButton component with loading state
	•	Add dark/light theme toggle
	•	Support dynamic JSON-based form builder
	•	Publish as npm package @vatsalya/form-easy

⸻

💖 Acknowledgements
	•	Shadcn/UI for inspiration and UI base
	•	Tailwind CSS for styling
	•	React and Vite for fast dev setup

⸻

📜 License

Licensed under the MIT License — free to use and modify.

⸻

🚀 Author

Vatsalya Gautam

⸻


