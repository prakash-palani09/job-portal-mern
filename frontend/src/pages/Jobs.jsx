import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [selectedJob, setSelectedJob] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get("/jobs")
      .then(res => {
        console.log("RAW JOBS RESPONSE", res.data);

        const data = Array.isArray(res.data) ? res.data : res.data.jobs;

        console.log("PARSED JOBS DATA", data);
        setJobs(data || []);
      })
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
            onClick={() => setSelectedJob(job._id)}
            className="mt-2 bg-black text-white px-3 py-1">
                Apply & Upload Resume
          </button>

        </div>
      ))}

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="font-bold mb-4">Upload Resume</h3>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setFile(null);
                }}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    // 1️⃣ Apply
                    const applyRes = await api.post(
                      `/applications/apply/${selectedJob}`
                    );

                    const appId = applyRes.data.application._id;

                    // 2️⃣ Upload resume
                    const formData = new FormData();
                    formData.append("resume", file);

                    await api.post(
                      `/applications/${appId}/resume`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    alert("Applied + Resume uploaded 🎉");
                    setSelectedJob(null);
                    setFile(null);
                  } catch (err) {
                    alert(err.response?.data?.message || "Failed");
                  }
                }}
                className="bg-black text-white px-4 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
