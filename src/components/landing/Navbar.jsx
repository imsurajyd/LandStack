// src/components/landing/Navbar.jsx
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Languages } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { useLanguage } from "../../context/LanguageContext";

function Navbar({ onLogin }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: language === "hi" ? "होम" : "Home", href: "#home" },
    { label: language === "hi" ? "विशेषताएं" : "Features", href: "#features" },
    { label: language === "hi" ? "कार्यप्रणाली" : "How It Works", href: "#how-it-works" },
  ];

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 140;
      let currentSection = "home";

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  // Background scroll lock when menu opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const handleLogin = () => {
    setIsOpen(false);
    onLogin?.();
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-white/95 backdrop-blur">
      {/* Top Navbar Header */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(sectionId)}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#1F7A5A]"
                    : "text-muted hover:text-[#1F7A5A]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#1F7A5A] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground shadow-xs transition hover:bg-slate-50 hover:text-primary active:scale-95"
            title={language === "en" ? "Switch to हिन्दी" : "Switch to English"}
          >
            <Languages className="size-3.5 text-primary" />
            <span>{t("langToggle")}</span>
          </button>

          <button
            type="button"
            onClick={handleLogin}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
          >
            {language === "hi" ? "प्रवेश" : "Login"}
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* Mobile Header Actions (Language + Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1 rounded-xl border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition hover:bg-slate-50"
            title={language === "en" ? "Switch to हिन्दी" : "Switch to English"}
          >
            <Languages className="size-3.5 text-primary" />
            <span>{t("langToggle")}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-primary hover:bg-slate-50"
            aria-label="Open Navigation"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE OVERLAY & LEFT-TO-RIGHT SLIDE DRAWER
      ======================================================== */}
      {/* 1. Backdrop Shade */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 2. Slide Drawer (Fixed Left: -100% se 0% slide) */}
      <div
        className={`fixed inset-y-0 left-0 z-[100] flex h-[100dvh] w-screen max-w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 w-full shrink-0 items-center justify-between border-b border-border px-4">
          <BrandLogo size="md" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1 rounded-xl border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-foreground"
            >
              <Languages className="size-3.5 text-primary" />
              <span>{t("langToggle")}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex size-10 items-center justify-center rounded-xl border border-border text-primary hover:bg-slate-50"
              aria-label="Close Navigation"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-8">
          <nav className="flex flex-col gap-2">
            <span className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {language === "hi" ? "नेविगेशन" : "Navigation"}
            </span>

            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(sectionId)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-slate-50 active:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="size-2 rounded-full bg-primary" />
                  ) : (
                    <ArrowRight className="size-4 text-muted/60" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Drawer Bottom Action */}
          <div className="border-t border-border pt-6 pb-2">
            <button
              type="button"
              onClick={handleLogin}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow-md transition-transform active:scale-[0.98]"
            >
              {language === "hi" ? "लैंडस्टैक में लॉगिन करें" : "Login to LandStack"}
              <ArrowRight className="size-5" />
            </button>

            <p className="mt-4 text-center text-xs text-muted">
              {language === "hi"
                ? "DILRMP एवं डिजिटल भू-अभिलेख अनुरूप नागरिक पोर्टल"
                : "DILRMP & Bhu-Aadhaar Aligned Citizen Portal"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;