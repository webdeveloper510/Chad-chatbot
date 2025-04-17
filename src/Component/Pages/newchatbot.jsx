import React, { useEffect, useRef, useState } from "react";
import "../../css/newchatbot.css";
import send from "../../images/send.png";
import logoM from "../../images/loan-logo.png";
import {
  botResponse,
  deletChatHistory,
  userChatHistory,
  userLogin,
} from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const NewChatBoat = () => {
  const navigate = useNavigate();
  const [botMessage, setBotMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello, how can I assist you today?" },
  ]);

  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState([]);
  const [show, setShow] = useState(false);
  const [deletQues, setDeletQues] = useState("");

  const handleClose = () => {
    setShow(false);
    setDeletQues("");
  };

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
          getUserChatHistory();
          setLoading(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: res.data.message },
          ]);
        } else {
          navigate("/loanapp");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const user_email = localStorage.getItem("bot_user_access_token");

  const getUserChatHistory = () => {
    userChatHistory(user_email)
      .then((res) => {
        if (res?.data?.status == 200) {
          setChatHistory(res?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserChatHistory();
  }, []);

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

  const handleShowHistory = (data) => {
    const transformedMessages = data.flatMap((item) => [
      { type: "user", text: item.question },
      { type: "bot", text: item.answer },
    ]);

    // Now use this to update your messages state
    setMessages(transformedMessages);
  };

  const handleNewChat = () => {
    setShowHistory([]);
    setMessages([{ type: "bot", text: "Hello, how can I assist you today?" }]);
    userLogin({
      email: user_email,
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletHistoryModal = (id, ques) => {
    setShow(id);
    setDeletQues(ques);
  };

  const handleDeletHistory = () => {
    deletChatHistory(show, user_email)
      .then((res) => {
        console.log(res);
        if (res?.data?.status == 200 || res?.data?.status == 204) {
          setShow(false);
          setDeletQues("");
          getUserChatHistory();
          toast.success(res?.data?.message, {
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/loanapp")
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoM} alt="Send" />
          <svg
            onClick={() => handleNewChat()}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-pencil-square new_chat_icon"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
        </div>
        <input type="text" className="search" placeholder="Search" />

        <div className="history-section">
          {chatHistory?.today?.some((entry) => {
            const dynamicKey = Object.keys(entry)[0];
            const questionsArray = entry[dynamicKey];
            return questionsArray?.[0];
          }) && <div className="history-day">Today</div>}

          {chatHistory?.today
            ?.slice()
            .reverse()
            ?.map((entry, index) => {
              const dynamicKey = Object.keys(entry)[0];
              const questionsArray = entry[dynamicKey];
              const firstItem = questionsArray?.[0];

              return (
                firstItem && (
                  <>
                    <div
                      onClick={() => {
                        handleShowHistory(questionsArray);
                      }}
                      key={index}
                      className="history-item"
                    >
                      <span>
                        {firstItem.question.length > 15
                          ? `${firstItem.question.slice(0, 20)}`
                          : firstItem.question}
                      </span>
                      <span>
                        <svg
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeletHistoryModal(
                              dynamicKey,
                              firstItem.question
                            );
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </span>
                    </div>
                  </>
                )
              );
            })}

          {chatHistory?.yesterday?.some((entry) => {
            const dynamicKey = Object.keys(entry)[0];
            const questionsArray = entry[dynamicKey];
            return questionsArray?.[0];
          }) && <div className="history-day">Yesterday</div>}

          {chatHistory?.yesterday
            ?.slice()
            .reverse()
            ?.map((entry, index) => {
              const dynamicKey = Object.keys(entry)[0];
              const questionsArray = entry[dynamicKey];
              const firstItem = questionsArray?.[0];

              return (
                firstItem && (
                  <div
                    onClick={() => {
                      handleShowHistory(questionsArray);
                    }}
                    key={index}
                    className="history-item"
                  >
                    <span>
                      {firstItem.question.length > 15
                        ? `${firstItem.question.slice(0, 20)}`
                        : firstItem.question}
                    </span>
                    <span>
                      <svg
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeletHistoryModal(
                            dynamicKey,
                            firstItem.question
                          );
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  </div>
                )
              );
            })}

          {chatHistory?.last_week?.some((entry) => {
            const dynamicKey = Object.keys(entry)[0];
            const questionsArray = entry[dynamicKey];
            return questionsArray?.[0];
          }) && <div className="history-day">Last Week</div>}
          {chatHistory?.last_week
            ?.slice()
            .reverse()
            ?.map((entry, index) => {
              const dynamicKey = Object.keys(entry)[0];
              const questionsArray = entry[dynamicKey];
              const firstItem = questionsArray?.[0];

              return (
                firstItem && (
                  <div
                    onClick={() => {
                      handleShowHistory(questionsArray);
                    }}
                    key={index}
                    className="history-item"
                  >
                    <span>
                      {firstItem.question.length > 15
                        ? `${firstItem.question.slice(0, 20)}`
                        : firstItem.question}
                    </span>

                    <span>
                      <svg
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeletHistoryModal(
                            dynamicKey,
                            firstItem.question
                          );
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  </div>
                )
              );
            })}

          {chatHistory?.older?.some((entry) => {
            const dynamicKey = Object.keys(entry)[0];
            const questionsArray = entry[dynamicKey];
            return questionsArray?.[0];
          }) && <div className="history-day">Older</div>}
          {chatHistory?.older
            ?.slice()
            .reverse()
            ?.map((entry, index) => {
              const dynamicKey = Object.keys(entry)[0];
              const questionsArray = entry[dynamicKey];
              const firstItem = questionsArray?.[0];

              return (
                firstItem && (
                  <div
                    onClick={() => {
                      handleShowHistory(questionsArray);
                    }}
                    key={index}
                    className="history-item"
                  >
                    <span>
                      {firstItem.question.length > 15
                        ? `${firstItem.question.slice(0, 20)}`
                        : firstItem.question}
                    </span>

                    <span>
                      <svg
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeletHistoryModal(
                            dynamicKey,
                            firstItem.question
                          );
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </span>
                  </div>
                )
              );
            })}
        </div>

        <button onClick={()=>handleLogout()} className="clear-history">Logout</button>
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
          {messages?.map((msg, index) => (
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
            <div className="loader">
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

      <Modal
        variant="dark"
        show={show}
        centered
        onHide={handleClose}
        className="modal-dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete chat?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deletQues}</Modal.Body>
        <Modal.Footer>
          <Button className="cancel_butn" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="delet_butn" onClick={handleDeletHistory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewChatBoat;
