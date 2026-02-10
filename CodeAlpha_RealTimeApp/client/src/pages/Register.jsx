import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", {
      name,
      email,
      password,
    });

    nav("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded text-white w-80">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="w-full p-2 mb-3 text-black"
          onChange={e => setName(e.target.value)}
        />

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
          onClick={register}
          className="bg-blue-600 w-full py-2 rounded"
        >
          Register
        </button>

        <p
          className="text-center mt-3 cursor-pointer"
          onClick={() => nav("/")}
        >
          Already have account? Login
        </p>
      </div>
    </div>
  );
}
