import { useState } from "react";

import LandingPage from "./components/landing/LandingPage";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./components/dashboard/Dashboard";
import LandProfile from "./components/land/LandProfile";

function App() {
  const [page, setPage] = useState("landing");
  const [selectedLand, setSelectedLand] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const handleLoginSuccess = (userId) => {
    setLoggedInUserId(userId);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setSelectedLand(null);
    setLoggedInUserId(null);
    setPage("landing");
  };

  const handleViewLand = (land) => {
    setSelectedLand(land);
    setPage("land-profile");
  };

  if (page === "login") {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (page === "land-profile") {
    return (
      <LandProfile land={selectedLand} onBack={() => setPage("dashboard")} />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        userId={loggedInUserId}
        onLogout={handleLogout}
        onViewLand={handleViewLand}
      />
    );
  }

  return <LandingPage onLogin={() => setPage("login")} />;
}

export default App;
