import { useEffect, useState } from "react";
import api from "../api/axios";

export default function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs/my")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">My Jobs</h2>

      {jobs.map(job => (
        <div key={job._id} className="border p-3 mt-2">
          <h3>{job.title}</h3>
          <a
            href={`/recruiter/jobs/${job._id}`}
            className="text-blue-600 underline"
          >
            View Applicants
          </a>
        </div>
      ))}
    </div>
  );
}
