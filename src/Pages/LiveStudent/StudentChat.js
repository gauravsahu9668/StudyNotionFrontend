import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const StudentChat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.profile);

  const messagesEndRef = useRef(null); // Ref to scroll to bottom

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "chatserver" }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Scroll to latest message when messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "chatmessage", message: currentMessage, user }));
      setCurrentMessage("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div className="relative flex flex-col h-[400px] sm:h-[500px] rounded-lg bg-richblack-800 shadow-inner overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-richblack-700 border-b border-richblack-600 text-yellow-400 font-semibold text-sm sm:text-base">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Live Class Chat
      </div>

      {/* Messages */}
      <div
        ref={messagesEndRef}
        className="flex-1 px-4 py-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-richblack-700"
      >
        {messages.map((msg, index) => (
          <div key={index} className="flex gap-2 items-start">
            <img src={msg?.user?.image} alt="" className="w-8 h-8 rounded-full object-cover" />
            <div className="max-w-[80%] bg-richblack-700 rounded-md px-3 py-2">
              <p className="text-xs text-yellow-400 font-semibold">{msg?.user?.firstName}</p>
              <p className="text-sm text-richblack-50 break-words">{msg?.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 bg-richblack-700 border-t border-richblack-600">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-richblack-800 text-richblack-100 text-sm px-3 py-2 rounded-md border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-yellow-500 text-black px-3 py-2 rounded-md text-sm hover:bg-yellow-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default StudentChat;
