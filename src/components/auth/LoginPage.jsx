// src/components/auth/LoginPage.jsx
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Languages,
} from "lucide-react";

import { users } from "../../data/landData";
import BrandLogo from "../common/BrandLogo";
import { useLanguage } from "../../context/LanguageContext";

function LoginPage({ onLoginSuccess, onBack }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [step, setStep] = useState("identifier");
  const [identifier, setIdentifier] = useState("");
  const [showIdentifier, setShowIdentifier] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  const handleGetOtp = (event) => {
    event.preventDefault();

    const inputId = identifier.trim();

    if (!/^\d{12}$/.test(inputId)) {
      setError(
        language === "hi"
          ? "कृपया 12-अंकों का मान्य पहचान नंबर दर्ज करें।"
          : "Please enter a valid 12-digit identity number.",
      );
      return;
    }

    const user = users[0];

    if (!user) {
      setError(
        language === "hi"
          ? "पंजीकृत उपयोगकर्ता रिकॉर्ड नहीं मिला।"
          : "Registered user record not found.",
      );
      return;
    }

    setError("");
    setStep("otp");

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    setOtp(updatedOtp);
    setError("");

    if (digit && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const updatedOtp = [...otp];

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);

    const nextIndex = Math.min(pastedValue.length, otp.length - 1);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(
        language === "hi"
          ? "कृपया पूरा 6-अंकों का OTP दर्ज करें।"
          : "Please enter the complete 6-digit OTP.",
      );
      return;
    }

    const defaultUser = users[0];

    if (!defaultUser) {
      setError(
        language === "hi"
          ? "उपयोगकर्ता सत्यापन विफल हुआ।"
          : "User verification failed.",
      );
      return;
    }

    onLoginSuccess?.(defaultUser.userId);
  };

  const handleChangeIdentifier = () => {
    setStep("identifier");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="min-h-screen w-full bg-background antialiased">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="flex items-center gap-2 text-left"
          >
            <BrandLogo size="md" />
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition hover:bg-slate-50 hover:text-primary active:scale-95"
              title={
                language === "en" ? "Switch to हिन्दी" : "Switch to English"
              }
            >
              <Languages className="size-3.5 text-primary" />
              <span>{t("langToggle")}</span>
            </button>

            <button
              type="button"
              onClick={handleBackNavigation}
              className="text-xs sm:text-sm font-semibold text-muted hover:text-primary transition-colors"
            >
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </button>
          </div>
        </div>
      </header>

      {/* Login Screen Wrapper */}
      <section className="flex min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-72px)] items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-md">
          {/* Intro Box */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="mx-auto flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              {step === "identifier" ? (
                <LockKeyhole className="size-5 sm:size-6" />
              ) : (
                <ShieldCheck className="size-5 sm:size-6" />
              )}
            </div>

            <h1 className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {step === "identifier"
                ? language === "hi"
                  ? "सुरक्षित नागरिक लॉगिन"
                  : "Secure Citizen Login"
                : language === "hi"
                  ? "अपनी पहचान सत्यापित करें"
                  : "Verify Your Identity"}
            </h1>

            <p className="mx-auto mt-2 sm:mt-3 max-w-xs text-xs sm:text-sm leading-5 sm:leading-6 text-muted">
              {step === "identifier"
                ? language === "hi"
                  ? "अपने एकीकृत भूमि डैशबोर्ड तक पहुंचने के लिए पहचान संख्या दर्ज करें।"
                  : "Enter your verified government identity number to access your unified land dashboard."
                : language === "hi"
                  ? "सत्यापन के लिए आपके पंजीकृत मोबाइल पर भेजा गया 6-अंकों का OTP दर्ज करें।"
                  : "Enter the 6-digit one-time password sent to your registered mobile number."}
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-white p-5 sm:p-8 shadow-sm">
            {step === "identifier" ? (
              /* ================= IDENTIFIER STEP ================= */
              <form onSubmit={handleGetOtp} className="space-y-5 sm:space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="identifier"
                      className="block text-xs sm:text-sm font-semibold text-foreground"
                    >
                      {language === "hi"
                        ? "सरकारी पहचान संख्या"
                        : "Government Identity Number"}
                    </label>
                    <span className="text-[11px] font-medium text-muted">
                      {language === "hi" ? "12 अंक" : "12 Digits"}
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      id="identifier"
                      type={showIdentifier ? "text" : "password"}
                      value={identifier}
                      onChange={(event) => {
                        const value = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);

                        setIdentifier(value);
                        setError("");
                      }}
                      placeholder={
                        language === "hi"
                          ? "12-अंकों का नंबर दर्ज करें"
                          : "Enter 12-digit Number"
                      }
                      autoComplete="off"
                      inputMode="numeric"
                      maxLength={12}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 font-mono text-sm tracking-wider text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowIdentifier((value) => !value)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted transition-colors hover:text-primary"
                      aria-label={showIdentifier ? "Hide ID" : "Show ID"}
                    >
                      {showIdentifier ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {error && (
                    <p className="mt-2 text-xs font-semibold text-red-600">
                      {error}
                    </p>
                  )}

                  <p className="mt-2 text-[11px] sm:text-xs leading-4 text-muted">
                    {language === "hi"
                      ? "प्रोटोटाइप मूल्यांकन: परीक्षण के लिए कोई भी 12-अंकीय संख्या स्वीकार्य है।"
                      : "Prototype evaluation: Any 12-digit numeric input is accepted for authentication testing."}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={identifier.length !== 12}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {language === "hi" ? "OTP प्राप्त करें" : "Get OTP"}
                  </span>
                  <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              /* ================= OTP STEP ================= */
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-5 sm:space-y-6"
              >
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 sm:p-4">
                  <p className="text-[11px] sm:text-xs font-medium text-muted">
                    {language === "hi"
                      ? "पंजीकृत पहचान पर भेजा गया OTP"
                      : "OTP sent to registered identity"}
                  </p>

                  <p className="mt-1 font-mono text-xs sm:text-sm font-bold text-foreground">
                    •••• •••• {identifier.slice(-4) || "1001"}
                  </p>
                </div>

                {/* OTP Segmented Inputs */}
                <div>
                  <label className="mb-2.5 block text-xs sm:text-sm font-semibold text-foreground">
                    {language === "hi"
                      ? "6-अंकों का OTP दर्ज करें"
                      : "Enter 6-digit OTP"}
                  </label>

                  <div className="flex justify-between gap-1.5 sm:gap-2.5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          otpRefs.current[index] = element;
                        }}
                        value={digit}
                        onChange={(event) =>
                          handleOtpChange(event.target.value, index)
                        }
                        onKeyDown={(event) => handleOtpKeyDown(event, index)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        inputMode="numeric"
                        maxLength={1}
                        className="h-12 w-full max-w-[48px] rounded-xl border border-border bg-background text-center font-mono text-lg font-bold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-13"
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="mt-2 text-xs font-semibold text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otp.join("").length !== 6}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {language === "hi"
                      ? "सत्यापित करें और रिकॉर्ड देखें"
                      : "Verify & Access Records"}
                  </span>
                  <ArrowRight className="size-4" />
                </button>

                <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                  <button
                    type="button"
                    onClick={handleChangeIdentifier}
                    className="inline-flex items-center gap-1 font-semibold text-muted transition-colors hover:text-primary"
                  >
                    <ArrowLeft className="size-3.5" />
                    {language === "hi" ? "नंबर बदलें" : "Change Number"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtp(["1", "2", "3", "4", "5", "6"]);
                      setError("");
                    }}
                    className="font-semibold text-primary hover:underline"
                  >
                    {language === "hi" ? "डेमो OTP भरें" : "Auto-Fill Demo OTP"}
                  </button>
                </div>
              </form>
            )}

            {/* Security Guarantee Note */}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-200/80 p-3 sm:p-3.5">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <p className="text-[11px] leading-4 text-muted">
                {language === "hi"
                  ? "DILRMP & Bhu-Aadhaar अनुपालन: एन्क्रिप्टेड सत्र, पूर्ण डेटा सुरक्षा गारंटी।"
                  : "DILRMP & Bhu-Aadhaar compliance: Encrypted session, zero credential leak guarantee."}
              </p>
            </div>
          </div>

          {/* Back Navigation Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleBackNavigation}
              className="text-xs sm:text-sm font-semibold text-muted transition-colors hover:text-primary"
            >
              ←{" "}
              {language === "hi"
                ? "होम पर वापस जाएं"
                : "Back to LandStack Home"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
