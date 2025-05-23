import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateResourcePage from "./pages/CreateResourcePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ResourcePage from "./pages/ResourcePage";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import EditResourcePage from "./pages/EditResourcePage";



import "./App.css";

function App() {
  return (
    <AuthProvider>
      {/* creates a global context of user state for auth*/}
      <Router>
        <Navbar />
        <Routes>
          {/* bundles route(s) so that only one may be accessed and rendered at a time*/}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<NotFoundPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateResourcePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditResourcePage />
              </PrivateRoute>
            }
          />

          <Route path="/resource/:id" element={<ResourcePage />} />
          {/* endpoint for reaching a page that doesnt exist*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
