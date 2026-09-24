// src/components/common/LanguageButton.jsx
import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageButton() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition hover:bg-slate-50 hover:text-primary active:scale-95"
      title={language === "en" ? "Switch to हिन्दी" : "Switch to English"}
    >
      <Languages className="size-3.5 text-primary" />
      <span>{t("langToggle")}</span>
    </button>
  );
}