// src/components/land/KabalaViewerPage.jsx
import { useState } from "react";
import {
  ArrowLeft,
  Printer,
  ScrollText,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Stamp,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import LanguageButton from "../common/LanguageButton";
import { useLanguage } from "../../context/LanguageContext";

export default function KabalaViewerPage({ land, onBack }) {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState("scanned"); // "scanned" | "transcript"
  const [zoomLevel, setZoomLevel] = useState(100);

  const deed = land?.deedDetails || {
    deedNo: `DEED/2018/00${land?.khesra || "1254"}`,
    registrationDate: "14-07-2018",
    bookNo: "1",
    volumeNo: "42",
    pageFrom: "112",
    pageTo: "118",
    sroOffice: `Sub-Registrar Office, ${land?.anchal || "Danapur"} (${land?.district || "Patna"})`,
    sellerName: "Bishwanath Singh",
    buyerName: land?.owner || "Ramesh Kumar",
    considerationAmount: "₹ 18,50,000",
    stampDuty: "₹ 1,11,000",
    chauhaddi: {
      north: "Nij Khesra (Ramautar Rai)",
      south: "Gramin Sadak (P.W.D.)",
      east: "Nala Awam Khesra",
      west: "Khesra (Kailash Yadav)",
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-slate-100/70 print:bg-white print:min-h-0 antialiased text-foreground selection:bg-primary/20">
      {/* 1. TOP NAVBAR (print:hidden laga diya gaya hai) */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xs print:hidden">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ScrollText className="size-5" />
            </div>
            <BrandLogo size="md" />
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageButton />

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-primary active:scale-95"
            >
              <Printer className="size-3.5 text-primary" />
              <span className="hidden sm:inline">
                {language === "hi" ? "प्रिंट करें" : "Print"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. FIXED/STICKY SUB-BAR (print:hidden laga diya gaya hai) */}
      <div className="sticky top-16 sm:top-18 z-30 border-b border-slate-200 bg-white/95 px-4 py-2.5 shadow-xs backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          {/* Back Navigation + Deed Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-primary/40 hover:bg-white hover:text-primary active:scale-95 shrink-0"
              title={language === "hi" ? "वापस जाएँ" : "Back to Profile"}
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">
                {language === "hi" ? "वापस" : "Back"}
              </span>
            </button>

            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-bold text-emerald-800">
                  {deed.deedNo}
                </span>
                <span className="hidden md:inline text-xs text-muted truncate">
                  • {deed.sroOffice}
                </span>
              </div>
            </div>
          </div>

          {/* View Type Toggle & Zoom Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Toggle View Mode */}
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode("scanned")}
                className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs transition ${
                  viewMode === "scanned"
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {language === "hi" ? "मूल स्कैन प्रति" : "Scanned Copy"}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("transcript")}
                className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs transition ${
                  viewMode === "transcript"
                    ? "bg-white text-primary shadow-xs"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {language === "hi" ? "ट्रांसक्रिप्ट" : "Transcript"}
              </button>
            </div>

            {/* Zoom Controls */}
            {viewMode === "scanned" && (
              <div className="hidden sm:flex items-center gap-1 rounded-xl border border-border bg-white px-2 py-1 text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
                  className="p-1 text-muted hover:text-foreground"
                  title="Zoom Out"
                >
                  <ZoomOut className="size-3.5" />
                </button>
                <span className="font-mono text-[11px] font-semibold text-slate-700 px-1">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
                  className="p-1 text-muted hover:text-foreground"
                  title="Zoom In"
                >
                  <ZoomIn className="size-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN SCROLLABLE DOCUMENT CONTAINER (print:p-0 print:m-0) */}
      <main className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
        {viewMode === "scanned" ? (
          /* ========================================================
             ORIGINAL SCANNED STAMP PAPER FORMAT
          ======================================================== */
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
            }}
            className="mx-auto max-w-3xl rounded-3xl border-2 border-amber-900/30 bg-[#fffef7] p-6 sm:p-12 font-serif shadow-xl transition-transform duration-200 print:shadow-none print:border-none print:p-4 print:m-0 print:transform-none print:max-w-full"
          >
            {/* Top Security Border Header */}
            <div className="relative border-4 border-double border-amber-900/80 p-5 sm:p-6 text-center">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-widest text-amber-950">
                <span>INDIA NON JUDICIAL</span>
                <span>GOVERNMENT OF BIHAR</span>
                <span>{deed.stampDuty}</span>
              </div>

              <div className="my-4 flex flex-col items-center justify-center">
                <div className="flex size-16 sm:size-20 items-center justify-center rounded-full border-2 border-amber-900 bg-white shadow-sm">
                  <Scale className="size-9 sm:size-11 text-amber-950" />
                </div>
                <h2 className="mt-2 text-base sm:text-lg font-black tracking-widest text-amber-950 uppercase">
                  REGISTRATION DEPARTMENT • बिहार सरकार
                </h2>
                <p className="text-xs font-mono font-semibold tracking-wider text-amber-900">
                  REGISTRATION STAMP PAPER • E-STAMP CERTIFICATE
                </p>
              </div>

              <div className="grid grid-cols-2 border-t border-amber-900/40 pt-2.5 text-left text-xs font-sans text-amber-950">
                <div>
                  <span>Deed Number: </span>
                  <strong className="font-mono">{deed.deedNo}</strong>
                </div>
                <div className="text-right">
                  <span>Execution Date: </span>
                  <strong>{deed.registrationDate}</strong>
                </div>
              </div>
            </div>

            {/* Document Content Body */}
            <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-800">
              <div className="text-center font-bold underline text-base text-slate-950">
                {language === "hi"
                  ? "॥ बैनामा / केवाला (विक्रय विलेख) ॥"
                  : "CERTIFIED REGISTERED SALE DEED (KEWALA)"}
              </div>

              <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4 font-sans space-y-2 print:bg-transparent">
                <p>
                  <strong className="text-slate-900">
                    प्रथम पक्ष / विक्रेता (Seller):
                  </strong>{" "}
                  {deed.sellerName}, साकिन: मौजा {land?.mauza}, अंचल:{" "}
                  {land?.anchal}, जिला: {land?.district} (बिहार)।
                </p>
                <p>
                  <strong className="text-slate-900">
                    द्वितीय पक्ष / क्रेता (Purchaser):
                  </strong>{" "}
                  {deed.buyerName}, साकिन: {land?.anchal}, जिला:{" "}
                  {land?.district} (बिहार)।
                </p>
              </div>

              <p className="italic text-slate-700 leading-relaxed">
                "हम विक्रेता अपनी सम्पूर्ण स्वस्थ बुद्धि, बिना किसी दबाव के, कुल
                प्रतिफल राशि{" "}
                <strong className="text-slate-950">
                  {deed.considerationAmount}
                </strong>{" "}
                नकद/बैंकिंग माध्यम द्वारा प्राप्त कर अपनी स्व-अर्जित निम्नलिखित
                आराजी भूमि का सम्पूर्ण स्वामित्व, कब्जा और अधिकार सदा-सर्वदा के
                लिए द्वितीय पक्ष (क्रेता) के पक्ष में विक्रय व अंतरित करते हैं।"
              </p>

              {/* Boundary / Chauhaddi Box */}
              <div className="rounded-2xl border border-amber-800/40 bg-white p-4 sm:p-5 font-sans shadow-xs print:shadow-none">
                <h3 className="font-bold text-xs sm:text-sm text-slate-950 mb-3 border-b border-slate-200 pb-1.5">
                  भूमि विवरण एवं चौहद्दी (Demarcated Boundary Coordinates)
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
                  <div className="bg-slate-50 p-2 rounded-lg print:border print:border-slate-200">
                    <span className="text-muted block text-[11px]">
                      खाता (Khata)
                    </span>
                    <strong className="text-foreground">{land?.khata}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg print:border print:border-slate-200">
                    <span className="text-muted block text-[11px]">
                      खेसरा (Plot)
                    </span>
                    <strong className="text-foreground">{land?.khesra}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg print:border print:border-slate-200">
                    <span className="text-muted block text-[11px]">
                      रकबा (Area)
                    </span>
                    <strong className="text-foreground">{land?.area}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg print:border print:border-slate-200">
                    <span className="text-muted block text-[11px]">
                      तौजी संख्या
                    </span>
                    <strong className="text-foreground">1420</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-amber-50/40 p-3 rounded-xl border border-amber-100 print:bg-transparent">
                  <div>
                    उत्तर (North): <strong>{deed.chauhaddi?.north}</strong>
                  </div>
                  <div>
                    दक्षिण (South): <strong>{deed.chauhaddi?.south}</strong>
                  </div>
                  <div>
                    पूरब (East): <strong>{deed.chauhaddi?.east}</strong>
                  </div>
                  <div>
                    पश्चिम (West): <strong>{deed.chauhaddi?.west}</strong>
                  </div>
                </div>
              </div>

              {/* Official Seal and Signatures */}
              <div className="mt-10 flex items-center justify-between border-t-2 border-slate-300 pt-6">
                <div className="flex flex-col items-center">
                  <div className="size-20 rounded-2xl border-2 border-dashed border-slate-400 bg-white flex items-center justify-center text-[11px] text-slate-400 font-sans">
                    L.T.I. / अंगूठा
                  </div>
                  <span className="text-xs mt-1.5 font-sans font-semibold text-slate-700">
                    हस्ताक्षर विक्रेता
                  </span>
                </div>

                <div className="flex flex-col items-center border-2 border-emerald-700 bg-emerald-50/60 p-3 rounded-2xl text-center shadow-xs print:shadow-none">
                  <Stamp className="size-7 text-emerald-800" />
                  <span className="text-xs font-bold text-emerald-950 mt-1">
                    SRO VERIFIED OFFICIAL SEAL
                  </span>
                  <span className="text-[10px] text-emerald-800 font-mono">
                    {deed.sroOffice}
                  </span>
                </div>

                <div className="text-right font-sans text-xs">
                  <p className="font-bold text-slate-950">
                    Sub-Registrar Officer
                  </p>
                  <p className="text-muted text-[11px]">
                    Digitally Recorded in Book No. {deed.bookNo}
                  </p>
                  <p className="text-[11px] font-mono font-semibold text-slate-700">
                    Vol: {deed.volumeNo} • Pages: {deed.pageFrom}-{deed.pageTo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             DIGITAL REVENUE TRANSCRIPT VIEW
          ======================================================== */
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm print:shadow-none print:border-none print:p-4 print:m-0 print:max-w-full">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {language === "hi"
                    ? "डिजिटल विक्रय विलेख सारांश"
                    : "Certified Sale Deed Transcript"}
                </h2>
                <p className="text-xs text-muted">
                  FORM-I REGISTRATION RECORD • SRO ELECTRONIC ARCHIVE
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Verified Registration
              </span>
            </div>

            <div className="mt-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-transparent">
                <div>
                  <span className="text-muted text-[11px] block">
                    Deed Number
                  </span>
                  <strong className="font-mono text-foreground text-sm">
                    {deed.deedNo}
                  </strong>
                </div>
                <div>
                  <span className="text-muted text-[11px] block">
                    Registration Date
                  </span>
                  <strong className="text-foreground text-sm">
                    {deed.registrationDate}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 print:bg-transparent print:border-slate-200">
                  <span className="text-muted text-[11px] block">District</span>
                  <strong className="text-foreground">{land?.district}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 print:bg-transparent print:border-slate-200">
                  <span className="text-muted text-[11px] block">Anchal</span>
                  <strong className="text-foreground">{land?.anchal}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 print:bg-transparent print:border-slate-200">
                  <span className="text-muted text-[11px] block">
                    Plot / Khesra
                  </span>
                  <strong className="text-foreground">{land?.khesra}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 print:bg-transparent print:border-slate-200">
                  <span className="text-muted text-[11px] block">
                    Area / Rakba
                  </span>
                  <strong className="text-foreground">{land?.area}</strong>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 space-y-2.5">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-muted">Seller (First Party):</span>
                  <strong className="text-foreground">{deed.sellerName}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-muted">Purchaser (Second Party):</span>
                  <strong className="text-foreground">{deed.buyerName}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-muted">Registering Authority:</span>
                  <span className="text-slate-700">{deed.sroOffice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Total Consideration Value:</span>
                  <strong className="text-emerald-700">
                    {deed.considerationAmount}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-5 flex items-center justify-between text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>e-Nibandhan State Registration Database</span>
              </div>
              <span className="font-mono text-[11px]">
                SHA-256 Verified Seal
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}