import { useEffect, useState } from "react";
import socket from "../socket";
import API from "../api/api";

const ChatPanel = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const res = await API.get(`/messages/${projectId}`);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();

    socket.on("newMessage", msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off("newMessage");
  }, [projectId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await API.post("/messages", {
      text,
      project: projectId
    });

    setText("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow h-full flex flex-col">

      <h3 className="font-bold mb-3">Team Chat</h3>

      <div className="flex-1 overflow-y-auto mb-3 space-y-2">
        {messages.map(m => (
          <div key={m._id} className="bg-gray-100 p-2 rounded">
            <b>{m.user?.name || "User"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Message..."
        />

        <button
          onClick={sendMessage}
          className="btn btn-primary"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default ChatPanel;
