import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { users } from "../../data/landData";

function LoginPage({ onLoginSuccess }) {
  const [step, setStep] = useState("identifier");
  const [identifier, setIdentifier] = useState("");
  const [showIdentifier, setShowIdentifier] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  const handleGetOtp = (event) => {
    event.preventDefault();

    const aadhaar = identifier.trim();

    if (!/^\d{12}$/.test(aadhaar)) {
      setError("12-digit Aadhaar number enter karein.");
      return;
    }

    const user = users.find((item) => item.aadhaar === aadhaar);

    if (!user) {
      setError("Aadhaar number registered nahi hai.");
      return;
    }

    setError("");
    setStep("otp");

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 50);
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

    if (enteredOtp.length !== 6) return;

    const aadhaar = identifier.trim();

    const user = users.find((item) => item.aadhaar === aadhaar);

    if (!user) {
      setError("User verify nahi hua.");
      return;
    }

    /*
      Prototype OTP verification.

      Production me yahan real OTP backend
      verification connect hoga.
    */

    onLoginSuccess?.(user.userId);
  };

  const handleChangeIdentifier = () => {
    setStep("identifier");
    setOtp(["", "", "", "", "", ""]);
    setError("");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center px-5 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <ShieldCheck className="size-5 text-white" />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-primary">
                Land<span className="text-secondary">Stack</span>
              </div>

              <p className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:block">
                Digital Land Governance
              </p>
            </div>
          </a>
        </div>
      </header>

      {/* Login */}
      <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-12 sm:px-6">
        <div className="w-full max-w-md">
          {/* Intro */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {step === "identifier" ? (
                <LockKeyhole className="size-6" />
              ) : (
                <ShieldCheck className="size-6" />
              )}
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
              {step === "identifier" ? "Secure Login" : "Verify Your Identity"}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">
              {step === "identifier"
                ? "अपने land dashboard तक पहुँचने के लिए अपनी registered identity details दर्ज करें।"
                : "आपके registered mobile number पर भेजे गए OTP को enter करें।"}
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            {step === "identifier" ? (
              /* ================= IDENTIFIER STEP ================= */
              <form onSubmit={handleGetOtp} className="space-y-6">
                <div>
                  <label
                    htmlFor="identifier"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Aadhaar Number
                  </label>

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
                      placeholder="Enter 12-digit Aadhaar Number"
                      autoComplete="off"
                      inputMode="numeric"
                      maxLength={12}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 pr-12 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowIdentifier((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted transition-colors hover:text-primary"
                      aria-label={
                        showIdentifier ? "Hide Aadhaar" : "Show Aadhaar"
                      }
                    >
                      {showIdentifier ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {error && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <p className="mt-2 text-xs leading-5 text-muted">
                    Prototype में यह field simulated है। Production में
                    authorized identity verification integration का उपयोग किया
                    जाएगा।
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={identifier.length !== 12}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Get OTP
                  <ArrowRight className="size-4" />
                </button>
              </form>
            ) : (
              /* ================= OTP STEP ================= */
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="rounded-xl bg-background p-4">
                  <p className="text-xs text-muted">
                    OTP sent to registered mobile
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {identifier.replace(/\d(?=\d{4})/g, "•")}
                  </p>
                </div>

                {/* OTP */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-foreground">
                    Enter 6-digit OTP
                  </label>

                  <div className="flex gap-2 sm:gap-3">
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
                        className="h-12 w-full rounded-xl border border-border bg-background text-center text-lg font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                        aria-label={`OTP digit ${index + 1}`}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="mt-2 text-xs font-medium text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otp.join("").length !== 6}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Verify & Continue
                  <ArrowRight className="size-4" />
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleChangeIdentifier}
                    className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-primary"
                  >
                    <ArrowLeft className="size-4" />
                    Change ID
                  </button>

                  <button
                    type="button"
                    className="font-medium text-primary hover:underline"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            {/* Security Note */}
            <div className="mt-6 flex gap-3 rounded-xl bg-secondary/5 p-4">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary" />

              <p className="text-xs leading-5 text-muted">
                Your access is designed around secure authentication, consent
                and controlled access to available records.
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              ← Back to LandStack
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
