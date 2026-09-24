// src/components/common/BrandLogo.jsx
import Logo from "../../assets/Logo.png";

export default function BrandLogo({
  className = "",
  showTagline = true,
  size = "md",
}) {
  const sizeClasses = {
    sm: { img: "size-8", title: "text-base", tagline: "text-[9px]" },
    md: { img: "size-10", title: "text-lg", tagline: "text-[10px]" },
    lg: { img: "size-12", title: "text-2xl", tagline: "text-[12px]" },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src={Logo}
          alt="LandStack Logo"
          className={`${currentSize.img} object-contain`}
        />
      </div>

      <div>
        <div
          className={`${currentSize.title} font-bold tracking-tight text-primary`}
        >
          Land<span className="text-secondary">Stack</span>
        </div>

        {showTagline && (
          <div
            className={`hidden font-medium uppercase tracking-[0.16em] text-muted sm:block ${currentSize.tagline}`}
          >
            Digital Land Governance
          </div>
        )}
      </div>
    </div>
  );
}
