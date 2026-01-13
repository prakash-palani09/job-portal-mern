import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", form);
      alert("Job posted successfully 🎉");
      navigate("/recruiter/jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Job creation failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Post New Job</h2>

        <input
          name="title"
          placeholder="Job Title"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="company"
          placeholder="Company Name"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="border p-2 w-full mb-3"
          rows="4"
          onChange={handleChange}
          required
        />

        <input
          name="salary"
          placeholder="Salary (optional)"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Post Job
        </button>
      </form>
    </div>
  );
}
