// src/App.jsx
import { useState, useEffect, useRef } from "react";
import LandingPage from "./components/landing/LandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import LandProfile from "./components/land/LandProfile";
import LoginPage from "./components/auth/LoginPage";
import KabalaViewerPage from "./components/land/KabalaViewerPage";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { LogOut, ShieldAlert } from "lucide-react";

function MainApp() {
  const { language } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [selectedLand, setSelectedLand] = useState(null);
  const [userId, setUserId] = useState("USR-1001");
  const [showExitModal, setShowExitModal] = useState(false);

  // Screen tracking ref for history handling
  const currentScreenRef = useRef(currentScreen);
  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  // Navigate with browser history synchronization
  const navigateTo = (screen, land = null, replace = false) => {
    setSelectedLand(land);
    setCurrentScreen(screen);
    setShowExitModal(false);

    const stateObj = { screen, landId: land?.id || null };
    if (replace) {
      window.history.replaceState(stateObj, "");
    } else {
      window.history.pushState(stateObj, "");
    }
  };

  // Browser Navigation / Physical Back Button listener
  useEffect(() => {
    window.history.replaceState({ screen: "landing", landId: null }, "");

    const handlePopState = () => {
      const active = currentScreenRef.current;

      // 1. Kabala Page se back -> Land Profile
      if (active === "kabala") {
        setCurrentScreen("profile");
        return;
      }

      // 2. Land Profile se back -> Dashboard
      if (active === "profile") {
        setCurrentScreen("dashboard");
        return;
      }

      // 3. Dashboard par back dabane par bahar nahi jane dega, center alert trigger karega
      if (active === "dashboard") {
        window.history.pushState({ screen: "dashboard", landId: null }, "");
        setShowExitModal(true);
        return;
      }

      // 4. Login se back -> Landing
      if (active === "login") {
        setCurrentScreen("landing");
        return;
      }

      setCurrentScreen("landing");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Window Close / Refresh guard (Only active in logged-in screens)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const active = currentScreenRef.current;
      if (
        active === "dashboard" ||
        active === "profile" ||
        active === "kabala"
      ) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Exit Actions
  const handleStayOnPage = () => {
    setShowExitModal(false);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    setSelectedLand(null);
    navigateTo("landing", null, true); // Safely end session and return to landing
  };

  return (
    <div className="relative min-h-screen w-full bg-background antialiased selection:bg-primary/20">
      {/* 1. LANDING PAGE */}
      {currentScreen === "landing" && (
        <LandingPage onLogin={() => navigateTo("login")} />
      )}

      {/* 2. DYNAMIC LOGIN PAGE (Receives verified Raiyat userId from Mobile/ULPIN) */}
      {currentScreen === "login" && (
        <LoginPage
          onLoginSuccess={(authenticatedUserId) => {
            setUserId(authenticatedUserId || "USR-1001");
            navigateTo("dashboard", null, true);
          }}
          onBack={() => navigateTo("landing", null, true)}
        />
      )}

      {/* 3. CONSOLIDATED CITIZEN DASHBOARD */}
      {currentScreen === "dashboard" && (
        <Dashboard
          userId={userId}
          onLogout={() => setShowExitModal(true)}
          onViewDetails={(land) => navigateTo("profile", land)}
          onViewLand={(land) => navigateTo("profile", land)}
          onSelectLand={(land) => navigateTo("profile", land)}
        />
      )}

      {/* 4. LAND PROFILE VIEW */}
      {currentScreen === "profile" && (
        <LandProfile
          land={selectedLand}
          onBack={() => navigateTo("dashboard")}
          onViewKabala={(land) => navigateTo("kabala", land || selectedLand)}
        />
      )}

      {/* 5. DEDICATED KABALA (SALE DEED) VIEWER PAGE */}
      {currentScreen === "kabala" && (
        <KabalaViewerPage
          land={selectedLand}
          onBack={() => navigateTo("profile", selectedLand)}
        />
      )}

      {/* ========================================================
          CENTER SCREEN CONFIRMATION MODAL
      ======================================================== */}
      {showExitModal && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-4">
              <ShieldAlert className="size-6" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {language === "hi"
                ? "क्या आप बाहर जाना चाहते हैं?"
                : "Are you sure you want to leave?"}
            </h3>

            <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
              {language === "hi"
                ? "बाहर जाने पर आपका वर्तमान सत्र समाप्त हो जाएगा।"
                : "Leaving will safely terminate your active session."}
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleStayOnPage}
                className="rounded-xl border border-border bg-slate-50 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
              >
                {language === "hi" ? "पेज पर ही रहें" : "Stay on Page"}
              </button>

              <button
                type="button"
                onClick={handleConfirmExit}
                className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-red-700 active:scale-95"
              >
                <LogOut className="size-3.5" />
                <span>
                  {language === "hi" ? "हाँ, बाहर जाएं" : "Yes, Exit"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
