import Image from "next/image";
import Link from "next/link";

interface AppLogoProps {
  size?: "sm" | "md" | "hero";
  withLink?: boolean;
  className?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  hero: "h-28 w-28 rounded-3xl sm:h-32 sm:w-32",
};

function LogoImage({
  size = "md",
  className = "",
  priority = false,
}: Omit<AppLogoProps, "withLink">) {
  return (
    <div
      className={`relative overflow-hidden border border-white/15 bg-black/20 shadow-[0_0_40px_rgba(251,146,60,0.18)] ${sizeMap[size]} ${className}`}
    >
      <Image
        src="/Q.png"
        alt="Logo QXG"
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 640px) 112px, 128px"
      />
    </div>
  );
}

export function AppLogo({
  withLink = false,
  size = "md",
  className = "",
  priority = false,
}: AppLogoProps) {
  if (withLink) {
    return (
      <Link href="/" aria-label="Accueil QXG" className="inline-flex">
        <LogoImage size={size} className={className} priority={priority} />
      </Link>
    );
  }

  return <LogoImage size={size} className={className} priority={priority} />;
}
