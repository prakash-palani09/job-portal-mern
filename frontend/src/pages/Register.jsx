import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const [msg, setMsg] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "", type: "" });

    try {
      await api.post("/auth/register", form);
      setMsg({ text: "Registration successful 🎉", type: "success" });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Registration failed ❌",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {msg.text && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              msg.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Register
        </button>
      </form>
    </div>
  );
}
