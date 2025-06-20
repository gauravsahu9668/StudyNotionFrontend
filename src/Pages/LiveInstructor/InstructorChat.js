import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const StudentChat = () => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messages, setmessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const {user}=useSelector((state)=>state.profile)
  useEffect(() => {
    // Initialize the WebSocket connection
    const ws = new WebSocket("ws://localhost:8000");

    // Save the socket reference in state
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      ws.send(JSON.stringify({ type: "chatserver" }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setmessage((prev) => [...prev, message]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) {
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({ type: "chatmessage", message: currentMessage, user: user })
      );
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div className="w-full relative h-full mt-4 rounded-lg bg-richblack-800 text-white ">
  {/* Header */}
  <div className="py-2 absolute top-0 left-0 w-full flex items-center gap-x-3 px-4 bg-richblack-700 font-bold rounded-lg text-lg">
    <div className="w-[10px] h-[10px] rounded-full bg-[#f93838]"></div>
    Live Chat
  </div>

  {/* Chat Messages */}
  <div
    className="flex-1 w-full h-full mb-16 mt-10 overflow-y-auto p-4 space-y-2 scrollbar"
    style={{ maxHeight: "550px" }} // Ensures fixed height for the chat messages
    ref={(ref) => {
      if (ref) ref.scrollTop = ref.scrollHeight; // Auto-scroll to bottom for new messages
    }}
  >
     {messages.map((msg, index) => (
  <div key={index} className="flex flex-row items-center gap-x-2">
    <img
      src={msg?.user?.image || "/path-to-default-avatar.png"}
      alt="User Avatar"
      className="w-[30px] h-[30px] rounded-full"
    />
    <div className="max-w-[70%] flex flex-col items-start p-2 rounded-lg bg-richblack-600">
      {/* Ensure msg.user exists before accessing firstName */}
      <p className="text-[14px] text-[#78da71]">
        {msg?.user?.firstName || "Unknown User"}
      </p>
      {/* Display the message content */}
      <p className="text-sm font-bold">{msg?.message || "No content"}</p>
    </div>
  </div>
))}

  </div>
  <div className="p-4 absolute bottom-0 left-0 w-full rounded-lg bg-richblack-700 flex items-center">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-1 bg-richblack-800 text-white p-2 rounded-lg border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      value={currentMessage}
      onChange={(e) => setcurrentMessage(e.target.value)}
    />
    <button
      className="ml-3 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
      onClick={handleSendMessage}
    >
      Send
    </button>
  </div>
</div>

  );
};

export default StudentChat;


