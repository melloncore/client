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
      className="inline-flex items-center gap-2 font-display text-xl font-medium tracking-tight"
      aria-label={`${siteConfig.name} — home`}
    >
      <Image src={LogoImage} alt={`${siteConfig.name} — home`} width={50} height={50} />
      <span className={onDark ? "text-white" : "text-ink"}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
