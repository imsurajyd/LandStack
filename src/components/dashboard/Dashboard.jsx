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
  LogOut,
  Search,
  X,
} from "lucide-react";

import { users, landRecords } from "../../data/landData";

function Dashboard({ userId, onLogout, onViewLand }) {
  const [searchQuery, setSearchQuery] = useState("");

  // =====================================================
  // CURRENT LOGGED-IN USER
  // userId App.jsx se LoginPage ke through aa raha hai.
  // =====================================================

  const currentUserId = userId;

  // Get current user from USERS data
  const currentUser = users.find((user) => user.userId === currentUserId);

  // =====================================================
  // CURRENT USER KE LAND RECORDS
  // =====================================================

  const userLandRecords = landRecords.filter(
    (land) => land.userId === currentUserId,
  );

  // =====================================================
  // SEARCH CURRENT USER'S LAND
  // =====================================================

  const filteredLandRecords = userLandRecords.filter((land) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

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
    ].some((value) => String(value).toLowerCase().includes(query));
  });

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const totalArea = userLandRecords.reduce((total, land) => {
    const area = parseFloat(land.area);

    return total + (Number.isNaN(area) ? 0 : area);
  }, 0);

  const totalDistricts = new Set(userLandRecords.map((land) => land.district))
    .size;

  const activeCases = userLandRecords.filter(
    (land) =>
      land.caseStatus &&
      !land.caseStatus.toLowerCase().includes("no available"),
  ).length;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <ShieldCheck className="size-5 text-white" />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-primary">
                Land<span className="text-secondary">Stack</span>
              </div>

              <div className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:block">
                Digital Land Governance
              </div>
            </div>
          </div>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">
                {currentUser?.name || "Land Owner"}
              </p>

              <p className="text-xs text-muted">
                {currentUser?.identityStatus || "Verified User"}
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="hidden items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary/30 hover:text-primary sm:flex"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm font-medium text-secondary">Land Overview</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome, {currentUser?.name || "Land Owner"}
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            यहाँ आपके available land records अलग-अलग districts से एक ही जगह पर
            दिखाई देंगे।
          </p>
        </div>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Land */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Land</p>

                <p className="mt-2 text-2xl font-bold text-foreground">
                  {totalArea.toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-muted">Acre</p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Map className="size-5" />
              </div>
            </div>
          </div>

          {/* Parcels */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Parcels</p>

                <p className="mt-2 text-2xl font-bold text-foreground">
                  {userLandRecords.length}
                </p>

                <p className="mt-1 text-xs text-muted">Land parcels</p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="size-5" />
              </div>
            </div>
          </div>

          {/* Districts */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Districts</p>

                <p className="mt-2 text-2xl font-bold text-foreground">
                  {totalDistricts}
                </p>

                <p className="mt-1 text-xs text-muted">Across Bihar</p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Map className="size-5" />
              </div>
            </div>
          </div>

          {/* Cases */}
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Active Cases</p>

                <p className="mt-2 text-2xl font-bold text-foreground">
                  {activeCases}
                </p>

                <p className="mt-1 text-xs text-muted">Available records</p>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Gavel className="size-5" />
              </div>
            </div>
          </div>
        </section>

        {/* Parcel Search */}
        <section className="mt-8 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="size-5" />
            </div>

            <div>
              <h2 className="font-bold text-foreground">Search Land Parcel</h2>

              <p className="mt-1 text-sm text-muted">
                Search by district, anchal, mauza, khesra, khata or jamabandi
                number.
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search Khesra, District, Anchal, Khata..."
              className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>Try:</span>

            <button
              type="button"
              onClick={() => setSearchQuery("1254")}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              Khesra 1254
            </button>

            <button
              type="button"
              onClick={() => setSearchQuery("Patna")}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              Patna
            </button>

            <button
              type="button"
              onClick={() => setSearchQuery("Begusarai")}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              Begusarai
            </button>

            <button
              type="button"
              onClick={() => setSearchQuery("JMB-2026-000316")}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              Jamabandi
            </button>
          </div>
        </section>

        {/* Main Grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* My Land */}
          <div className="rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-foreground">My Land</h2>

                <p className="mt-1 text-sm text-muted">
                  {searchQuery
                    ? `${filteredLandRecords.length} matching parcel${
                        filteredLandRecords.length === 1 ? "" : "s"
                      } found`
                    : "Your land records across districts"}
                </p>
              </div>

              <button
                type="button"
                className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
              >
                View All
                <ArrowRight className="size-4" />
              </button>
            </div>

            {/* Search Results */}
            {filteredLandRecords.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredLandRecords.map((land) => (
                  <div
                    key={land.id}
                    className="p-5 transition-colors hover:bg-background sm:p-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <MapPin className="size-5" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {land.district}
                            </h3>

                            <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-medium text-secondary">
                              {land.status}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-muted">
                            {land.anchal} · {land.mauza}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                            <span>
                              Khesra:{" "}
                              <strong className="text-foreground">
                                {land.khesra}
                              </strong>
                            </span>

                            <span>
                              Area:{" "}
                              <strong className="text-foreground">
                                {land.area}
                              </strong>
                            </span>

                            <span>
                              Type:{" "}
                              <strong className="text-foreground">
                                {land.type}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onViewLand(land)}
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        View Details
                        <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center sm:px-6">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search className="size-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  No land parcel found
                </h3>

                <p className="mx-auto mt-1 max-w-md text-sm text-muted">
                  Try searching with a different district, khesra, khata or
                  jamabandi number.
                </p>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-foreground">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-muted">
                Access important land services
              </p>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Map className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      View Land Map
                    </p>

                    <p className="text-xs text-muted">Explore your parcels</p>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FileText className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Documents
                    </p>

                    <p className="text-xs text-muted">View available records</p>
                  </div>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Gavel className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Case Status
                    </p>

                    <p className="text-xs text-muted">
                      Check available proceedings
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Verification Card */}
            <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-secondary" />

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Identity Verified
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Your dashboard access is protected through identity
                    verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile View All */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-semibold text-primary sm:hidden"
        >
          View All Land
          <ArrowRight className="size-4" />
        </button>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted">
          <WalletCards className="size-4" />
          Land records shown here are based on available connected government
          records.
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
