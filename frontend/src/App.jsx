import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

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
        <Route path="/applications" element={<MyApplications />} />
      </Routes>
    </>
  );
}
