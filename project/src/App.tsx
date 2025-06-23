import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Desktop } from "./screens/Desktop";
import { Signup } from "./screens/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Desktop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;