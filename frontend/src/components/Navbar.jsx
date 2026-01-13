import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
      <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Portal</h1>

        <div className="flex gap-6 items-center">
          {user?.role === "jobseeker" && (
            <Link to="/applications" className="text-gray-600 hover:text-black">
              My Applications
            </Link>
          )}

          {user?.role === "recruiter" && (
            <>
              <Link to="/recruiter/jobs">
                My Jobs
              </Link>
              <Link to="/recruiter/jobs/create">
                Post Job
              </Link>
            </>
            
          )}

          {user && (
            <button
              onClick={logout}
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>

  );
}
