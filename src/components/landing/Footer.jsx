import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Logo from "../../assets/Logo.png";

function Footer() {
  const platformLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  const informationLinks = [
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ];

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl overflow-hidden">
                <img
                  src={Logo}
                  alt="LandStack Logo"
                  className="size-10 object-contain"
                />
              </div>

              <div>
                <div className="text-lg font-bold tracking-tight text-primary">
                  Land<span className="text-secondary">Stack</span>
                </div>

                <p className="text-xs text-muted">Digital Land Governance</p>
              </div>
            </a>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              आपकी जमीन की उपलब्ध information को एक simple, unified और
              user-friendly digital experience में देखने के लिए बनाया गया
              platform.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="size-4 text-secondary" />
              Secure & user-focused
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>

            <nav className="mt-4 flex flex-col gap-3">
              {platformLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Information
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              {informationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                  {link.label !== "About" && (
                    <ArrowUpRight className="size-3" />
                  )}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LandStack. All rights reserved.</p>

          <p>Prototype for Digital Land Governance</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
