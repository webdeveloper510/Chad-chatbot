import React, { useState } from "react";
import "../../css/newchatbot.css";
import send from "../../images/send.png";
import logoM from "../../images/loan-logo.png";
import { botResponse } from "../../utils/api";

const NewChatBoat = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello, how can I assist you today?" },
    { type: "user", text: "Hi" },
    { type: "user", text: "What is the interest rate for personal loans?" },
  ]);

  const queries = [
    "What are the eligibility criteria for a loan?",
    "What is the interest rate for personal loans?",
    "How long does loan approval take?",
    "What documents are required for a home loan?",
    "Can I prepay my loan?",
  ];

  const [botMessage, setBotMessage] = useState("");

  const handleBotMessage = (e) => {
    setBotMessage(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: botMessage }, 
    ]);
    botResponse({
      question: botMessage,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setBotMessage("");

          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: res.data.message },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoM} alt="Send" />
        </div>
        <input type="text" className="search" placeholder="Search" />

        <div className="history-section">
          <div className="history-day">Today</div>
          <div className="history-item">
            What are the eligibility for criteria for a loan?
          </div>
          <div className="history-item">
            What is the interest rate for personal loans?
          </div>

          <div className="history-day">Yesterday</div>
          <div className="history-item">
            What are the eligibility for criteria for a loan?
          </div>

          <div className="history-day">Monday</div>
          <div className="history-item">
            What is the interest rate for personal loans?
          </div>
          <div className="history-item">
            What are the eligibility for criteria for a loan?
          </div>
        </div>

        <button className="clear-history">Clear History</button>
      </div>

      <div className="chat-window">
        <div className="top-bar">
          <div className="user-profile">
            <img
              className="avatar"
              src="https://ui-avatars.com/api/?name=Noah+Johnson&background=4CAF50&color=fff"
              alt="User Avatar"
            />
            <span className="username">Noah Johnson</span>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>

        <div className="top_heading">
          <h3>Quick Loan Queries:</h3>
        </div>
        <div className="quick-queries">
          {queries.map((query, index) => (
            <button key={index} className="query-button">
              {query}
            </button>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.type === "user" ? "user-message" : "bot-message"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="outer_sendbtn d-flex">
          <div className="chat-input">
            <input
              type="text"
              value={botMessage}
              onChange={(e) => handleBotMessage(e)}
              placeholder="Ask me anything..."
              maxLength={3000}
            />
            <span className="char-count">0 / 3000</span>
          </div>
          <button className="send-btn" onClick={(e) => handleMessageSubmit(e)}>
            <img src={send} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatBoat;
