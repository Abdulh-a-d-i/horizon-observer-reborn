
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing"); // landing, login, dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentView("login");
  };

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      setCurrentView("dashboard");
      localStorage.setItem("auth_token", "authenticated");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView("landing");
    localStorage.removeItem("auth_token");
  };

  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default Index;
