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

  // Static loan-related questions & bot responses
  const staticQuestions = [
    { question: "What are the eligibility criteria for a loan?", answer: "Eligibility depends on your income, credit score, and loan type." },
    { question: "What is the interest rate for personal loans?", answer: "Interest rates vary from 8% to 15% depending on your credit score." },
    { question: "How long does loan approval take?", answer: "Loan approval typically takes 24 to 72 hours after document submission." },
    { question: "What documents are required for a home loan?", answer: "You need ID proof, income proof, property documents, and a credit score check." },
    { question: "Can I prepay my loan?", answer: "Yes, most loans allow prepayment, but some may have a penalty fee." }
  ];

  // Function to send a message
  const sendMessage = (text) => {
    if (text.trim()) {
      setMessages([...messages, { sender: "user", text }]);
      setInput("");

      // Find a predefined answer if available
      const foundQuestion = staticQuestions.find(q => q.question === text);
      const botReply = foundQuestion ? foundQuestion.answer : "I'm here to help!";

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      }, 1000);
    }
  };

  // Handle text input submission
  const handleSendMessage = () => sendMessage(input);

  // Handle predefined question click
  const handleQuestionClick = (question) => sendMessage(question);

  // Handle Logout
  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">
          <i className="bi bi-chat-left-dots"></i> Loan Assistant
        </h2>

        <button className="new-chat-btn">
          <i className="bi bi-plus"></i> New Chat
        </button>

        <div className="chat-history">
          <div className="chat-item active">
            <i className="bi bi-chat-left"></i> Loan Queries
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="clear-history-btn">
            <i className="bi bi-trash"></i> Clear History
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        {/* Header */}
        <header className="chat-header">
          <h2>New Conversation</h2>
          <div className="header-icons">
            <i className="bi bi-arrow-clockwise"></i>
            <i className="bi bi-download"></i>
          </div>
        </header>

        {/* Static Questions Section */}
        <div className="static-questions">
          <h3>Quick Loan Queries:</h3>
          <div className="question-container">
            {staticQuestions.map((q, index) => (
              <button key={index} className="question-btn" onClick={() => handleQuestionClick(q.question)}>
                {q.question}
              </button>
            ))}
          </div>
        </div>

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
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="send-btn" onClick={handleSendMessage}>
              <i className="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
