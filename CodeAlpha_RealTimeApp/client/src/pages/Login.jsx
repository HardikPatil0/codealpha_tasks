import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded text-white w-80">

        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 text-black"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 text-black"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-green-600 w-full py-2 rounded"
        >
          Login
        </button>

        <p
          className="text-center mt-3 cursor-pointer"
          onClick={() => nav("/register")}
        >
          Create account
        </p>
      </div>
    </div>
  );
}
