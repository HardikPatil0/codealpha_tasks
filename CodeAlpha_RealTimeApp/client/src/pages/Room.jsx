import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

export default function Room() {
  const { id } = useParams();

  const localVideo = useRef();
  const canvasRef = useRef();
  const peers = useRef({});

  const [remoteStreams, setRemoteStreams] = useState([]);
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState("");
  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    socket.emit("join-room", id);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideo.current.srcObject = stream;

        socket.on("user-joined", userId => {
          const peer = createPeer(userId, stream);
          peers.current[userId] = peer;
        });

        socket.on("offer", async data => {
          const peer = addPeer(data.from, stream);
          await peer.setRemoteDescription(data.offer);

          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);

          socket.emit("answer", {
            to: data.from,
            answer,
          });
        });

        socket.on("answer", data => {
          peers.current[data.from]
            .setRemoteDescription(data.answer);
        });

        socket.on("ice-candidate", data => {
          peers.current[data.from]
            .addIceCandidate(data.candidate);
        });
      });

    socket.on("receive-message", m =>
      setMessages(prev => [...prev, m])
    );

    socket.on("draw", d => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.fillRect(d.x, d.y, 3, 3);
    });

    socket.on("file-share", file => {
      setFiles(prev => [...prev, file]);
    });

  }, [id]);

  const createPeer = (userId, stream) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach(track =>
      peer.addTrack(track, stream)
    );

    peer.ontrack = e => {
      setRemoteStreams(prev => {
        const exists = prev.find(s => s.id === e.streams[0].id);
        if (exists) return prev;
        return [...prev, e.streams[0]];
      });
    };

    peer.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: e.candidate,
        });
      }
    };

    peer.createOffer().then(offer => {
      peer.setLocalDescription(offer);
      socket.emit("offer", { to: userId, offer });
    });

    return peer;
  };

  const addPeer = (userId, stream) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach(track =>
      peer.addTrack(track, stream)
    );

    peer.ontrack = e => {
      setRemoteStreams(prev => {
        const exists = prev.find(s => s.id === e.streams[0].id);
        if (exists) return prev;
        return [...prev, e.streams[0]];
      });
    };

    peer.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("ice-candidate", {
          to: userId,
          candidate: e.candidate,
        });
      }
    };

    peers.current[userId] = peer;
    return peer;
  };

  const shareScreen = async () => {
    const screenStream =
      await navigator.mediaDevices.getDisplayMedia({ video: true });

    Object.values(peers.current).forEach(peer => {
      const sender = peer
        .getSenders()
        .find(s => s.track.kind === "video");

      sender.replaceTrack(screenStream.getVideoTracks()[0]);
    });

    screenStream.getVideoTracks()[0].onended = async () => {
      const cam =
        await navigator.mediaDevices.getUserMedia({ video: true });

      Object.values(peers.current).forEach(peer => {
        const sender = peer
          .getSenders()
          .find(s => s.track.kind === "video");

        sender.replaceTrack(cam.getVideoTracks()[0]);
      });
    };
  };

  const sendMessage = () => {
    socket.emit("send-message", { room: id, message: msg });
    setMsg("");
  };

  const draw = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 3, 3);

    socket.emit("draw", { room: id, x, y });
  };

  const shareFile = e => {
    const reader = new FileReader();

    reader.onload = () => {
      socket.emit("file-share", {
        room: id,
        file: reader.result,
      });
      setFiles(prev => [...prev, reader.result]);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-4 gap-3 p-4">
        <video ref={localVideo} autoPlay muted className="rounded" />

        {remoteStreams.map((s, i) => (
          <video
            key={i}
            autoPlay
            ref={v => v && (v.srcObject = s)}
            className="rounded"
          />
        ))}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-3 flex justify-center gap-4">
        <button onClick={shareScreen}>Screen</button>
        <button onClick={() => setSidebar("chat")}>Chat</button>
        <button onClick={() => setSidebar("whiteboard")}>Whiteboard</button>
        <button onClick={() => setSidebar("file")}>Files</button>
      </div>

      {/* Sidebar */}
      {sidebar && (
        <div className="absolute right-0 top-0 w-80 h-full bg-gray-800 p-4">

          {sidebar === "chat" && (
            <>
              <div className="h-80 overflow-y-auto">
                {messages.map((m, i) => (
                  <div key={i}>{m}</div>
                ))}
              </div>

              <input
                className="text-black w-full"
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />

              <button onClick={sendMessage}>Send</button>
            </>
          )}

          {sidebar === "whiteboard" && (
            <canvas
              ref={canvasRef}
              width={300}
              height={400}
              className="bg-black"
              onMouseMove={draw}
            />
          )}

          {sidebar === "file" && (
            <>
              <input type="file" onChange={shareFile} />

              <div className="mt-4">
                {files.map((f, i) => (
                  <a
                    key={i}
                    href={f}
                    download={`file-${i}`}
                    className="block underline"
                  >
                    Download File {i + 1}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
