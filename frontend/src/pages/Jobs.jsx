import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    api.get("/jobs")
      .then(res => setJobs(res.data.jobs))
      .catch(err => console.log(err));
  }, []);

  const applyJob = async (jobId) => {
    setMsg({ text: "", type: "" });
    try {
      await api.post(`/applications/apply/${jobId}`);
      setMsg({ text: "Applied successfully 🎉", type: "success" });
    } catch (err) {
      setMsg({
        text: err.response?.data?.message || "Apply failed ❌",
        type: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Jobs</h2>

      {msg.text && (
        <div className={`mb-4 p-2 rounded text-center ${
          msg.type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
          {msg.text}
        </div>
      )}

      {jobs.map(job => (
        <div key={job._id} className="border p-4 mb-3">
          <h3 className="font-semibold">{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>

          <button
            onClick={() => applyJob(job._id)}
            className="mt-2 bg-black text-white px-3 py-1"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}
