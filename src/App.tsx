import useFormEasy from "./hooks/useFormEasy";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextarea";
import FormSelect from "./components/FormSelect";
import FormCheckbox from "./components/FormCheckbox";
import FormRadio from "./components/FormRadio";
import FormWrapper from "./components/FormWrapper";

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
  title="Form Easy Example"
  description="Beautifully validated form built with useFormEasy"
  onSubmit={handleSubmit}
>

      {/* 🟦 Name */}
      <FormInput
        label="Full Name"
        value={values.name}
        error={errors.name}
        onChange={(v) => handleChange("name", v)}
      />

      {/* 🟦 Email */}
      <FormInput
        label="Email Address"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(v) => handleChange("email", v)}
      />

      {/* 🟦 Password */}
      <FormInput
        label="Password"
        type="password"
        value={values.password}
        error={errors.password}
        onChange={(v) => handleChange("password", v)}
      />

      {/* 🟨 Select */}
      <FormSelect
        label="Country"
        value={values.country}
        onChange={(v) => handleChange("country", v)}
        error={errors.country}
        options={[
          { label: "India", value: "IN" },
          { label: "USA", value: "US" },
          { label: "Canada", value: "CA" },
        ]}
      />

      {/* 🟩 Radio */}
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

      {/* 🟦 Textarea */}
      <FormTextarea
        label="Short Bio"
        value={values.bio}
        error={errors.bio}
        onChange={(v) => handleChange("bio", v)}
      />

      {/* 🟩 Checkbox */}
      <FormCheckbox
        label="I agree to the terms"
        checked={values.agree}
        error={errors.agree}
        onChange={(v) => handleChange("agree", v)}
      />

      {/* 🟢 Submit */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
      >
        Submit
      </button>
    </FormWrapper>
  );
}