// src/components/land/LandProfile.jsx
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Gavel,
  Landmark,
  Map,
  MapPin,
  Maximize2,
  Minimize2,
  UserRound,
  Languages,
  FileCheck2,
} from "lucide-react";

import LandMap from "./LandMap";
import BrandLogo from "../common/BrandLogo";
import DocumentModal from "./DocumentModal";
import { users } from "../../data/landData";
import { useLanguage } from "../../context/LanguageContext";

function LandProfile({ land, onBack, onViewKabala }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [focusParcel, setFocusParcel] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const landData = land || {};
  const owner = users.find((user) => user.userId === landData.userId);

  return (
    <div className="min-h-screen w-full bg-background antialiased">
      {/* Centralized Header with Language Switch */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo size="md" />

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

            <div className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound className="size-4 sm:size-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted transition-colors hover:text-primary active:text-primary"
        >
          <ArrowLeft className="size-4" />
          {language === "hi" ? "वापस डैशबोर्ड पर जाएं" : "Back to My Land"}
        </button>

        {/* Page Heading & ULPIN */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-secondary">
            <span>{language === "hi" ? "भूमि विवरण" : "Land Profile"}</span>
            {landData.ulpin && (
              <>
                <span>•</span>
                <span className="rounded-md bg-secondary/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-secondary">
                  ULPIN: {landData.ulpin}
                </span>
              </>
            )}
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                {landData.district}{" "}
                {language === "hi" ? "भूमि पार्सल" : "Land Parcel"}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-muted">
                <MapPin className="size-3.5 sm:size-4 text-primary shrink-0" />
                <span>
                  {landData.anchal}, {landData.mauza}
                </span>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
              <CheckCircle2 className="size-3.5 sm:size-4" />
              {language === "hi" ? "रिकॉर्ड उपलब्ध" : "Record Available"}
            </span>
          </div>
        </div>

        {/* Location Card */}
        <section className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-4 sm:size-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-foreground">
                {language === "hi" ? "भूमि का स्थान" : "Land Location"}
              </h2>
              <p className="text-xs text-muted">
                {language === "hi"
                  ? "इस पार्सल का प्रशासनिक पता"
                  : "Administrative location of this parcel"}
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <InfoItem
              label={language === "hi" ? "जिला" : "District"}
              value={landData.district}
            />
            <InfoItem
              label={language === "hi" ? "अंचल (सर्किल)" : "Anchal"}
              value={landData.anchal}
            />
            <InfoItem
              label={language === "hi" ? "मौजा (गाँव)" : "Mauza"}
              value={landData.mauza}
            />
            <InfoItem
              label={language === "hi" ? "खेसरा / प्लॉट" : "Khesra / Plot"}
              value={landData.khesra}
            />
          </div>
        </section>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ownership */}
            <section className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-xs">
              <SectionHeader
                icon={UserRound}
                title={
                  language === "hi" ? "स्वामित्व विवरण" : "Ownership Details"
                }
                description={
                  language === "hi"
                    ? "सत्यापित रैयत और पंजी जानकारी"
                    : "Available verified ownership information"
                }
              />
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
                <InfoItem
                  label={language === "hi" ? "रैयत (मालिक)" : "Owner"}
                  value={
                    owner?.name ||
                    landData.owner ||
                    (language === "hi"
                      ? "सत्यापित भूस्वामी"
                      : "Verified Land Owner")
                  }
                />
                <InfoItem
                  label={language === "hi" ? "खाता संख्या" : "Khata Number"}
                  value={landData.khata}
                />
                <InfoItem
                  label={
                    language === "hi" ? "जमाबंदी संख्या" : "Jamabandi Number"
                  }
                  value={landData.jamabandi}
                />
                <InfoItem
                  label={
                    language === "hi" ? "रकबा / क्षेत्रफल" : "Area / Rakba"
                  }
                  value={landData.area}
                />
              </div>
            </section>

            {/* Bank Loan / Mortgage (CERSAI) */}
            <section className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-xs">
              <SectionHeader
                icon={Landmark}
                title="Bank Loan & Mortgage (CERSAI)"
                description={
                  language === "hi"
                    ? "वित्तीय भार और बैंक ग्रहणाधिकार स्थिति"
                    : "Encumbrance status and bank lien records"
                }
              />
              <div className="mt-5">
                {landData.encumbrance?.hasLoan ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 sm:p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="size-5 shrink-0 text-amber-600 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-semibold text-amber-900">
                          {language === "hi"
                            ? "सक्रिय बैंक ऋण पंजीकृत"
                            : "Active Loan Lien Registered"}
                        </p>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {language === "hi" ? "बैंक:" : "Bank:"}{" "}
                          <strong>{landData.encumbrance.bankName}</strong> |{" "}
                          {language === "hi" ? "राशि:" : "Amount:"}{" "}
                          <strong>{landData.encumbrance.amount}</strong>
                        </p>
                        <p className="text-[11px] text-amber-700">
                          Ref: {landData.encumbrance.cersaiId} • Status:{" "}
                          {landData.encumbrance.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start sm:items-center justify-between gap-3 rounded-xl border border-border bg-slate-50/80 p-3.5 sm:p-4">
                    <div>
                      <p className="text-xs font-medium text-muted">
                        {language === "hi"
                          ? "बंधक / वित्तीय भार"
                          : "Mortgage / Encumbrance"}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground">
                        {language === "hi"
                          ? "कोई बैंक बंधक नहीं मिला (शून्य भार)"
                          : "No Active Bank Lien Found (Nil)"}
                      </p>
                      <p className="mt-1 text-[11px] text-muted leading-relaxed">
                        {language === "hi"
                          ? "CERSAI एवं रजिस्ट्री रिकॉर्ड के आधार पर गैर-भार प्रमाणपत्र।"
                          : "Non-Encumbrance Status based on connected CERSAI & SRO registry logs."}
                      </p>
                    </div>
                    <CheckCircle2 className="size-5 text-secondary shrink-0 mt-0.5 sm:mt-0" />
                  </div>
                )}
              </div>
            </section>

            {/* Case / Dispute Status (e-Courts) */}
            <section className="rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-xs">
              <SectionHeader
                icon={Gavel}
                title={
                  language === "hi"
                    ? "मुकदमा / विवाद स्थिति (e-Courts)"
                    : "Case / Dispute Status"
                }
                description={
                  language === "hi"
                    ? "ई-कोर्ट एवं राजस्व न्यायालयों में जुड़े मामले"
                    : "Connected proceedings in e-Courts & State Revenue Courts"
                }
              />

              <div className="mt-5">
                {landData.litigation?.hasDispute ? (
                  <div className="rounded-xl border border-red-200 bg-red-50/70 p-3.5 sm:p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="size-5 shrink-0 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-red-900">
                          {language === "hi"
                            ? "सक्रिय कानूनी मामला:"
                            : "Active Legal Proceeding:"}{" "}
                          {landData.litigation.caseNumber}
                        </p>
                        <p className="mt-1 text-xs text-red-800 leading-relaxed">
                          {landData.litigation.court} —{" "}
                          {landData.litigation.caseType}
                        </p>
                        <p className="mt-1 text-xs font-medium text-red-700">
                          {language === "hi" ? "स्थिति:" : "Status:"}{" "}
                          {landData.litigation.caseStatus}
                        </p>
                        <p className="mt-2 text-[11px] text-red-600 leading-relaxed">
                          {landData.litigation.disclaimer}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-3.5 sm:p-4">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">
                          {landData.litigation?.caseStatus ||
                            (language === "hi"
                              ? "जुड़े रिकॉर्ड में कोई विवाद उपलब्ध नहीं"
                              : "No case available in connected records")}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {landData.litigation?.disclaimer ||
                            (language === "hi"
                              ? "यह जुड़े हुए डिजिटल डेटाबेस में उपलब्ध वर्तमान स्थिति दर्शाता है।"
                              : "This indicates the status available in connected digital records.")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column (Map & Documents) */}
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-xs">
              <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Map className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-foreground">
                      {language === "hi"
                        ? "भू-नक्शा (कैडस्ट्रल)"
                        : "Parcel Map"}
                    </h2>
                    <p className="text-xs text-muted">
                      {language === "hi"
                        ? "सीमांकन दृश्य"
                        : "Cadastral boundary view"}
                    </p>
                  </div>
                </div>

                {/* Direct Maximize Button in Header */}
                <button
                  type="button"
                  onClick={() => setIsFullMapOpen(true)}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-slate-600 transition hover:bg-slate-100 hover:text-primary active:scale-95"
                  title={
                    language === "hi" ? "फुल मैप खोलें" : "Expand to Full Map"
                  }
                  aria-label="Expand to Full Map"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>

              <div className="h-[280px] sm:h-[340px] w-full">
                <LandMap land={landData} focusParcel={focusParcel} />
              </div>

              <div className="grid grid-cols-2 gap-2.5 p-3 sm:p-4">
                <button
                  type="button"
                  onClick={() => setFocusParcel((c) => c + 1)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-xs sm:text-sm font-semibold text-primary transition-colors hover:bg-primary/10 active:bg-primary/15"
                >
                  <MapPin className="size-3.5 sm:size-4" />
                  {language === "hi" ? "प्लॉट खोजें" : "Locate Plot"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullMapOpen(true)}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-primary-dark active:scale-[0.98]"
                >
                  <Maximize2 className="size-3.5 sm:size-4" />
                  {language === "hi" ? "बड़ा नक्शा" : "Full Map"}
                </button>
              </div>
            </section>

            {/* Official Records Available */}
            <section className="rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-xs">
              <h2 className="text-sm sm:text-base font-bold text-foreground">
                {language === "hi" ? "आधिकारिक अभिलेख" : "Official Records"}
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                {language === "hi"
                  ? "प्रिंट व सत्यापन हेतु डिजिटल प्रमाणित प्रतिलिपि"
                  : "Click to view certified legal record"}
              </p>

              <div className="mt-4 space-y-2.5">
                {/* 1. KABALA / REGISTERED SALE DEED (Direct Dedicated Page) */}
                <DocumentItem
                  title={
                    language === "hi"
                      ? "पंजीकृत केवाला / विक्रय पत्र (Kabala)"
                      : "Registered Sale Deed (Kabala)"
                  }
                  type={
                    language === "hi"
                      ? "निबंधन विभाग • मूल स्कैन व विलेख प्रतिलिपि"
                      : "Registration Dept • Scanned Deed Page"
                  }
                  highlight
                  onClick={() => {
                    if (onViewKabala) {
                      onViewKabala(landData);
                    } else {
                      // Fallback in case onViewKabala is not passed yet
                      setSelectedDocument({
                        title:
                          language === "hi"
                            ? "पंजीकृत विक्रय विलेख (केवाला)"
                            : "Registered Sale Deed (Kabala)",
                        docType: "FORM-I REGISTERED SALE DEED",
                        number:
                          landData.deedDetails?.deedNo ||
                          `DEED/2018/00${landData.khesra}`,
                        issueDate:
                          landData.deedDetails?.registrationDate ||
                          "14-07-2018",
                        isKabala: true,
                        deedDetails: landData.deedDetails,
                      });
                    }
                  }}
                />

                {/* 2. JAMABANDI (RoR) */}
                <DocumentItem
                  title={
                    language === "hi"
                      ? "डिजिटल जमाबंदी पंजी (RoR)"
                      : "Jamabandi (RoR) Ledger"
                  }
                  type="Revenue Register"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Digital Jamabandi Panji (RoR)",
                      docType: "FORM-II REVENUE REGISTER",
                      number: landData.jamabandi,
                      issueDate: "23-09-2026",
                    })
                  }
                />

                {/* 3. NON-ENCUMBRANCE CERTIFICATE (NEC) */}
                <DocumentItem
                  title={
                    language === "hi"
                      ? "गैर-भार प्रमाणपत्र (NEC)"
                      : "Non-Encumbrance Certificate"
                  }
                  type="CERSAI Financial Record"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Non-Encumbrance Certificate (NEC)",
                      docType: "FORM-XV SEARCH CERTIFICATE",
                      number: `NEC-${landData.khesra}-2026`,
                      issueDate: "23-09-2026",
                    })
                  }
                />

                {/* 4. CADASTRAL SURVEY CERTIFICATE */}
                <DocumentItem
                  title={
                    language === "hi"
                      ? "कैडस्ट्रल सर्वेक्षण प्रतिलिपि"
                      : "Cadastral Survey Certificate"
                  }
                  type="GIS Spatial Slip"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Cadastral Survey Demarcation Slip",
                      docType: "DILRMP Bhu-Naksha Extract",
                      number: landData.ulpin || `ULP-${landData.khesra}`,
                      issueDate: "23-09-2026",
                    })
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* SEPARATE DOCUMENT MODAL (For Jamabandi, NEC & Cadastral Survey) */}
      {selectedDocument && (
        <DocumentModal
          docData={selectedDocument}
          land={landData}
          ownerName={owner?.name}
          onClose={() => setSelectedDocument(null)}
        />
      )}

      {/* FULL MAP MODAL */}
      {isFullMapOpen && (
        <div className="fixed inset-0 z-[2000] flex flex-col bg-white">
          <div className="flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-border bg-white px-3 sm:px-6">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
              <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Map className="size-4" />
              </div>
              <div className="truncate">
                <h2 className="text-xs sm:text-base font-bold text-foreground truncate">
                  {landData.district} — {language === "hi" ? "प्लॉट" : "Plot"} #
                  {landData.khesra}
                </h2>
                <p className="hidden sm:block text-[11px] text-muted">
                  {language === "hi"
                    ? "पूर्ण कैडस्ट्रल सीमांकन दृश्य"
                    : "Full Cadastral Boundary View"}{" "}
                  • {landData.anchal}, {landData.mauza}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setFocusParcel((c) => c + 1)}
                className="flex size-8 sm:size-auto sm:h-8 items-center justify-center gap-1.5 rounded-lg border border-border px-0 sm:px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95"
                title={language === "hi" ? "प्लॉट खोजें" : "Locate Plot"}
                aria-label="Locate Plot"
              >
                <MapPin className="size-3.5 text-primary" />
                <span className="hidden sm:inline">
                  {language === "hi" ? "प्लॉट खोजें" : "Locate Plot"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullMapOpen(false)}
                className="flex size-8 sm:size-auto sm:h-8 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-0 sm:px-3 text-xs font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-95"
                title={
                  language === "hi" ? "फुलस्क्रीन बंद करें" : "Exit Fullscreen"
                }
                aria-label="Exit Fullscreen"
              >
                <Minimize2 className="size-3.5" />
                <span className="hidden sm:inline">
                  {language === "hi" ? "फुलस्क्रीन बंद करें" : "Exit"}
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex-1 w-full h-full bg-slate-100">
            <LandMap land={landData} fullScreen focusParcel={focusParcel} />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4 sm:size-5" />
      </div>
      <div>
        <h2 className="text-sm sm:text-base font-bold text-foreground">
          {title}
        </h2>
        <p className="text-xs text-muted">{description}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-background p-3 sm:p-3.5">
      <p className="text-[11px] sm:text-xs font-medium text-muted">{label}</p>
      <p className="mt-0.5 text-xs sm:text-sm font-semibold text-foreground break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}

function DocumentItem({ title, type, onClick, highlight }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors active:scale-[0.99] ${
        highlight
          ? "border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50"
          : "border-border hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div
          className={`flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg ${
            highlight
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-primary/10 text-primary"
          }`}
        >
          {highlight ? (
            <FileCheck2 className="size-4" />
          ) : (
            <FileText className="size-4" />
          )}
        </div>
        <div>
          <span className="text-xs sm:text-sm font-semibold text-foreground block">
            {title}
          </span>
          <p className="text-[10px] sm:text-[11px] text-muted">{type}</p>
        </div>
      </div>
      <ArrowRight className="size-4 text-muted shrink-0" />
    </button>
  );
}

export default LandProfile;