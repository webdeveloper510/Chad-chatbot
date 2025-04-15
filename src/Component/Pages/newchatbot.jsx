import React, { useEffect, useRef, useState } from "react";
import "../../css/newchatbot.css";
import send from "../../images/send.png";
import logoM from "../../images/loan-logo.png";
import { botResponse } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const NewChatBoat = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello, how can I assist you today?" },
  ]);

  const queries = [
    "What are the eligibility criteria for a loan?",
    "What is the interest rate for personal loans?",
    "How long does loan approval take?",
    "What documents are required for a home loan?",
    "Can I prepay my loan?",
  ];

  const messagesEndRef = useRef(null);

  // Scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Whenever messages change, scroll down
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setBotMessage("");
    const user_email = localStorage.getItem("bot_user_access_token");
    setLoading(true);
    botResponse({
      question: botMessage,
      email: user_email,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setLoading(false)
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: res.data.message },
          ]);
        } else {
          navigate("/loanapp/login");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleQueryMessage = (data) => {
    setBotMessage(data);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && botMessage.trim() !== "") {
        e.preventDefault();
        handleMessageSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [botMessage]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoM} alt="Send" />
        </div>
        <input type="text" className="search" placeholder="Search" />

        <div className="history-section">
          <div className="history-day">Today</div>
          <div className="history-item">What are the eligibility...</div>
          <div className="history-item">What is the interest...</div>

          <div className="history-day">Yesterday</div>
          <div className="history-item">What are the eligibility...</div>

          <div className="history-day">Last Week</div>
          <div className="history-item">What is the interest rate...</div>
          <div className="history-item">What are the eligibility...</div>
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
            <button
              type="button"
              onClick={() => handleQueryMessage(query)}
              key={index}
              className="query-button"
            >
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

          {loading && (
            <div class="loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          )}
          {/* Invisible div to scroll into view */}
          <div ref={messagesEndRef} />
        </div>

        <div className="outer_sendbtn d-flex">
          <div className="chat-input">
            <input
              type="text"
              value={botMessage}
              onChange={(e) => handleBotMessage(e)}
              placeholder="Ask me anything..."
              maxLength={3000}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessageSubmit(e);
                }
              }}
            />
            <span className="char-count">{botMessage.length} / 3000</span>
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
