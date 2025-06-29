import React, { useEffect, useState, useRef } from "react";
import StudentChat from "./StudentChat";
import toast from "react-hot-toast";

const StudentLive = () => {
  const [chat, setChat] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socket.onopen = () => socket.send(JSON.stringify({ type: "receiver" }));

    let pc = null;
    socket.onmessage = async event => {
      const msg = JSON.parse(event.data);
      if (msg.type === "createOffer") {
        pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
        pc.onicecandidate = e => e.candidate && socket.send(JSON.stringify({ type: "iceCandidate", candidate: e.candidate }));
        pc.ontrack = e => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = new MediaStream([e.track]); };
        await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "createAnswer", sdp: pc.localDescription }));
      } else if (msg.type === "iceCandidate" && pc) {
        await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
      } else if (msg.type === "title") {
        toast.success(msg.data);
        setTitle(msg.data);
      } else if (msg.type === "description") {
        toast.success(msg.data);
        setDesc(msg.data);
      }
    };

    return () => { pc?.close(); socket.close(); };
  }, []);

  return (
    <div className="flex flex-col bg-richblack-900 min-h-screen px-4 sm:px-6 md:px-8 mt-16">
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Video */}
        <div className="relative w-full lg:w-[70%] h-[250px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <video ref={remoteVideoRef} className="w-full h-full object-cover rounded-lg" autoPlay muted playsInline></video>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          <div className="absolute bottom-2 right-2 bg-red-600 text-xs px-2 py-1 rounded animate-ping">LIVE</div>
        </div>
        {/* Chat */}
        <div className="flex flex-col w-full lg:w-[30%] gap-3">
          <button onClick={() => setChat(!chat)} className="bg-blue-500 text-black px-3 py-2 rounded text-sm font-semibold">
            {chat ? "Hide Chat" : "Show Chat"}
          </button>
          {chat && <StudentChat />}
        </div>
      </div>
      <div className="max-w-3xl">
        <p className="text-xl font-semibold text-white">{title}</p>
        <p className="text-richblack-400">{desc}</p>
      </div>
    </div>
  );
};

export default StudentLive;
