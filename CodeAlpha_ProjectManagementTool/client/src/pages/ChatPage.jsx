import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/messages/${id}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await API.post("/messages", {
      text,
      project: id
    });

    setText("");
    fetchMessages();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h2 className="text-2xl font-bold mb-6">
            Team Chat
          </h2>

          <div className="bg-white p-6 rounded-xl shadow mb-4 h-96 overflow-y-auto">
            {messages.map(m => (
              <div key={m._id} className="mb-3">
                <b>{m.user?.name}</b>: {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              className="border p-2 rounded w-full"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type message..."
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-5 rounded"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
