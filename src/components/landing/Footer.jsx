// src/components/landing/Footer.jsx
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { useLanguage } from "../../context/LanguageContext";

function Footer() {
  const { language } = useLanguage();

  const platformLinks = [
    { label: language === "hi" ? "होम" : "Home", href: "#home" },
    { label: language === "hi" ? "विशेषताएं" : "Features", href: "#features" },
    { label: language === "hi" ? "कार्यप्रणाली" : "How It Works", href: "#how-it-works" },
  ];

  const informationLinks = [
    { label: "DILRMP Standards", href: "#features" },
    { label: "AgriStack Alignment", href: "#how-it-works" },
    { label: "Bhu-Aadhaar (ULPIN)", href: "#home" },
  ];

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="inline-flex items-center">
              <BrandLogo size="md" showTagline={false} />
            </a>

            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              {language === "hi"
                ? "आपकी सभी ज़मीनों की उपलब्ध जानकारी को एक सरल, एकीकृत और उपयोगकर्ता-अनुकूल डिजिटल अनुभव में देखने के लिए विकसित मंच।"
                : "A unified, citizen-centric platform designed to access and verify consolidated land holdings across all districts in one secure experience."}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="size-4 text-secondary shrink-0" />
              <span>
                {language === "hi"
                  ? "सुरक्षित, सहमति-आधारित एवं DILRMP अनुरूप"
                  : "Secure, Consent-Based & DILRMP Compliant"}
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {language === "hi" ? "प्लेटफॉर्म" : "Platform"}
            </h3>
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

          {/* Standards & Policy */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {language === "hi" ? "डिजिटल मानक" : "Governance Standards"}
            </h3>
            <nav className="mt-4 flex flex-col gap-3">
              {informationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="size-3" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LandStack. {language === "hi" ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}</p>
          <p>DILRMP & Bhu-Aadhaar Aligned Prototype</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;