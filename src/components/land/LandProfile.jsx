import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Gavel,
  Map,
  MapPin,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import LandMap from "./LandMap";
import { users } from "../../data/landData";

function LandProfile({ land, onBack }) {
  const [isFullMapOpen, setIsFullMapOpen] = useState(false);
  const [focusParcel, setFocusParcel] = useState(0);

  // Selected document for preview modal
  const [selectedDocument, setSelectedDocument] = useState(null);

  const landData = land || {
    district: "Patna",
    anchal: "Danapur",
    mauza: "Mauza Example",
    khesra: "1254",
    khata: "342",
    jamabandi: "JMB-2026-001254",
    area: "2.50 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",
    owner: "Verified Land Owner",
    mutationStatus: "Updated",
    registrationStatus: "Registered",
    caseStatus: "No available case record",
  };

  // Find owner from the logged-in user's land record
  const owner = users.find((user) => user.userId === landData.userId);

  const handleLocateParcel = () => {
    setFocusParcel((current) => current + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
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

          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound className="size-5" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to My Land
        </button>

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-secondary">Land Profile</p>

          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {landData.district} Land Parcel
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
                <MapPin className="size-4" />
                {landData.anchal}, {landData.mauza}
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary">
              <CheckCircle2 className="size-4" />
              Record Available
            </span>
          </div>
        </div>

        {/* Location Card */}
        <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>

            <div>
              <h2 className="font-bold text-foreground">Land Location</h2>

              <p className="text-sm text-muted">
                Administrative location of this parcel
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="District" value={landData.district} />
            <InfoItem label="Anchal" value={landData.anchal} />
            <InfoItem label="Mauza" value={landData.mauza} />
            <InfoItem label="Khesra / Plot" value={landData.khesra} />
          </div>
        </section>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div className="space-y-6">
            {/* Ownership */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={UserRound}
                title="Ownership Details"
                description="Available ownership information"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoItem
                  label="Owner"
                  value={
                    owner?.name ||
                    landData.owner ||
                    "Owner information unavailable"
                  }
                />

                <InfoItem label="Khata Number" value={landData.khata} />

                <InfoItem label="Jamabandi" value={landData.jamabandi} />

                <InfoItem label="Area / Rakba" value={landData.area} />
              </div>
            </section>

            {/* Land Characteristics */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={Map}
                title="Land Characteristics"
                description="Classification and current land use"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoItem label="Land Type" value={landData.landType} />

                <InfoItem label="Land Use" value={landData.landUse} />

                <InfoItem label="Area" value={landData.area} />

                <InfoItem label="Plot / Khesra" value={landData.khesra} />
              </div>
            </section>

            {/* Status */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={FileText}
                title="Record Status"
                description="Available land record and transaction status"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <StatusItem label="Mutation" value={landData.mutationStatus} />

                <StatusItem
                  label="Registration"
                  value={landData.registrationStatus}
                />
              </div>
            </section>

            {/* Case Status */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
              <SectionHeader
                icon={Gavel}
                title="Case / Dispute Status"
                description="Available connected case or proceeding records"
              />

              <div className="mt-5 rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {landData.caseStatus}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted">
                      This indicates the status available in connected records.
                      It does not independently guarantee that no dispute
                      exists.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Map */}
            <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Map className="size-5" />
                  </div>

                  <div>
                    <h2 className="font-bold text-foreground">Parcel Map</h2>

                    <p className="text-sm text-muted">GIS location</p>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <LandMap land={landData} focusParcel={focusParcel} />

              {/* Map Actions */}
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleLocateParcel}
                  className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  <MapPin className="size-4" />
                  Locate on Map
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullMapOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <Map className="size-4" />
                  Open Full Map
                </button>
              </div>
            </section>

            {/* Documents */}
            <section className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="font-bold text-foreground">Documents</h2>

              <p className="mt-1 text-sm text-muted">Available land records</p>

              <div className="mt-4 space-y-3">
                <DocumentItem
                  title="Jamabandi Record"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Jamabandi Record",
                      number: landData.jamabandi,
                      description:
                        "Land holding and revenue record associated with this parcel.",
                    })
                  }
                />

                <DocumentItem
                  title="Record of Rights"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Record of Rights",
                      number: `ROR-${landData.khesra}`,
                      description:
                        "Demo record showing available rights and ownership information.",
                    })
                  }
                />

                <DocumentItem
                  title="Registration Record"
                  onClick={() =>
                    setSelectedDocument({
                      title: "Registration Record",
                      number: `REG-${landData.khesra}`,
                      description:
                        "Demo registration information associated with this land parcel.",
                    })
                  }
                />
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted">
          <ShieldCheck className="size-4" />
          Information shown is based on available connected records.
        </div>
      </main>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </div>

                <div>
                  <h2 className="font-bold text-foreground">
                    {selectedDocument.title}
                  </h2>

                  <p className="text-xs text-muted">Document Preview</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-primary"
                aria-label="Close document preview"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Document Body */}
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="rounded-xl border border-border bg-background p-5">
                {/* Document Title */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      LandStack
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-primary">
                      {selectedDocument.title}
                    </h3>
                  </div>

                  <ShieldCheck className="size-8 text-secondary" />
                </div>

                {/* Document Information */}
                <div className="mt-5 space-y-4">
                  <InfoItem
                    label="Document Number"
                    value={selectedDocument.number}
                  />

                  <InfoItem label="District" value={landData.district} />

                  <InfoItem label="Anchal" value={landData.anchal} />

                  <InfoItem label="Mauza" value={landData.mauza} />

                  <InfoItem label="Khesra / Plot" value={landData.khesra} />

                  <InfoItem label="Khata Number" value={landData.khata} />

                  <InfoItem label="Jamabandi" value={landData.jamabandi} />

                  <InfoItem label="Area / Rakba" value={landData.area} />
                </div>

                {/* Demo Notice */}
                <div className="mt-5 rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                  <p className="text-xs font-semibold text-secondary">
                    Demo Document
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    {selectedDocument.description}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    This is a prototype document for the LandStack
                    demonstration. It is not an official government document.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-border bg-background p-4">
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-background"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Map Overlay */}
      {isFullMapOpen && (
        <div className="fixed inset-0 z-[1000] bg-white">
          {/* Full Map Header */}
          <div className="flex h-16 items-center justify-between border-b border-border bg-white px-5 sm:px-6">
            <div>
              <p className="text-sm font-medium text-secondary">
                GIS Parcel Map
              </p>

              <h2 className="font-bold text-primary">
                {landData.district} — Khesra {landData.khesra}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsFullMapOpen(false)}
              className="flex size-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:bg-background hover:text-primary"
              aria-label="Close full map"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Full Map */}
          <div className="h-[calc(100vh-4rem)]">
            <LandMap land={landData} fullScreen focusParcel={focusParcel} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="font-bold text-foreground">{title}</h2>

        <p className="text-sm text-muted">{description}</p>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-xs font-medium text-muted">{label}</p>

      <p className="mt-1.5 text-sm font-semibold text-foreground">
        {value || "Not available"}
      </p>
    </div>
  );
}

function StatusItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
      <div>
        <p className="text-xs font-medium text-muted">{label}</p>

        <p className="mt-1 text-sm font-semibold text-foreground">
          {value || "Not available"}
        </p>
      </div>

      <CheckCircle2 className="size-5 text-secondary" />
    </div>
  );
}

function DocumentItem({ title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-border p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-4" />
        </div>

        <div>
          <span className="text-sm font-medium text-foreground">{title}</span>

          <p className="mt-0.5 text-xs text-muted">View demo document</p>
        </div>
      </div>

      <ArrowRight className="size-4 text-muted" />
    </button>
  );
}

export default LandProfile;
