import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Pages/home";
import ChatBot from "./Component/Pages/chatbot";
import NewChatBoat from "./Component/Pages/newchatbot";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/newchatbot" element={<NewChatBoat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
