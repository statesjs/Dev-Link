import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HomePage from "./pages/HomePage";
console.log("API Base URL:", import.meta.env.VITE_API_URL);
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateResourcePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
