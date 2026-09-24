// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Common / Header
    langToggle: "हिन्दी",
    cancel: "Cancel",
    logout: "Log Out",
    backToMyLand: "Back to My Land",
    backToHome: "Back to LandStack Home",
    locatePlot: "Locate Plot",
    fullMap: "Full Map",
    exitFullscreen: "Exit Fullscreen",
    printSavePdf: "Print / Save PDF",
    closeViewer: "Close Viewer",
    officialRecordViewer: "Official Record Viewer",

    // Auth / Login
    secureLogin: "Secure Citizen Login",
    verifyIdentity: "Verify Your Identity",
    loginSubtitleId: "Enter your verified government identity number to access your unified land dashboard.",
    loginSubtitleOtp: "Enter the 6-digit one-time password sent to your registered mobile number.",
    govtIdLabel: "Government Identity Number",
    idPlaceholder: "Enter 12-digit Number",
    getOtp: "Get OTP",
    otpSentTo: "OTP sent to registered identity",
    enterOtpLabel: "Enter 6-digit OTP",
    verifyAccess: "Verify & Access Records",
    changeNumber: "Change Number",
    autoFillDemo: "Auto-Fill Demo OTP",
    complianceNote: "DILRMP & Bhu-Aadhaar compliance: Encrypted session, zero credential leak guarantee.",

    // Dashboard
    dashboardTitle: "Unified Citizen Land Portal",
    dashboardSubtitle: "All registered land parcels, survey records, and financial lien statuses across Bihar.",
    totalParcels: "Total Land Parcels",
    totalArea: "Total Land Holdings",
    clearTitle: "Clear Title Parcels",
    encumberedTitle: "Encumbered / Mortgaged",
    disputedTitle: "Active Legal Disputes",
    viewDetails: "View Details",
    searchPlaceholder: "Search by District, Anchal, Mauza, or Khata...",

    // Land Profile
    landProfile: "Land Profile",
    recordAvailable: "Record Available",
    landLocation: "Land Location",
    adminLocation: "Administrative location of this parcel",
    district: "District",
    anchal: "Anchal (Circle)",
    mauza: "Mauza (Village)",
    khesra: "Khesra / Plot",
    ownershipDetails: "Ownership Details",
    verifiedOwnership: "Available verified ownership information",
    owner: "Owner",
    khataNo: "Khata Number",
    jamabandiNo: "Jamabandi Number",
    areaRakba: "Total Area (Rakba)",
    cersaiTitle: "Bank Loan & Mortgage (CERSAI)",
    cersaiDesc: "Encumbrance status and bank lien records",
    activeLoanTitle: "Active Loan Lien Registered",
    noLienFound: "No Active Bank Lien Found (Nil)",
    disputeTitle: "Case / Dispute Status",
    disputeDesc: "Connected proceedings in e-Courts & State Revenue Courts",
    activeDisputeTitle: "Active Legal Proceeding",
    noDisputeFound: "No active case in connected records",
    officialRecords: "Official Records",
    clickToView: "Click to view printable government record",

    // Exit Modal
    exitTitle: "Exit LandStack Session?",
    exitDesc: "Going back will end your active session and log you out. Are you sure you want to leave the dashboard?",
    stayOnDashboard: "Stay on Dashboard",
    yesLogOut: "Yes, Log Out",
  },

  hi: {
    // Common / Header
    langToggle: "English",
    cancel: "रद्द करें",
    logout: "लॉग आउट",
    backToMyLand: "वापस डैशबोर्ड पर जाएं",
    backToHome: "लैंडस्टैक होम पर वापस जाएं",
    locatePlot: "प्लॉट खोजें",
    fullMap: "बड़ा नक्शा",
    exitFullscreen: "फुलस्क्रीन बंद करें",
    printSavePdf: "प्रिंट / PDF सेव करें",
    closeViewer: "बंद करें",
    officialRecordViewer: "आधिकारिक सरकारी दस्तावेज",

    // Auth / Login
    secureLogin: "सुरक्षित नागरिक लॉगिन",
    verifyIdentity: "अपनी पहचान सत्यापित करें",
    loginSubtitleId: "अपने एकीकृत भूमि डैशबोर्ड तक पहुंचने के लिए पहचान संख्या दर्ज करें।",
    loginSubtitleOtp: "सत्यापन के लिए आपके पंजीकृत मोबाइल पर भेजा गया 6-अंकों का OTP दर्ज करें।",
    govtIdLabel: "सरकारी पहचान संख्या",
    idPlaceholder: "12-अंकों का नंबर दर्ज करें",
    getOtp: "OTP प्राप्त करें",
    otpSentTo: "पंजीकृत पहचान पर भेजा गया OTP",
    enterOtpLabel: "6-अंकों का OTP दर्ज करें",
    verifyAccess: "सत्यापित करें और रिकॉर्ड देखें",
    changeNumber: "नंबर बदलें",
    autoFillDemo: "डेमो OTP ऑटो-फिल करें",
    complianceNote: "DILRMP एवं भू-आधार अनुपालन: सुरक्षित सत्र, शून्य डेटा लीक गारंटी।",

    // Dashboard
    dashboardTitle: "एकीकृत नागरिक भूमि पोर्टल",
    dashboardSubtitle: "बिहार के सभी जिलों में पंजीकृत भूमि पार्सल, सर्वेक्षण रिकॉर्ड और बैंक बंधक स्थिति।",
    totalParcels: "कुल भूमि पार्सल",
    totalArea: "कुल भूमि रकबा",
    clearTitle: "विवाद रहित पार्सल",
    encumberedTitle: "बैंक बंधक (Lien)",
    disputedTitle: "सक्रिय कानूनी विवाद",
    viewDetails: "विवरण देखें",
    searchPlaceholder: "जिला, अंचल, मौजा या खाता द्वारा खोजें...",

    // Land Profile
    landProfile: "भूमि विवरण (प्रोफ़ाइल)",
    recordAvailable: "रिकॉर्ड उपलब्ध",
    landLocation: "भूमि का स्थान",
    adminLocation: "इस भूमि पार्सल का प्रशासनिक पता",
    district: "जिला",
    anchal: "अंचल (सर्किल)",
    mauza: "मौजा (गाँव)",
    khesra: "खेसरा / प्लॉट संख्या",
    ownershipDetails: "स्वामित्व का विवरण",
    verifiedOwnership: "सत्यापित रैयत/मालिक की जानकारी",
    owner: "रैयत (मालिक)",
    khataNo: "खाता संख्या",
    jamabandiNo: "जमाबंदी संख्या",
    areaRakba: "कुल रकबा (क्षेत्रफल)",
    cersaiTitle: "बैंक ऋण एवं बंधक स्थिति (CERSAI)",
    cersaiDesc: "वित्तीय भार और बैंक ग्रहणाधिकार रिकॉर्ड",
    activeLoanTitle: "सक्रिय बैंक ऋण पंजीकृत",
    noLienFound: "कोई बैंक बंधक नहीं मिला (शून्य भार)",
    disputeTitle: "मुकदमा / विवाद स्थिति (e-Courts)",
    disputeDesc: "ई-कोर्ट एवं राजस्व न्यायालयों में जुड़े मामले",
    activeDisputeTitle: "सक्रिय कानूनी मामला",
    noDisputeFound: "जुड़े डिजिटल रिकॉर्ड में कोई विवाद नहीं मिला",
    officialRecords: "आधिकारिक सरकारी रिकॉर्ड",
    clickToView: "प्रिंट योग्य सरकारी प्रतिलिपि देखने के लिए क्लिक करें",

    // Exit Modal
    exitTitle: "लैंडस्टैक सत्र समाप्त करें?",
    exitDesc: "पीछे जाने से आपका सत्र समाप्त हो जाएगा और आप लॉग आउट हो जाएंगे। क्या आप बाहर निकलना चाहते हैं?",
    stayOnDashboard: "डैशबोर्ड पर रहें",
    yesLogOut: "हाँ, लॉग आउट करें",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("landstack_lang") || "en";
  });

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "hi" : "en";
    setLanguage(nextLang);
    localStorage.setItem("landstack_lang", nextLang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}