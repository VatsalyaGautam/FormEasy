import useFormEasy from "./hooks/useFormEasy";
import { validateForm } from "./utils/validators";

export default function App() {
  const { values, errors, handleChange, handleSubmit } = useFormEasy(
    { username: "", email: "" },
    validateForm
  );

  return (
    <form onSubmit={handleSubmit((v) => console.log("✅", v))} className="p-6 max-w-sm mx-auto">
      <div>
        <input
          placeholder="Username"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div className="mt-3">
        <input
          placeholder="Email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border p-2 rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <button className="bg-blue-600 text-white rounded px-4 py-2 mt-4">Submit</button>
    </form>
  );
}