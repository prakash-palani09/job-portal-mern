import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications/my")
      .then(res => setApps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      {apps.map(app => (
        <div key={app._id} className="border p-3 mb-3">
          <h3>{app.job.title}</h3>
          <p>Status: {app.status}</p>
          {app.resume && (
            <a
              href={app.resume}
              target="_blank"
              className="text-blue-600 underline"
            >
              Download Resume
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
