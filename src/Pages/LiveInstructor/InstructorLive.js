import React, { useEffect, useState } from 'react';
import InstructorChat from './InstructorChat';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
const InstructorLive = () => {
    const [chat, setChat] = useState(false);
    const location = useLocation();
    const id = location.pathname;
    const Id = id.split('/')[2];
    const [socket,setsocket]=useState(null)
    const localVideoElement = document.getElementById("localVideo")
    const [start,setstart]=useState(false);
    const [pc,setpc]=useState(null);
    const [mediastream,setmediastream]=useState(null)
    useEffect(()=>{
        const socket=new WebSocket("ws://localhost:8000")
        socket.onopen=()=>{
            socket.send(JSON.stringify({type:"sender"}));
        }
        setsocket(socket)
    },[])
    const sendHandler=()=>{
        toast.success("message send for live classes")
        socket.send(JSON.stringify({type:"notificationsender",message:Id}))
    }

    const stopconnection = () => {
        if (pc) {
            socket.send(JSON.stringify({type:"cancelStream"}));
            pc.getSenders().forEach((sender) => sender.track?.stop());
            pc.getReceivers().forEach((receiver) => receiver.track?.stop());
            
            // Close the peer connection
            pc.close();
            setpc(null); // Reset the PeerConnection instance
            console.log("Peer connection closed.");
        } else {
            console.log("No active peer connection.");
        }
    
        if (mediastream) {
            // Stop all media tracks in the mediastream
            mediastream.getTracks().forEach((track) => {
                track.stop();
            });
            // Reset the media stream
            setmediastream(null);
    
            // Clear the local video element's source
            if (localVideoElement) {
                localVideoElement.srcObject = null;
            }
        } else {
            console.log("No media stream to stop.");
        }
    
        // Reset state
        setstart(false);
    };
    
    const startsendingvideo = async () => {
        console.log("send something");
        if (!socket) return;
    
        // Step 1: Create RTCPeerConnection with STUN server
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        setpc(pc)
        pc.onicecandidate=(event)=>{
            console.log(event)
            if(event.candidate){
                socket?.send(JSON.stringify({type:'iceCandidate',candidate:event.candidate}))
            }
        }
        pc.onnegotiationneeded=async()=>{
            console.log("onn gegotiation needed")
            try {
                // Step 2: Create offer
                const offer = await pc.createOffer();
                // Step 3: Set local description
                await pc.setLocalDescription(offer);
                // Step 4: Send offer SDP
                socket?.send(JSON.stringify({ type: "createOffer", sdp: pc.localDescription }));
            } catch (error) {
                console.error("Error creating offer or setting local description:", error);
                return;
            }
        }
        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "createAnswer" && data.sdp) {
                    pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
                        .then(() => console.log("Remote description set successfully"))
                        .catch((error) => console.error("Error setting remote description:", error));
                }else if(data.type==="iceCandidate"){
                    pc.addIceCandidate(data.candidate)
                }
            } catch (error) {
                console.error("Error parsing or handling incoming message:", error);
            }
        };
        const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false})
        setmediastream(stream);
        localVideoElement.srcObject=stream
        pc.addTrack(stream.getVideoTracks()[0]);
        if(start==false){
            setstart(true);
        }
        else{
            setstart(false);
            pc=null
        }
    };
    const [title,settitle]=useState("");
    const[description,setdescription]=useState("")
    const titleHandler=()=>{
        toast.success("title added successfully")
        toast.success(title)
        socket.send(JSON.stringify({type:"title",message:title}))
    }
    const descHandler=()=>{
        toast.success("description added successfully")
        toast.success(description)
        socket.send(JSON.stringify({type:"description",message:description}))
    }
    return (
        <>
            <div className="flex w-full flex-col pr-6 min-h-screen mt-16 ml-6 bg-richblack-900">
                <div className='flex flex-row w-full'>
                <div className="relative w-[70%] h-[720px] mr-6 ">
           <div className="absolute bottom-5 left-0 w-full  h-1 bg-[red] animate-pulse"></div>
            <div className="w-fit px-2 py-1 bg-[red] animate-ping absolute bottom-5 right-0">Live</div>
                <video 
                className="w-full h-full object-cover rounded-lg" 
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                muted={false} 
                autoPlay 
                id='localVideo'
                />
                </div>
                <div className="w-[30%] h-[720px] mr-10 flex flex-col gap-x-2 items-start">
                    <div className='flex items-center justify-between'>
                    <div onClick={sendHandler} className="cursor-pointer w-fit h-fit text-white bg-[#3d3d3d] px-4 py-2 rounded-md">
                       Send Notification
                      </div>
                      <button onClick={()=>{start? stopconnection ():startsendingvideo()}} className="cursor-pointer ml-2 w-fit h-fit text-white bg-[#7dcd64] px-4 py-2 rounded-md">{start ? "stop stream":"start stream"}</button>
                      <div onClick={() => setChat(!chat)} className="cursor-pointer ml-2 w-fit h-fit text-white bg-[#73e0e8] px-4 py-2 rounded-md">
                        {chat ? "Close Chat" : "Open Chat"}
                    </div>
                    </div>
                    {chat && <InstructorChat />}
                </div>
                </div>
                <div className='mt-4 text-[#d0d8d3] font-semibold text-[25px] w-[70%] text-left'>
                    {title}
                </div>
                <div className='mt-4 text-[#a6a5a5] text-[18px] w-[70%] text-left'>
                    {description}
                </div>
            <div className='flex flex-col mt-10 gap-1 w-[67%]'>
                <label for="firstname" className='text-lg font-bold text-richblack-600 '>Class Title</label>
                <div className='w-full flex items-center'>
                <input required onChange={(e)=>{settitle(e.target.value)}}  type='text' placeholder='Enter class title' id='firstname' name='firstName' className='
                 w-full outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
                 <button onClick={titleHandler} className='px-2 py-2 w-fit h-fit ml-4 text-white bg-[#224658] rounded-lg'>Add</button>
                </div>
            </div>
            <div className='flex flex-col mt-10 mb-10 gap-1 w-[67%]'>
                <label for="lastname" className='text-lg font-bold text-richblack-600 '>Class Description</label>
                <div className='w-full flex items-center'>
                <input required onChange={(e)=>{setdescription(e.target.value)}}  type='text' placeholder='Enter class description' id='firstname' name='firstName' className='
                 w-full outline-none text-[14px] font-semibold text-richblack-600 p-3 bg-richblack-800 rounded-md border-b-[3px] border-richblack-700'></input>
                 <button onClick={descHandler} className='px-2 py-2 w-fit h-fit ml-4 text-white bg-[#224658] rounded-lg'>Add</button>
                </div>
            </div>
            </div>
        </>
    );
};

export default InstructorLive;
