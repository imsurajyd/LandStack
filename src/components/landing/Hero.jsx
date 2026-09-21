import { ArrowRight, Map, MapPin, ShieldCheck, Sparkles } from "lucide-react";

function Hero({ onLogin }) {
  return (
    <section id="home" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-muted shadow-sm">
            <Sparkles className="size-4 text-secondary" />
            <span>Digital Land Governance</span>
          </div>

          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Your Land.
            <span className="block text-primary">One Place.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            आपकी जमीन की उपलब्ध जानकारी को एक simple और unified digital view में
            देखें — ownership, location, records और status एक जगह।
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              onClick={onLogin}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
            >
              Get Started
              <ArrowRight className="size-4" />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-slate-50"
            >
              How It Works
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-secondary" />
              Secure Access
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-secondary" />
              Location Based
            </div>
          </div>
        </div>

        {/* Right GIS Visual */}
        <div className="relative">
          <div className="relative mx-auto aspect-square max-w-[560px] overflow-hidden rounded-3xl border border-border bg-white p-4 shadow-xl shadow-slate-200/60">
            {/* Map Header */}
            <div className="absolute left-7 right-7 top-7 z-10 flex items-center justify-between rounded-xl border border-border bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex items-center gap-2">
                <Map className="size-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Your Land Locations
                </span>
              </div>

              <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                4 Parcels
              </span>
            </div>

            {/* Static Map */}
            <div className="relative h-full overflow-hidden rounded-2xl bg-slate-100">
              {/* Map Grid */}
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] [background-size:48px_48px]" />

              {/* Roads */}
              <div className="absolute left-1/2 top-0 h-full w-5 -translate-x-1/2 rotate-12 bg-white/80" />
              <div className="absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 -rotate-6 bg-white/80" />

              {/* Land Parcels */}
              <div className="absolute left-[18%] top-[25%] h-28 w-32 rotate-6 rounded-lg border-2 border-secondary bg-secondary/15" />

              <div className="absolute right-[16%] top-[27%] h-24 w-36 -rotate-6 rounded-lg border-2 border-primary bg-primary/10" />

              <div className="absolute bottom-[20%] left-[25%] h-32 w-36 -rotate-3 rounded-lg border-2 border-secondary bg-secondary/15" />

              <div className="absolute bottom-[17%] right-[20%] h-28 w-32 rotate-12 rounded-lg border-2 border-primary bg-primary/10" />

              {/* Location Pins */}
              <MapPin className="absolute left-[30%] top-[32%] size-8 fill-secondary text-secondary drop-shadow-md" />

              <MapPin className="absolute right-[28%] top-[30%] size-8 fill-primary text-primary drop-shadow-md" />

              <MapPin className="absolute bottom-[28%] left-[38%] size-8 fill-secondary text-secondary drop-shadow-md" />

              <MapPin className="absolute bottom-[24%] right-[30%] size-8 fill-primary text-primary drop-shadow-md" />

              {/* Map Label */}
              <div className="absolute bottom-5 left-5 rounded-lg border border-border bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <p className="text-xs font-medium text-muted">Land parcels</p>
                <p className="text-sm font-semibold text-primary">Bihar</p>
              </div>
            </div>
          </div>

          {/* Floating Information Card */}
          <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-border bg-white p-4 shadow-lg sm:block lg:-left-8">
            <p className="text-xs font-medium text-muted">Total Land</p>

            <p className="mt-1 text-xl font-bold text-primary">12.5 Acre</p>

            <p className="mt-1 text-xs text-secondary">Across 3 districts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
