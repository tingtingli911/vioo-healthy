import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/components/pages/HomePage";
import { DashboardPage } from "@/components/pages/DashboardPage";
import { ModulePage } from "@/components/pages/ModulePage";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("home");
  };

  // Not logged in - show landing page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onLogin={handleLogin} />
        <HomePage onLogin={handleLogin} />
      </div>
    );
  }

  // Logged in - show dashboard or module page
  return (
    <div className="min-h-screen bg-background">
      {activeTab === "dashboard" ? (
        <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />
      ) : (
        <ModulePage moduleId={activeTab} onBack={() => handleNavigate("dashboard")} />
      )}
    </div>
  );
};

export default Index;
