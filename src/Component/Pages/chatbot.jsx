import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/chatbot.css"; // Updated CSS file
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: "I'm here to help!" }]);
      }, 1000);
    }
  };

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">
          <i className="bi bi-chat-left-dots"></i> Medical Logo
        </h2>

        <button className="new-chat-btn">
          <i className="bi bi-plus"></i> New Chat
        </button>

        <div className="chat-history">
          <div className="chat-item active">
            <i className="bi bi-chat-left"></i> New Conversation
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="clear-history-btn">
            <i className="bi bi-trash"></i> Clear History
          </button>
          {/* Logout Button (Instead of Replace) */}
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        {/* Header */}
        <header className="chat-header">
          <h3>New Conversation</h3>
          <div className="header-icons">
            <i className="bi bi-arrow-clockwise"></i>
            <i className="bi bi-download"></i>
          </div>
        </header>

        {/* Chatbox */}
        <div className="chatbox">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
