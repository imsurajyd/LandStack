// src/components/land/DocumentModal.jsx
import { useEffect } from "react";
import { FileText, Printer, Download, X } from "lucide-react";

export default function DocumentModal({ docData, land, ownerName, onClose }) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.document?.body) return;

    const originalOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!docData) return null;

  const currentLand = land || {};

  // Clean Isolated Print Trigger
  const handlePrint = () => {
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "0";
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${docData.title || "Land Record Transcript"}</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm;
            }
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            body {
              font-family: "Times New Roman", Times, serif;
              color: #0f172a;
              background: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .certificate-container {
              border: 3px double #0f172a;
              padding: 24px 28px;
              width: 100%;
              min-height: 255mm;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin: 0 auto;
              position: relative;
              background: #ffffff;
            }
            .inner-border {
              border: 1px solid #94a3b8;
              padding: 24px 22px;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .text-center { text-align: center; }
            .header-emblem {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.28em;
              color: #334155;
            }
            .main-heading {
              font-size: 22px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              margin: 8px 0 6px;
              color: #0f172a;
            }
            .sub-heading {
              font-size: 11.5px;
              font-family: "Courier New", Courier, monospace;
              color: #475569;
              font-weight: 600;
            }
            .header-line {
              border-bottom: 2px solid #0f172a;
              margin-top: 14px;
              margin-bottom: 18px;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              background: #f8fafc;
              border: 1.5px solid #cbd5e1;
              padding: 12px 16px;
              margin-bottom: 20px;
              font-family: Arial, sans-serif;
            }
            .meta-item span {
              display: block;
              font-size: 10.5px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              font-weight: 700;
            }
            .meta-item p {
              font-size: 14px;
              font-family: "Courier New", Courier, monospace;
              font-weight: 700;
              color: #0f172a;
              margin-top: 4px;
            }
            .table-title {
              font-family: Arial, sans-serif;
              font-size: 12px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #0f172a;
              border-bottom: 2px solid #0f172a;
              padding-bottom: 6px;
              margin-bottom: 10px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-family: Arial, sans-serif;
              font-size: 12.5px;
            }
            tr {
              border-bottom: 1px solid #cbd5e1;
            }
            td {
              padding: 11px 14px;
              vertical-align: middle;
            }
            .label-col {
              background: #f1f5f9;
              font-weight: 700;
              color: #334155;
              width: 38%;
              border-right: 1.5px solid #cbd5e1;
            }
            .val-col {
              color: #0f172a;
              font-weight: 500;
            }
            .seal-container {
              margin-top: 24px;
              padding-top: 16px;
              border-top: 2px dashed #94a3b8;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              font-family: Arial, sans-serif;
            }
            .seal-left p {
              font-size: 12px;
              font-weight: 800;
              text-transform: uppercase;
              color: #0f172a;
            }
            .seal-left span {
              font-size: 9.5px;
              color: #64748b;
              display: block;
              margin-top: 2px;
            }
            .seal-right {
              text-align: right;
            }
            .seal-right p {
              font-family: "Courier New", Courier, monospace;
              font-size: 11px;
              font-weight: 800;
              color: #0f172a;
            }
            .seal-right span {
              font-size: 9.5px;
              color: #64748b;
              display: block;
              margin-top: 2px;
            }
            .disclaimer-box {
              margin-top: 18px;
              padding-top: 10px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              font-family: Arial, sans-serif;
              font-size: 9px;
              color: #64748b;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="inner-border">
              <div>
                <div class="text-center">
                  <p class="header-emblem">Government of Bihar • Revenue Administration</p>
                  <h1 class="main-heading">${docData.title}</h1>
                  <p class="sub-heading">${docData.docType} • Issue Date: ${docData.issueDate}</p>
                </div>

                <div class="header-line"></div>

                <div class="meta-grid">
                  <div class="meta-item">
                    <span>Record Reference Token</span>
                    <p>${docData.number}</p>
                  </div>
                  <div class="meta-item">
                    <span>Bhu-Aadhaar (ULPIN)</span>
                    <p>${currentLand.ulpin || "N/A"}</p>
                  </div>
                </div>

                <div class="table-title">Schedule of Land Parcel (Khatian Details)</div>

                <table>
                  <tbody>
                    <tr>
                      <td class="label-col">District / Zila</td>
                      <td class="val-col"><strong>${currentLand.district || "N/A"}</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">Anchal (Revenue Circle)</td>
                      <td class="val-col">${currentLand.anchal || "N/A"}</td>
                    </tr>
                    <tr>
                      <td class="label-col">Mauza (Village)</td>
                      <td class="val-col">${currentLand.mauza || "N/A"}</td>
                    </tr>
                    <tr>
                      <td class="label-col">Khata / Khesra (Plot)</td>
                      <td class="val-col">Khata: <strong>${currentLand.khata || "N/A"}</strong> | Plot: <strong>${currentLand.khesra || "N/A"}</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">Total Area (Rakba)</td>
                      <td class="val-col"><strong>${currentLand.area || "N/A"}</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">Recorded Raiyat (Owner)</td>
                      <td class="val-col"><strong>${ownerName || "Verified Raiyat"}</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">CERSAI Encumbrance / Lien</td>
                      <td class="val-col">
                        ${
                          currentLand.encumbrance?.hasLoan
                            ? `<strong>Lien Registered: ${currentLand.encumbrance.bankName} (${currentLand.encumbrance.amount})</strong>`
                            : `<span style="color:#065f46; font-weight:800;">Free of Encumbrance (Nil)</span>`
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div class="seal-container">
                  <div class="seal-left">
                    <p>Digitally Authenticated Certificate</p>
                    <span>Issued via LandStack Centralized Gateway</span>
                  </div>
                  <div class="seal-right">
                    <p>SHA256-VERIFIED</p>
                    <span>${docData.issueDate} • Valid Government Transcript</span>
                  </div>
                </div>

                <div class="disclaimer-box">
                  This electronic transcript is generated for prototype evaluation under LandStack Digital Land Governance. 
                  Data synchronized with state revenue registers and central credit security databases.
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(printFrame);
      }, 1000);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-start overflow-y-auto bg-black/70 p-3 pt-12 sm:pt-16 pb-8 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />

      {/* Screen Modal Viewer */}
      <div className="relative z-10 flex h-[108dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Pinned Top Bar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              Official Record Viewer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100 active:scale-95"
            >
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
              <span className="sm:hidden">Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-200 active:scale-95"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Screen Slip */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-100 p-3 sm:p-6 overscroll-contain">
          <div className="mx-auto w-full max-w-xl border-2 border-slate-900 bg-white p-5 sm:p-7 font-serif shadow-xs">
            <div className="border-b-2 border-slate-900 pb-3 text-center">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
                Government of Bihar • Revenue Administration
              </p>
              <h3 className="mt-1 text-sm sm:text-lg font-bold uppercase tracking-wide text-slate-900">
                {docData.title}
              </h3>
              <p className="mt-0.5 font-mono text-[9px] sm:text-[10px] text-slate-600">
                {docData.docType} • Issue Date: {docData.issueDate}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border border-slate-300 bg-slate-50 p-2.5 text-xs font-sans">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Record Reference</span>
                <p className="font-mono text-xs font-bold text-slate-900 break-all mt-0.5">
                  {docData.number}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Bhu-Aadhaar (ULPIN)</span>
                <p className="font-mono text-xs font-bold text-slate-900 break-all mt-0.5">
                  {currentLand.ulpin || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="border-b border-slate-400 pb-1 font-sans text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Schedule of Land Parcel (Khatian Details)
              </h4>
              <table className="mt-2 w-full table-fixed border-collapse border border-slate-400 font-sans text-[11px]">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="w-2/5 bg-slate-100 p-2 font-medium text-slate-700">
                      District / Zila
                    </td>
                    <td className="w-3/5 p-2 font-bold text-slate-900 break-words">
                      {currentLand.district || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      Anchal (Circle)
                    </td>
                    <td className="p-2 text-slate-900 break-words">
                      {currentLand.anchal || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      Mauza (Village)
                    </td>
                    <td className="p-2 text-slate-900 break-words">
                      {currentLand.mauza || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      Khata / Khesra
                    </td>
                    <td className="p-2 font-mono text-slate-900 break-words">
                      Khata: {currentLand.khata || "N/A"} | Plot: {currentLand.khesra || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      Total Area
                    </td>
                    <td className="p-2 font-bold text-slate-900">
                      {currentLand.area || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      Recorded Raiyat
                    </td>
                    <td className="p-2 font-bold text-slate-900 break-words">
                      {ownerName || "Verified Raiyat"}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-slate-100 p-2 font-medium text-slate-700">
                      CERSAI Lien Status
                    </td>
                    <td className="p-2 text-slate-900 break-words">
                      {currentLand.encumbrance?.hasLoan ? (
                        <span className="font-bold text-amber-800">
                          Lien Registered: {currentLand.encumbrance.bankName} ({currentLand.encumbrance.amount})
                        </span>
                      ) : (
                        <span className="font-bold text-emerald-800">
                          Free of Encumbrance (Nil)
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between border-t-2 border-slate-400 pt-2.5 font-sans">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-900">
                  Digitally Authenticated
                </p>
                <p className="text-[8px] sm:text-[9px] text-slate-600">
                  LandStack Centralized Gateway
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] sm:text-[9px] text-slate-600">
                  SHA256-VERIFIED
                </p>
                <p className="text-[8px] sm:text-[9px] text-slate-500">
                  {docData.issueDate}
                </p>
              </div>
            </div>

            <p className="mt-3.5 border-t border-dotted border-slate-300 pt-1.5 text-center font-sans text-[8px] text-slate-400">
              Electronic transcript generated for prototype evaluation under LandStack Digital Governance.
            </p>
          </div>
        </div>

        {/* Pinned Bottom Action Bar */}
        <div className="flex h-14 shrink-0 items-center justify-end gap-2.5 border-t border-slate-200 bg-white px-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100"
          >
            Close Viewer
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary-dark active:scale-[0.98]"
          >
            <Download className="size-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}