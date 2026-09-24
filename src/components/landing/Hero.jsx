// src/components/landing/Hero.jsx
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, Sparkles, Layers } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

function Hero({ onLogin }) {
  const { language } = useLanguage();

  return (
    <section id="home" className="relative w-full overflow-hidden bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        
        {/* Left Content */}
        <div className="w-full max-w-2xl text-left">
          {/* Badge */}
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-muted shadow-xs">
            <Sparkles className="size-3.5 sm:size-4 text-secondary" />
            <span>
              {language === "hi"
                ? "डिजिटल भू-अभिलेख एवं एग्रीस्टैक"
                : "Digital Land Governance & AgriStack"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {language === "hi" ? (
              <>
                आपकी जमीन।
                <span className="block text-primary">एक ही जगह।</span>
              </>
            ) : (
              <>
                Your Land.
                <span className="block text-primary">One Place.</span>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="mt-4 sm:mt-6 max-w-xl text-sm leading-6 sm:leading-7 text-muted sm:text-lg">
            {language === "hi"
              ? "बिहार के सभी जिलों की जमीन की जानकारी एक ही एकीकृत डिजिटल डैशबोर्ड में — स्वामित्व, कैडस्ट्रल नक्शा, CERSAI बैंक बंधक और ई-कोर्ट विवाद स्थिति।"
              : "Consolidated land parcel records across all districts in one unified dashboard — verified ownership, cadastral maps, CERSAI bank liens, and e-Court litigation tracking."}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onLogin}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
            >
              <span>{language === "hi" ? "शुरू करें" : "Get Started"}</span>
              <ArrowRight className="size-4" />
            </button>

            <a
              href="#how-it-works"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-slate-50 active:bg-slate-100"
            >
              {language === "hi" ? "कार्यप्रणाली देखें" : "How It Works"}
            </a>
          </div>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-secondary shrink-0" />
              <span>{language === "hi" ? "सुरक्षित नागरिक लॉगिन" : "Secure Citizen Auth"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 text-secondary shrink-0" />
              <span>{language === "hi" ? "मल्टी-डिस्ट्रिक्ट सिंक" : "Multi-District Sync"}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-secondary" />
              <span>DILRMP & Bhu-Aadhaar</span>
            </div>
          </div>
        </div>

        {/* Right Realistic Cadastral Preview */}
        <div className="relative w-full max-w-[480px] mx-auto lg:max-w-[540px]">
          {/* Main Card Frame */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xl shadow-slate-200/70">
            
            {/* Satellite Map Visual Box */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100">
              
              {/* Clean Aerial Satellite Farmland Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80')`,
                }}
              >
                <div className="absolute inset-0 bg-slate-900/20 backdrop-brightness-95" />
              </div>

              {/* Cadastral Polygon Overlay (Bhu-Naksha Style) */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 400 300">
                <polygon
                  points="20,40 180,30 170,140 30,130"
                  fill="rgba(255, 255, 255, 0.08)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                <polygon
                  points="180,30 380,20 360,150 170,140"
                  fill="rgba(255, 255, 255, 0.08)"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                
                {/* Primary Selected Parcel Polygon */}
                <polygon
                  points="90,120 310,105 280,250 80,240"
                  fill="rgba(16, 185, 129, 0.28)"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              </svg>

              {/* Center Plot Marker with Label */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 shadow-md border border-emerald-500/30 backdrop-blur-xs">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">
                    {language === "hi" ? "प्लॉट #1254" : "Plot #1254"}
                  </span>
                  <span className="text-[11px] text-muted">
                    · {language === "hi" ? "2.50 एकड़" : "2.50 Acre"}
                  </span>
                </div>
              </div>

              {/* Map Layer Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-white backdrop-blur-xs text-[11px] font-medium">
                <Layers className="size-3.5 text-emerald-400" />
                <span>
                  {language === "hi" ? "कैडस्ट्रल सैटेलाइट हाइब्रिड" : "Cadastral Satellite Hybrid"}
                </span>
              </div>

              {/* District Pin Pill */}
              <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-slate-800 shadow-sm border border-slate-200 text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                <span>Danapur, Patna</span>
              </div>
            </div>

            {/* Bottom Card Summary Row */}
            <div className="mt-3 flex items-center justify-between px-1 pt-1">
              <div>
                <p className="text-[11px] font-medium text-muted">
                  {language === "hi" ? "कुल पंजीकृत रकबा" : "Consolidated Holdings"}
                </p>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  12.50 Acre{" "}
                  <span className="text-xs font-normal text-muted">
                    {language === "hi" ? "(3 जिले)" : "(3 Districts)"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-700">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                <span className="text-xs font-semibold">
                  {language === "hi" ? "विवाद रहित (क्लियर)" : "Title Clear"}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Verified Bhu-Aadhaar Badge */}
          <div className="mt-3 sm:mt-0 sm:absolute sm:-top-4 sm:-right-4 rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg shadow-slate-200/80 flex items-center gap-2.5 z-20">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted">Bhu-Aadhaar / ULPIN</p>
              <p className="font-mono text-xs font-bold text-slate-800">BR-PAT-2026-9841</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;