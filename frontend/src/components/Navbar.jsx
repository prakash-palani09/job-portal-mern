import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link to="/" className="font-bold">Job Portal</Link>

      {user?.role === "jobseeker" && (
         <Link to="/applications">My Applications</Link>
      )}

      {user?.role === "recruiter" && (
          <Link to="/recruiter/jobs">Dashboard</Link>
      )}

    </nav>
  );
}
