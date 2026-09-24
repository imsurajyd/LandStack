// src/components/dashboard/Dashboard.jsx
import { useState } from "react";
import {
  ArrowRight,
  FileText,
  Map,
  MapPin,
  ShieldCheck,
  UserRound,
  WalletCards,
  Gavel,
  Landmark,
  LogOut,
  Search,
  X,
  AlertTriangle,
  Languages,
} from "lucide-react";

import { users, landRecords } from "../../data/landData";
import BrandLogo from "../common/BrandLogo";
import { useLanguage } from "../../context/LanguageContext";

function Dashboard({
  userId,
  onLogout,
  onViewLand,
  onSelectLand,
  onViewDetails,
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all"); // 'all' | 'cases' | 'loans'

  // Safe handler jo kisi bhi prop name ko accept kar lega
  const handleSelectLand = (land) => {
    const triggerFn = onViewLand || onSelectLand || onViewDetails;
    if (triggerFn) {
      triggerFn(land);
    } else {
      console.warn("View Details trigger function missing in App.jsx props!");
    }
  };

  // Current logged-in user
  const currentUserId = userId || "USR-1001";
  const currentUser =
    users.find((user) => user.userId === currentUserId) || users[0];

  // User's land records
  const userLandRecords = landRecords.filter(
    (land) => land.userId === currentUserId,
  );

  // Search & Filter combined logic
  const filteredLandRecords = userLandRecords.filter((land) => {
    if (filterType === "cases" && !land.litigation?.hasDispute) {
      return false;
    }
    if (filterType === "loans" && !land.encumbrance?.hasLoan) {
      return false;
    }

    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return [
      land.district,
      land.anchal,
      land.mauza,
      land.khesra,
      land.khata,
      land.jamabandi,
      land.area,
      land.landType,
      land.landUse,
      land.ulpin,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(query),
    );
  });

  // Accurate Stats calculation
  const totalArea = userLandRecords.reduce((total, land) => {
    const numericArea = land.areaAcre ?? parseFloat(land.area) ?? 0;
    return total + (Number.isNaN(numericArea) ? 0 : numericArea);
  }, 0);

  const totalDistricts = new Set(userLandRecords.map((land) => land.district))
    .size;

  const activeCases = userLandRecords.filter(
    (land) => land.litigation?.hasDispute,
  ).length;

  const activeLoans = userLandRecords.filter(
    (land) => land.encumbrance?.hasLoan,
  ).length;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen w-full bg-background antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo size="md" />

          {/* User Profile, Language Toggle & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switch Button */}
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

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">
                {currentUser?.name ||
                  (language === "hi" ? "जमीन मालिक" : "Land Owner")}
              </p>
              <p className="text-xs text-muted">
                {currentUser?.identityStatus ||
                  (language === "hi" ? "सत्यापित नागरिक" : "Verified Citizen")}
              </p>
            </div>

            <div className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound className="size-4 sm:size-5" />
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={onLogout}
              className="flex size-9 sm:size-auto sm:h-9 items-center justify-center gap-1.5 rounded-xl border border-border px-0 sm:px-3 text-xs font-semibold text-muted transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
              title={language === "hi" ? "लॉग आउट" : "Logout"}
              aria-label="Logout"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">
                {language === "hi" ? "लॉग आउट" : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
            {language === "hi" ? "स्वागत है" : "Welcome"},{" "}
            {currentUser?.name ||
              (language === "hi" ? "जमीन मालिक" : "Land Owner")}
          </h1>
          <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-5 sm:leading-6 text-muted">
            {language === "hi"
              ? "यहाँ आपके DILRMP और Bhu-Aadhaar से जुड़े multi-district land holdings, cadastral maps, CERSAI mortgage status और e-Courts litigation data एक ही जगह प्रदर्शित हैं।"
              : "Here your DILRMP and Bhu-Aadhaar aligned multi-district land holdings, cadastral maps, CERSAI mortgage status, and e-Courts litigation data are consolidated in one pane of glass."}
          </p>
        </div>

        {/* Dynamic Statistics Cards */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {/* Total Land */}
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted">
                  {language === "hi" ? "कुल भूमि रकबा" : "Total Land Area"}
                </p>
                <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-foreground">
                  {totalArea.toFixed(2)}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {language === "hi" ? "एकड़ (समग्र)" : "Acre (Aggregated)"}
                </p>
              </div>
              <div className="flex size-9 sm:size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary shrink-0">
                <Map className="size-4 sm:size-5" />
              </div>
            </div>
          </div>

          {/* Total Parcels */}
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted">
                  {language === "hi" ? "कुल पार्सल" : "Total Parcels"}
                </p>
                <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-foreground">
                  {userLandRecords.length}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {language === "hi" ? "सर्वेक्षित प्लॉट" : "Surveyed plots"}
                </p>
              </div>
              <div className="flex size-9 sm:size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <MapPin className="size-4 sm:size-5" />
              </div>
            </div>
          </div>

          {/* Connected Districts */}
          <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted">
                  {language === "hi" ? "संबद्ध जिले" : "Districts"}
                </p>
                <p className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-foreground">
                  {totalDistricts}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {language === "hi"
                    ? "राज्यव्यापी होल्डिंग्स"
                    : "Statewide holdings"}
                </p>
              </div>
              <div className="flex size-9 sm:size-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                <Map className="size-4 sm:size-5" />
              </div>
            </div>
          </div>

          {/* Active Cases / Risk Alerts */}
          <div
            onClick={() =>
              setFilterType(filterType === "cases" ? "all" : "cases")
            }
            className={`cursor-pointer rounded-2xl border p-4 sm:p-5 shadow-xs transition-all active:scale-[0.99] ${
              filterType === "cases"
                ? "border-red-500 bg-red-50/50"
                : "border-border bg-white hover:border-red-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted">
                  {language === "hi"
                    ? "सक्रिय कानूनी विवाद"
                    : "Active Disputes"}
                </p>
                <p
                  className={`mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold ${activeCases > 0 ? "text-red-600" : "text-foreground"}`}
                >
                  {activeCases}
                </p>
                <p className="mt-0.5 text-[11px] text-muted">
                  {activeCases > 0
                    ? language === "hi"
                      ? "विवादित प्लॉट देखें"
                      : "Tap to filter disputes"
                    : language === "hi"
                      ? "कोई विवाद नहीं"
                      : "No pending disputes"}
                </p>
              </div>
              <div
                className={`flex size-9 sm:size-11 items-center justify-center rounded-xl shrink-0 ${activeCases > 0 ? "bg-red-100 text-red-600" : "bg-secondary/10 text-secondary"}`}
              >
                <Gavel className="size-4 sm:size-5" />
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="mt-6 sm:mt-8 rounded-2xl border border-border bg-white p-4 sm:p-6 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="size-4 sm:size-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-foreground">
                {language === "hi" ? "भूमि पार्सल खोजें" : "Search Land Parcel"}
              </h2>
              <p className="mt-0.5 text-xs text-muted">
                {language === "hi"
                  ? "जिला, अंचल, मौजा, खेसरा, खाता, जमाबंदी या ULPIN द्वारा खोजें।"
                  : "Search by District, Anchal, Mauza, Khesra, Khata, Jamabandi, or ULPIN."}
              </p>
            </div>
          </div>

          <div className="relative mt-4 sm:mt-5">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 sm:size-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                language === "hi"
                  ? "खेसरा, खाता, जिला, मौजा या ULPIN दर्ज करें..."
                  : "Search Khesra, Khata, District, ULPIN..."
              }
              className="h-11 sm:h-12 w-full rounded-xl border border-border bg-background pl-10 sm:pl-12 pr-10 text-xs sm:text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-slate-100 hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted">
            <span className="font-semibold text-foreground text-[11px] sm:text-xs mr-1">
              {language === "hi" ? "फ़िल्टर:" : "Filter:"}
            </span>

            <button
              type="button"
              onClick={() => {
                setFilterType("all");
                setSearchQuery("");
              }}
              className={`rounded-full border px-3 py-1 text-[11px] sm:text-xs font-medium transition-colors ${
                filterType === "all" && !searchQuery
                  ? "border-primary bg-primary text-white"
                  : "border-border hover:bg-slate-50 text-slate-700"
              }`}
            >
              {language === "hi" ? "सभी" : "All"} ({userLandRecords.length})
            </button>

            <button
              type="button"
              onClick={() =>
                setFilterType(filterType === "cases" ? "all" : "cases")
              }
              className={`rounded-full border px-3 py-1 text-[11px] sm:text-xs font-medium transition-colors ${
                filterType === "cases"
                  ? "border-red-500 bg-red-600 text-white"
                  : "border-border hover:border-red-200 hover:text-red-600 text-slate-700"
              }`}
            >
              {language === "hi" ? "विवादित" : "Disputed"} ({activeCases})
            </button>

            <button
              type="button"
              onClick={() =>
                setFilterType(filterType === "loans" ? "all" : "loans")
              }
              className={`rounded-full border px-3 py-1 text-[11px] sm:text-xs font-medium transition-colors ${
                filterType === "loans"
                  ? "border-amber-500 bg-amber-600 text-white"
                  : "border-border hover:border-amber-200 hover:text-amber-700 text-slate-700"
              }`}
            >
              {language === "hi" ? "बैंक बंधक" : "Mortgage"} ({activeLoans})
            </button>
          </div>
        </section>

        {/* Main Grid: Land Records & Quick Actions */}
        <section className="mt-6 sm:mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Land Cards List */}
          <div className="rounded-2xl border border-border bg-white shadow-xs">
            <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">
                  {language === "hi"
                    ? "मेरी जमीन के अभिलेख"
                    : "My Land Records"}
                </h2>
                <p className="text-xs text-muted">
                  {filteredLandRecords.length}{" "}
                  {language === "hi"
                    ? "पार्सल सूचीबद्ध"
                    : `parcel${filteredLandRecords.length === 1 ? "" : "s"} listed`}
                  {filterType !== "all"
                    ? ` (${language === "hi" ? "फ़िल्टर" : "Filtered"}: ${filterType})`
                    : ""}
                </p>
              </div>

              {filterType !== "all" && (
                <button
                  type="button"
                  onClick={() => setFilterType("all")}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {language === "hi" ? "फ़िल्टर हटाएं" : "Reset Filter"}
                </button>
              )}
            </div>

            {filteredLandRecords.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredLandRecords.map((land) => (
                  <div
                    key={land.id}
                    className="p-4 sm:p-6 transition-colors hover:bg-slate-50/70"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <MapPin className="size-4 sm:size-5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <h3 className="font-bold text-foreground text-sm sm:text-base">
                              {land.district}
                            </h3>

                            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-secondary">
                              {land.status}
                            </span>

                            {land.litigation?.hasDispute && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-red-700">
                                <AlertTriangle className="size-3" />
                                {language === "hi"
                                  ? "विवाद लंबित"
                                  : "Case Pending"}
                              </span>
                            )}

                            {land.encumbrance?.hasLoan && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-amber-800">
                                <Landmark className="size-3" />
                                {language === "hi" ? "बैंक बंधक" : "Bank Lien"}
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs sm:text-sm text-muted">
                            {land.anchal} · {land.mauza}
                            {land.ulpin && (
                              <span className="ml-1.5 text-[11px] sm:text-xs text-slate-400 font-mono">
                                ({land.ulpin})
                              </span>
                            )}
                          </p>

                          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                            <span>
                              {language === "hi" ? "खेसरा:" : "Khesra:"}{" "}
                              <strong className="text-foreground">
                                {land.khesra}
                              </strong>
                            </span>
                            <span>
                              {language === "hi" ? "खाता:" : "Khata:"}{" "}
                              <strong className="text-foreground">
                                {land.khata}
                              </strong>
                            </span>
                            <span>
                              {language === "hi" ? "रकबा:" : "Area:"}{" "}
                              <strong className="text-foreground">
                                {land.area}
                              </strong>
                            </span>
                            <span>
                              {language === "hi" ? "प्रकार:" : "Type:"}{" "}
                              <strong className="text-foreground">
                                {land.landType}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* View Details Action Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectLand(land)}
                        className="flex w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white active:scale-[0.98]"
                      >
                        <span>
                          {language === "hi" ? "विवरण देखें" : "View Details"}
                        </span>
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-10 text-center sm:px-6">
                <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search className="size-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">
                  {language === "hi"
                    ? "कोई मेल खाता भूमि पार्सल नहीं मिला"
                    : "No matching land parcel found"}
                </h3>
                <p className="mx-auto mt-1 max-w-xs text-xs text-muted">
                  {language === "hi"
                    ? "कोई प्लॉट मैच नहीं हुआ। सर्च साफ़ करें या फ़िल्टर रीसेट करें।"
                    : "No plot matched your criteria. Clear search or reset filters."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    setFilterType("all");
                  }}
                  className="mt-3.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  {language === "hi" ? "फ़िल्टर हटाएं" : "Clear Filters"}
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions & Compliance */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 shadow-xs">
              <h2 className="text-sm sm:text-base font-bold text-foreground">
                {language === "hi" ? "त्वरित विकल्प" : "Quick Actions"}
              </h2>
              <p className="text-xs text-muted">
                {language === "hi"
                  ? "सीधा फ़िल्टर चयन"
                  : "Direct filtered access"}
              </p>

              <div className="mt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setFilterType("all")}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 sm:p-3 text-left transition-colors ${
                    filterType === "all"
                      ? "border-primary/40 bg-primary/5"
                      : "border-border hover:bg-slate-50"
                  }`}
                >
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Map className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {language === "hi"
                        ? "सभी भूमि पार्सल"
                        : "All Land Parcels"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {language === "hi"
                        ? "सभी जुड़े प्लॉट देखें"
                        : "Show all connected plots"}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterType("cases")}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 sm:p-3 text-left transition-colors ${
                    filterType === "cases"
                      ? "border-red-400 bg-red-50"
                      : "border-border hover:bg-slate-50"
                  }`}
                >
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <Gavel className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {language === "hi"
                        ? "विवादित प्लॉट"
                        : "Litigation Alerts"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {language === "hi"
                        ? "लंबित मामले फ़िल्टर करें"
                        : "Filter pending disputes"}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterType("loans")}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 sm:p-3 text-left transition-colors ${
                    filterType === "loans"
                      ? "border-amber-400 bg-amber-50"
                      : "border-border hover:bg-slate-50"
                  }`}
                >
                  <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Landmark className="size-4 sm:size-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {language === "hi"
                        ? "बैंक बंधक (Lien)"
                        : "Bank Mortgages"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {language === "hi"
                        ? "CERSAI वित्तीय भार देखें"
                        : "Filter CERSAI lien records"}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4 sm:p-5">
              <div className="flex gap-2.5 sm:gap-3">
                <ShieldCheck className="mt-0.5 size-4 sm:size-5 shrink-0 text-secondary" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground">
                    DILRMP & Bhu-Aadhaar Aligned
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-xs leading-4 sm:leading-5 text-muted">
                    {language === "hi"
                      ? "यह प्लेटफ़ॉर्म एकीकृत नागरिक खोज के लिए राष्ट्रीय भूमि अभिलेख आधुनिकीकरण कार्यक्रम डेटा स्कीमा मानकों के अनुरूप है।"
                      : "This platform conforms to National Land Records Modernisation data schema standards for unified citizen discovery."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted">
          <WalletCards className="size-4" />
          <span>
            {language === "hi"
              ? "यहाँ दिखाए गए भूमि अभिलेख सत्यापित नागरिक पहचान लिंकेज पर आधारित हैं।"
              : "Land records shown here are consolidated based on verified identity linkage."}
          </span>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
