import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";

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
      </Routes>
    </>
  );
}
