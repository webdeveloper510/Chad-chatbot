import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Component/Pages/home";
import NewChatBoat from "./Component/Pages/newchatbot";


const PrivateRoute = ({ children }) => {
  const user_email = localStorage.getItem("bot_user_access_token");
  return user_email ? children : <Navigate to="/loanapp" />;
};

function App() {
  const user_email = localStorage.getItem("bot_user_access_token");

  return (
    <Router>
      <Routes>
        {/* Default redirect based on login status */}
        <Route
          path="/"
          element={
            user_email ? (
              <Navigate to="/loanapp/newchatbot" />
            ) : (
              <Navigate to="/loanapp" />
            )
          }
        />

        {/* Public route */}
        <Route path="/loanapp" element={<Home />} />

        {/* Protected route */}
        <Route
          path="/loanapp/newchatbot"
          element={
            <PrivateRoute>
              <NewChatBoat />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
