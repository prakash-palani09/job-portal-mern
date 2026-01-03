import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);
      console.log("LOGIN SUCCESS:", res.data);
      alert("Login successful");



    } catch (err) {
      alert(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-6 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-black text-white p-2 w-full">
        Login
      </button>
    </form>
  );
}
