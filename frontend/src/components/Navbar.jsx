import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link to="/" className="font-bold">Job Portal</Link>

      {user ? (
        <div className="flex gap-4">
          <span>{user.email}</span>
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
