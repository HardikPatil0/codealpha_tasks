import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white items-center justify-center p-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            ProjectFlow
          </h1>

          <p className="text-gray-400 leading-relaxed">
            Manage projects, collaborate with teams,
            track progress and streamline your workflow —
            all in one place.
          </p>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-10 rounded-xl shadow-sm border"
        >
          <h2 className="text-3xl font-semibold mb-6">
            Sign in
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-800"
            required
          />

          <button className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-black transition">
            Sign In
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-slate-900 font-semibold"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
