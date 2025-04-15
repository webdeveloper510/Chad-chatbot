// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Component/Pages/home';
import NewChatBoat from './Component/Pages/newchatbot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/loanapp" element={<Home />} />
          <Route path="/loanapp/newchatbot" element={<ProtectedRoute />}>
            <Route index element={<NewChatBoat />} />
          </Route>
          <Route path="*" element={<Navigate to="/loanapp" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
