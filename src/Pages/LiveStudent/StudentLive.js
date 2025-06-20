import React, { useEffect, useState } from "react";
import StudentChat from "./StudentChat";
import { useRef } from "react";
import toast from "react-hot-toast";
const StudentLive = () => {
  const [chat, setChat] = useState(false);  // To check WebSocket connection status
  const remoteVideoRef = useRef(null); // Create a ref for the video element
  const [title,settitle]=useState("");
  const [desc,setdesc]=useState("");
  useEffect(() => {
      const socket = new WebSocket("ws://localhost:8000");
      socket.onopen = () => {
          socket.send(JSON.stringify({ type: "receiver" }));
      };

      let pc = null;

      socket.onmessage = async (event) => {
          const message = JSON.parse(event.data);
          if (message.type === "createOffer") {
              // Create a new RTCPeerConnection
              pc = new RTCPeerConnection({
                  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
              });

              // Handle ICE candidates
              pc.onicecandidate = (event) => {
                  if (event.candidate) {
                      socket?.send(
                          JSON.stringify({ type: "iceCandidate", candidate: event.candidate })
                      );
                  }
              };

              // Handle remote media streams
              pc.ontrack = (event) => {
                  const remoteStream = new MediaStream();
                  remoteStream.addTrack(event.track);
                  console.log("Received track:", event.track);

                  // Set the remote stream to the video element
                  if (remoteVideoRef.current) {
                      remoteVideoRef.current.srcObject = remoteStream;
                  }
              };

              try {
                  // Set the remote description from the incoming SDP offer
                  await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

                  // Create and send the answer SDP
                  const answer = await pc.createAnswer();
                  await pc.setLocalDescription(answer);

                  socket.send(
                      JSON.stringify({
                          type: "createAnswer",
                          sdp: pc.localDescription,
                      })
                  );
              } catch (error) {
                  console.error("Error handling createOffer message:", error);
              }
          } else if (message.type === "iceCandidate") {
              if (pc) {
                  try {
                      // Add received ICE candidate
                      await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
                  } catch (error) {
                      console.error("Error adding ICE candidate:", error);
                  }
              } else {
                  console.warn("No peer connection available for ICE candidate");
              }
          }else if(message.type==='title'){
            toast.success(message.data)
              settitle(message.data)
          }else if(message.type==='description'){
            setdesc(message.data)
            toast.success(message.data)
          }
      };

      return () => {
          if (pc) {
              pc.close();
          }
          socket.close();
      };
  }, []);
  return (
    <div className="flex flex-col  min-h-screen mt-16 p-4 bg-richblack-900">
      <div className="w-full flex ">
      <div className="relative w-[70%] h-[720px] mr-6 ">
      <div className="absolute bottom-5 left-0 w-full h-1 bg-[red] animate-pulse"></div>
      <div className="w-fit px-2 py-1 bg-[red] animate-ping absolute bottom-5 right-0">Live</div>
    <video 
    className="w-full h-full object-cover rounded-lg" 
    ref={remoteVideoRef} 
    muted={true} 
    autoPlay 
    playsInline 
    />
    </div>
      <div className="w-[30%] h-[720px] mr-10 flex flex-col items-start">
        <div
          onClick={() => setChat(!chat)}
          className="cursor-pointer w-fit h-fit text-white bg-[#5fd8df] px-4  py-2 rounded-md"
        >
          {chat ? "Close live chat" : "Open live chat"}
        </div>
        {chat && <StudentChat />}
      </div>
      </div>
      <div className='mt-4 text-[#d0d8d3] font-semibold text-[25px] w-[70%] text-left'>
                    {title}
                </div>
                <div className='mt-4 text-[#a6a5a5] text-[18px] w-[70%] text-left'>
                    {desc}
                </div>
    </div>
  );
};

export default StudentLive;


