import {
  Database,
  Map,
  ShieldCheck,
  FileSearch,
  ArrowUpRight,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: Database,
      title: "Unified Land Records",
      description:
        "अलग-अलग जगहों पर उपलब्ध आपकी land information को एक unified view में देखें।",
    },
    {
      icon: Map,
      title: "Land on Map",
      description:
        "अपनी land parcels और उनकी available location information को map पर explore करें।",
    },
    {
      icon: ShieldCheck,
      title: "Ownership Details",
      description:
        "उपलब्ध ownership और parcel-related information को एक जगह आसानी से देखें।",
    },
    {
      icon: FileSearch,
      title: "Case & Status",
      description:
        "Available records के आधार पर land case, proceeding और status information देखें।",
    },
  ];

  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            One Platform
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything about your land,
            <span className="block text-primary">in one place.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted">
            LandStack का उद्देश्य available land information को simple,
            accessible और easy-to-understand experience में दिखाना है।
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
                  Explore
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
