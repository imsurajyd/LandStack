// src/components/landing/Features.jsx
import {
  Database,
  Map,
  ShieldCheck,
  FileSearch,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function Features() {
  const { language } = useLanguage();

  const features = [
    {
      icon: Database,
      title: language === "hi" ? "एकीकृत भूमि अभिलेख" : "Unified Land Records",
      description:
        language === "hi"
          ? "अलग-अलग विभागों में उपलब्ध अपनी सभी ज़मीनी जानकारियों को एक एकीकृत दृश्य में देखें।"
          : "Access all your consolidated land records across multiple districts in a single unified dashboard.",
    },
    {
      icon: Map,
      title: language === "hi" ? "नक्शे पर भूमि सीमांकन" : "Land on Cadastral Map",
      description:
        language === "hi"
          ? "अपने भूमि पार्सल और उपलब्ध प्रशासनिक सीमाओं को डिजिटल कैडस्ट्रल मैप पर देखें।"
          : "Explore your parcel boundaries, survey plots, and spatial demarcations on an interactive map.",
    },
    {
      icon: ShieldCheck,
      title: language === "hi" ? "स्वामित्व एवं वित्तीय भार" : "Ownership & Lien Details",
      description:
        language === "hi"
          ? "सत्यापित रैयत जानकारी, खाता संख्या, और CERSAI बैंक बंधक स्थिति एक ही जगह आसानी से जांचें।"
          : "Review verified Raiyat ownership, Khata-Khesra logs, and active CERSAI bank mortgage statuses.",
    },
    {
      icon: FileSearch,
      title: language === "hi" ? "मुकदमा एवं कानूनी स्थिति" : "Litigation & Court Status",
      description:
        language === "hi"
          ? "डिजिटल ई-कोर्ट एवं राजस्व न्यायालयों से जुड़े मामलों और कार्यवाहियों की अद्यतन स्थिति देखें।"
          : "Track connected revenue proceedings, e-Court hearings, and legal dispute disclaimers in real time.",
    },
  ];

  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            {language === "hi" ? "एकल डिजिटल मंच" : "One Platform"}
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {language === "hi" ? (
              <>
                आपकी जमीन का हर विवरण,
                <span className="block text-primary">एक ही जगह पर।</span>
              </>
            ) : (
              <>
                Everything about your land,
                <span className="block text-primary">in one place.</span>
              </>
            )}
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            {language === "hi"
              ? "LandStack का उद्देश्य भूमि अभिलेखों को सरल, पारदर्शी और आसानी से समझने योग्य डिजिटल अनुभव में बदलना है।"
              : "LandStack delivers a unified, citizen-centric land intelligence experience that simplifies verification and transparent ownership."}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50"
              >
                {/* Icon */}
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="size-5" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted">
                  {feature.description}
                </p>

                {/* Small Action */}
                <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <span>{language === "hi" ? "विवरण देखें" : "Explore"}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;