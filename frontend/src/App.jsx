import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";
import Applicants from "./pages/Applicants";
import Apply from "./pages/Apply";
import RecruiterJobs from "./pages/RecruiterJobs";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={user ? <Jobs /> : <Navigate to="/login" />}
        />
        <Route path="/applications" element={user ? <MyApplications /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/jobs/:jobId/apply"
          element={user ? <Apply /> : <Navigate to="/login" />}
        />
        <Route
          path="/recruiter/jobs"
          element={user && user.role === "recruiter" ? <RecruiterJobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/recruiter/jobs/:jobId"
          element={user && user.role === "recruiter" ? <Applicants /> : <Navigate to="/login" />}
        />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route
          path="/recruiter/jobs/create"
          element={<CreateJob />}
        />
      </Routes>
    </>
  );
}
