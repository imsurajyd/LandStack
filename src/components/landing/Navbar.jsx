import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "../../assets/Logo.png";

function Navbar({ onLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home" },
    // { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  // Detect active section while scrolling
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
  }, []);

  const handleLogin = () => {
    setIsOpen(false);
    onLogin?.();
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-25 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={Logo}
              alt="LandStack Logo"
              className="size-15 object-contain"
            />
          </div>

          <div>
            <div className="text-3xl font-bold tracking-tight text-primary">
              Land<span className="text-secondary">Stack</span>
            </div>

            <div className="hidden text-[12px] font-medium uppercase tracking-[0.16em] text-muted sm:block">
              Digital Land Governance
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
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
                className={`relative py-2 text-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#1F7A5A]"
                    : "text-muted hover:text-[#1F7A5A]"
                }`}
              >
                {item.label}

                {/* Active underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#1F7A5A] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop Login */}
        <button
          type="button"
          onClick={handleLogin}
          className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md md:flex"
        >
          Login
          <ArrowRight className="size-4" />
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex size-10 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:bg-background md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => handleNavClick(sectionId)}
                  className={`flex items-center justify-between border-b border-border/70 py-3 text-sm font-medium transition-colors last:border-0 ${
                    isActive
                      ? "font-semibold text-primary"
                      : "text-muted hover:text-primary"
                  }`}
                >
                  <span>{item.label}</span>

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </a>
              );
            })}

            {/* Mobile Login */}
            <button
              type="button"
              onClick={handleLogin}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark"
            >
              Login
              <ArrowRight className="size-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
