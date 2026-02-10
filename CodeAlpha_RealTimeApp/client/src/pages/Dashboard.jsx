import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const createMeeting = () => {
    const meetingCode = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${meetingCode}`);
  };

  const joinMeeting = () => {
    if (!code) return alert("Enter meeting code");
    navigate(`/room/${code}`);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">

      <h1 className="text-3xl mb-6">Meeting Dashboard</h1>

      <button
        onClick={createMeeting}
        className="bg-green-600 px-6 py-3 rounded mb-6"
      >
        Create Meeting
      </button>

      <div className="flex gap-2">
        <input
          placeholder="Paste Meeting Code"
          className="p-2 text-black"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button
          onClick={joinMeeting}
          className="bg-blue-600 px-4 rounded"
        >
          Join
        </button>
      </div>
    </div>
  );
}
