import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const handleApply = async () => {
    setMsg({ text: "", type: "" });

    if (!file) {
      setMsg({ text: "Please upload resume", type: "error" });
      return;
    }

    try {
      // 1️⃣ Apply for job
      const res = await api.post(`/applications/apply/${jobId}`);
      const appId = res.data.application._id;

      // 2️⃣ Upload resume
      const formData = new FormData();
      formData.append("resume", file);

      await api.post(`/applications/${appId}/resume`, formData);

      setMsg({ text: "Applied successfully 🎉", type: "success" });
      setTimeout(() => navigate("/applications"), 1500);
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Apply failed ❌",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Apply for Job</h2>

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
          type="file"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleApply}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
