import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get(`/applications/job/${jobId}`)
      .then(res => setApps(res.data.applications))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Applicants</h2>

      {apps.map(app => (
        <div key={app._id} className="border p-3 mt-2">
          <p>{app.applicant.email}</p>
          <p>Status: {app.status}</p>

          <a
            href={app.resume}
            target="_blank"
            className="text-blue-600 underline"
          >
            Download Resume
          </a>

          <select
            onChange={(e) =>
              api.patch(`/applications/${app._id}/status`, {
                status: e.target.value,
              })
            }
          >
            <option>applied</option>
            <option>shortlisted</option>
            <option>rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
}
