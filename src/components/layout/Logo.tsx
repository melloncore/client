import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import LogoImage from "../../asset/trans1.png";
interface LogoProps {
  onDark?: boolean;
}

/** Shared wordmark used in the header and footer. */
export default function Logo({ onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex min-w-0 items-center gap-2 font-display text-base font-medium tracking-tight sm:text-xl"
      aria-label={`${siteConfig.name} — home`}
    >
      <Image
        src={LogoImage}
        alt={`${siteConfig.name} — home`}
        width={50}
        height={50}
        className="h-10 w-10 shrink-0 sm:h-[50px] sm:w-[50px]"
      />
      <span className={`min-w-0 truncate ${onDark ? "text-white" : "text-ink"}`}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
