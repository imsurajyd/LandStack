// src/components/auth/LoginPage.jsx
import { useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  Languages,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { useLanguage } from "../../context/LanguageContext";
import { users, landRecords } from "../../data/landData";

export default function LoginPage({ onLoginSuccess, onBack }) {
  const { language, toggleLanguage } = useLanguage();

  const [loginMethod, setLoginMethod] = useState("mobile"); // "mobile" | "ulpin"
  const [mobileNumber, setMobileNumber] = useState(""); // Input pehle se empty rahega
  const [ulpinNumber, setUlpinNumber] = useState("");   // Input pehle se empty rahega
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [matchedUser, setMatchedUser] = useState(null);

  // STEP 1: OTP Request & Raiyat Lookup
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

    let foundUser = null;

    if (loginMethod === "mobile") {
      const cleanMobile = mobileNumber.trim();
      foundUser = users.find((u) => u.registeredMobile === cleanMobile);
      if (!foundUser) {
        // Fallback for demo testing
        foundUser = users[0];
      }
    } else {
      const cleanUlpin = ulpinNumber.trim().toUpperCase();
      const matchedRecord = landRecords.find((l) => l.ulpin === cleanUlpin);
      if (matchedRecord) {
        foundUser = users.find((u) => u.userId === matchedRecord.userId);
      } else {
        foundUser = users[0];
      }
    }

    setMatchedUser(foundUser);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 700);
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(matchedUser?.userId || "USR-1001");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 antialiased flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-border bg-white px-4 sm:px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <BrandLogo size="md" />

          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Languages className="size-3.5 text-primary" />
            <span>{language === "en" ? "हिन्दी" : "English"}</span>
          </button>
        </div>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-xl">
          {/* Back Button */}
          <button
            type="button"
            onClick={otpStep ? () => setOtpStep(false) : onBack}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-primary transition"
          >
            <ArrowLeft className="size-3.5" />
            <span>{language === "hi" ? "वापस जाएं" : "Go Back"}</span>
          </button>

          {/* Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary mb-2">
              <ShieldCheck className="size-3.5" />
              <span>AgriStack & e-Pramaan Single Sign-On</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {language === "hi" ? "नागरिक भू-अभिलेख लॉगिन" : "Citizen Land Portal Login"}
            </h1>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              {language === "hi"
                ? "अपने ई-केवाईसी या भू-आधार से लॉगिन कर अपने सभी भू-पार्सल देखें।"
                : "Log in with your verified credentials to access your land records."}
            </p>
          </div>

          {/* Login Type Switcher (Before OTP) */}
          {!otpStep && (
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("mobile");
                  setErrorMsg("");
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                  loginMethod === "mobile"
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Smartphone className="size-3.5" />
                <span>{language === "hi" ? "मोबाइल OTP" : "Mobile OTP"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginMethod("ulpin");
                  setErrorMsg("");
                }}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 transition ${
                  loginMethod === "ulpin"
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Building2 className="size-3.5" />
                <span>{language === "hi" ? "भू-आधार (ULPIN)" : "ULPIN ID"}</span>
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          {!otpStep ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {loginMethod === "mobile" ? (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {language === "hi" ? "पंजीकृत मोबाइल नंबर" : "Registered Mobile Number"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-xl border border-border bg-slate-50/50 py-2.5 pl-12 pr-4 text-sm font-semibold tracking-wider text-foreground placeholder:text-muted focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">
                    {language === "hi"
                      ? "यह नंबर आपके राजस्व रिकॉर्ड या ई-केवाईसी से लिंक होना चाहिए।"
                      : "Mobile number linked to your Revenue Record / AgriStack Registry."}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    {language === "hi" ? "14-अंकों का भू-आधार (ULPIN)" : "14-Digit Bhu-Aadhaar (ULPIN)"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BR-PAT-2026-1254"
                    value={ulpinNumber}
                    onChange={(e) => setUlpinNumber(e.target.value.toUpperCase())}
                    className="w-full rounded-xl border border-border bg-slate-50/50 py-2.5 px-3.5 font-mono text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="mt-1.5 text-[11px] text-muted">
                    {language === "hi"
                      ? "जमीन के किसी भी एक पार्सल का 14-अंकों का ULPIN दर्ज करें।"
                      : "Enter the unique 14-digit geo-identifier of any linked parcel."}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading ||
                  (loginMethod === "mobile" ? mobileNumber.length < 10 : ulpinNumber.trim().length < 5)
                }
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-dark active:scale-[0.99] transition disabled:opacity-60"
              >
                {isLoading ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <>
                    <span>{language === "hi" ? "ओटीपी भेजें" : "Get Verification OTP"}</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* OTP Screen - Shows Only Name (No Parcel Counts) */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                  <span>
                    {language === "hi"
                      ? `सत्यापन कोड भेजा गया: ${loginMethod === "mobile" ? "+91 " + mobileNumber : ulpinNumber}`
                      : `OTP sent to: ${loginMethod === "mobile" ? "+91 " + mobileNumber : ulpinNumber}`}
                  </span>
                </div>

                {/* Only Name is Displayed */}
                <div className="flex items-center gap-1.5 pl-6 pt-0.5 text-emerald-800 text-[11px]">
                  <UserCheck className="size-3.5 shrink-0 text-emerald-700" />
                  <span>
                    {language === "hi" ? "सत्यापित रैयत:" : "Verified Owner:"}{" "}
                    <strong>{matchedUser?.name || "Ramesh Kumar"}</strong>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  {language === "hi" ? "6-अंकों का ओटीपी (OTP)" : "Enter 6-Digit OTP"}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="• • • • • •"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center rounded-xl border border-border bg-slate-50 py-2.5 px-4 font-mono text-lg tracking-[0.4em] font-bold text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otpValue.length < 4}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-primary-dark active:scale-[0.99] transition disabled:opacity-70"
              >
                {isLoading ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <>
                    <Lock className="size-3.5" />
                    <span>{language === "hi" ? "सत्यापित करें एवं डैशबोर्ड खोलें" : "Verify & Open Dashboard"}</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep(false);
                    setOtpValue("");
                  }}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  {language === "hi" ? "नंबर बदलें या दोबारा भेजें" : "Change input or resend OTP"}
                </button>
              </div>
            </form>
          )}

          {/* Footer Notice */}
          <div className="mt-6 border-t border-border pt-4 text-center">
            <p className="text-[11px] text-muted leading-relaxed">
              {language === "hi"
                ? "सुरक्षित प्रमाणीकरण • डिजिटल इंडिया भू-अभिलेख आधुनिकीकरण (DILRMP) मानकों के अनुरूप"
                : "Secured via DILRMP Framework & Digital Farmer Registry Protocols"}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted">
        © 2026 LandStack. Ministry of Rural Development & AgriStack Aligned.
      </footer>
    </div>
  );
}