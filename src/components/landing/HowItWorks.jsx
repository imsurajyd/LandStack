// src/components/landing/HowItWorks.jsx
import {
  ArrowRight,
  CheckCircle2,
  Search,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function HowItWorks() {
  const { language } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: UserRoundCheck,
      title: language === "hi" ? "सत्यापित करें" : "Verify",
      description:
        language === "hi"
          ? "सुरक्षित नागरिक पहचान सत्यापन के बाद सीधे अपने एकीकृत डैशबोर्ड तक पहुँचें।"
          : "Access your centralized land dashboard after instant, secure citizen verification.",
    },
    {
      number: "02",
      icon: Search,
      title: language === "hi" ? "अभिलेख देखें" : "View",
      description:
        language === "hi"
          ? "एक ही स्थान पर सभी जिलों में फैली अपनी भूमि, रकबा और स्वामित्व विवरण देखें।"
          : "View all your registered land holdings, acreages, and clear title statuses in one place.",
    },
    {
      number: "03",
      icon: CheckCircle2,
      title: language === "hi" ? "सीमांकन व स्थिति" : "Explore",
      description:
        language === "hi"
          ? "कैडस्ट्रल नक्शा, CERSAI बैंक बंधक और ई-कोर्ट विवादों की लाइव स्थिति जांचें।"
          : "Demarcate boundaries on GIS maps, review active bank liens, and print certified records.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            {language === "hi" ? "सरल कार्यप्रणाली" : "Simple Process"}
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {language === "hi" ? "लैंडस्टैक कैसे कार्य करता है" : "How LandStack works"}
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            {language === "hi"
              ? "केवल तीन आसान चरणों में अपनी सभी जमीनी जानकारियों तक पहुँचें।"
              : "Access and verify your statewide land portfolio in three simple steps."}
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Connecting Line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-14 hidden h-px bg-border lg:block" />

          <div className="grid gap-10 lg:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative text-center">
                  {/* Number + Icon */}
                  <div className="relative mx-auto flex size-28 items-center justify-center rounded-full border border-border bg-white shadow-sm">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-7" strokeWidth={1.8} />
                    </div>

                    <span className="absolute -right-1 -top-1 flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="mt-6 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted">
                    {step.description}
                  </p>

                  {/* Arrow */}
                  {step.number !== "03" && (
                    <ArrowRight className="mx-auto mt-6 hidden size-5 text-border lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              {language === "hi"
                ? "सुरक्षित एवं नागरिक-केंद्रित पहुँच"
                : "Secure and user-focused access"}
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted">
              {language === "hi"
                ? "नागरिकों को केवल उनके अधिकृत और डिजिटल राजस्व अभिलेखों तक सुरक्षित पहुँच प्रदान करने के लिए प्रणाली तैयार की गई है।"
                : "Designed to provide citizens strictly authorized, encrypted access to integrated land registry records."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;