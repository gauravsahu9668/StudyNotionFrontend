import React, { useEffect, useState } from 'react';
import InstructorChat from './InstructorChat';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const InstructorLive = () => {
  const [chat, setChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const [start, setStart] = useState(false);
  const [pc, setPc] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const location = useLocation();
  const Id = location.pathname.split('/')[2];

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    ws.onopen = () => ws.send(JSON.stringify({ type: "sender" }));
    setSocket(ws);
  }, []);

  const sendNotification = () => {
    toast.success("Notification sent to students");
    socket?.send(JSON.stringify({ type: "notificationsender", message: Id }));
  };

  const stopStream = () => {
    if (pc) {
      socket?.send(JSON.stringify({ type: "cancelStream" }));
      pc.getSenders().forEach(s => s.track?.stop());
      pc.close();
      setPc(null);
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      document.getElementById("localVideo").srcObject = null;
    }
    setStart(false);
  };

  const startStream = async () => {
    if (!socket) return;
    const newPc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    setPc(newPc);

    newPc.onicecandidate = e => e.candidate && socket?.send(JSON.stringify({ type: 'iceCandidate', candidate: e.candidate }));
    newPc.onnegotiationneeded = async () => {
      try {
        const offer = await newPc.createOffer();
        await newPc.setLocalDescription(offer);
        socket?.send(JSON.stringify({ type: "createOffer", sdp: newPc.localDescription }));
      } catch (error) {
        console.error("Negotiation error:", error);
      }
    };

    socket.onmessage = async e => {
      const data = JSON.parse(e.data);
      if (data.type === "createAnswer" && data.sdp) {
        await newPc.setRemoteDescription(new RTCSessionDescription(data.sdp));
      } else if (data.type === "iceCandidate") {
        await newPc.addIceCandidate(data.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    setMediaStream(stream);
    document.getElementById("localVideo").srcObject = stream;
    stream.getTracks().forEach(track => newPc.addTrack(track));

    setStart(true);
  };

  const handleTitle = () => {
    toast.success("Title added!");
    socket?.send(JSON.stringify({ type: "title", message: title }));
  };

  const handleDescription = () => {
    toast.success("Description added!");
    socket?.send(JSON.stringify({ type: "description", message: description }));
  };

  return (
    <div className="flex flex-col bg-richblack-900 min-h-screen px-4 sm:px-6 md:px-8 mt-16">
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Video */}
        <div className="relative w-full lg:w-[70%] h-[250px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <video id="localVideo" className="w-full h-full object-cover rounded-lg" autoPlay muted></video>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
          <div className="absolute bottom-2 right-2 bg-red-600 text-xs px-2 py-1 rounded animate-ping">LIVE</div>
        </div>
        {/* Controls & Chat */}
        <div className="flex flex-col w-full lg:w-[30%] gap-3">
          <div className="flex flex-wrap gap-2">
            <button onClick={sendNotification} className="flex-1 bg-yellow-500 text-black rounded px-3 py-2 text-sm font-semibold">Notify Students</button>
            <button onClick={start ? stopStream : startStream} className="flex-1 bg-green-500 text-black rounded px-3 py-2 text-sm font-semibold">{start ? "Stop Stream" : "Start Stream"}</button>
            <button onClick={() => setChat(!chat)} className="flex-1 bg-blue-500 text-black rounded px-3 py-2 text-sm font-semibold">{chat ? "Hide Chat" : "Show Chat"}</button>
          </div>
          {chat && <InstructorChat />}
        </div>
      </div>

      {/* Title & Description */}
      <div className="max-w-3xl">
        <p className="text-xl font-semibold text-white">{title}</p>
        <p className="text-richblack-400">{description}</p>
      </div>

      <div className="flex flex-col gap-2 mt-6 max-w-3xl">
        <label className="text-sm text-richblack-300">Class Title</label>
        <div className="flex gap-2">
          <input onChange={e => setTitle(e.target.value)} type="text" placeholder="Enter title" className="flex-1 bg-richblack-800 text-richblack-100 rounded px-3 py-2 text-sm border border-richblack-700" />
          <button onClick={handleTitle} className="bg-richblack-700 text-white px-3 py-2 rounded text-sm">Add</button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4 max-w-3xl mb-8">
        <label className="text-sm text-richblack-300">Class Description</label>
        <div className="flex gap-2">
          <input onChange={e => setDescription(e.target.value)} type="text" placeholder="Enter description" className="flex-1 bg-richblack-800 text-richblack-100 rounded px-3 py-2 text-sm border border-richblack-700" />
          <button onClick={handleDescription} className="bg-richblack-700 text-white px-3 py-2 rounded text-sm">Add</button>
        </div>
      </div>
    </div>
  );
};

export default InstructorLive;
