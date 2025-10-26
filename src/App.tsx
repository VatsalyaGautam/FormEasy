import useFormEasy from "./hooks/useFormEasy";

export default function App() {
  const { values, errors, handleChange, handleSubmit } = useFormEasy(
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      date: "",
      time: "",
      agree: false,
      file: null,
      option: "",
      gender: "",
      bio: "",
    },
    (vals) => console.log("✅ Form submitted:", vals)
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg"
    >
      {/* --- Text inputs --- */}
      <input
        type="text"
        placeholder="Full name"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <input
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

      <input
        type="tel"
        placeholder="Phone"
        value={values.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <input
        type="date"
        value={values.date}
        onChange={(e) => handleChange("date", e.target.value)}
      />
      {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

      <input
        type="time"
        value={values.time}
        onChange={(e) => handleChange("time", e.target.value)}
      />
      {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

      <textarea
        placeholder="Write your bio..."
        value={values.bio}
        onChange={(e) => handleChange("bio", e.target.value)}
      />
      {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}

      {/* --- Select --- */}
      <select
        value={values.option}
        onChange={(e) => handleChange("option", e.target.value)}
      >
        <option value="">Choose an option</option>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </select>
      {errors.option && <p className="text-red-500 text-sm">{errors.option}</p>}

      {/* --- Radio --- */}
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          Female
        </label>
      </div>
      {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

      {/* --- Checkbox --- */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(e) => handleChange("agree", e.target.checked)}
        />
        I agree to the terms
      </label>
      {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

      {/* --- File --- */}
      <input
        type="file"
        onChange={(e) => handleChange("file", e.target.files?.[0] || null)}
      />
      {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}