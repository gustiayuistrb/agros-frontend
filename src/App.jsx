import React, { useEffect, useState } from "react";
import {  BrowserRouter as Router,  Routes,  Route,  Navigate} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ProfilPage from "./pages/ProfilPage";
import PublicHomePage from "./pages/PublicHomePage";
import CustomerHomePage from "./pages/CustomerHomePage";
import SuperAdminHomePage from "./pages/SuperAdminHomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check the status of the user on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole); // Set role if token exists
    }
  }, []);

  // Handle route protection
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                role === "Customer" || role === "Super Admin" ? (
                  <ProfilPage />
                ) : (
                  <Navigate to="/" /> // Arahkan pengguna ke halaman Public jika role tidak cocok
                )
              ) : (
                <Navigate to="/login" /> // Arahkan pengguna ke halaman login jika belum login
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                role === "Customer" ? (
                  <CustomerHomePage />
                ) : role === "Super Admin" ? (
                  <SuperAdminHomePage />
                ) : (
                  <Navigate to="/" /> // Jika role tidak dikenali, arahkan ke halaman Public
                )
              ) : (
                <Navigate to="/login" /> // Jika belum login, arahkan ke halaman login
              )
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
