import React, { useState } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/chatbot.css";
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
    <div className="chat-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Medical  AI</h2>

        {/* Home Button */}
        <Button variant="dark" className="sidebar-btn" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left-circle"></i> Home
        </Button>

        {/* Chat History */}
        <ul className="chat-history">
          <li>New Chat</li>
          <li>Chat 1</li>
          <li>Chat 2</li>
        </ul>

        {/* Logout Button */}
        <Button variant="danger" className="sidebar-btn logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </Button>
      </div>

      {/* Main Content (Navbar + Chatbox) */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar className="top-navbar">
          <Container fluid className="justify-content-between">
            <Nav className="nav-icons">
              <i className="bi bi-bell notification-icon"></i>
              <i className="bi bi-person-circle user-icon"></i>
            </Nav>
          </Container>
        </Navbar>

        {/* Chatbox */}
        <div className="chatbox">
          <Container className="chat-container">
            <div className="chat_inner">
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button variant="primary" onClick={sendMessage}>
                  <i className="bi bi-send"></i>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
