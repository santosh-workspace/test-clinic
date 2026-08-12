"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Platform = { key: keyof typeof siteConfig.social; label: string; icon: IconType };

const PLATFORMS: Platform[] = [
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "facebook", label: "Facebook", icon: FaFacebookF },
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedinIn },
  { key: "google", label: "Google Business Profile", icon: FaGoogle },
];

/** Empty URLs in site.ts are dropped, so unused platforms never render. */
export function SocialLinks({
  className,
  tone = "light",
  size = "md",
}: {
  className?: string;
  tone?: "light" | "dark" | "bare";
  size?: "sm" | "md" | "lg";
}) {
  const available = PLATFORMS.filter((p) => siteConfig.social[p.key]);

  const sizes = {
    sm: "size-9 text-[0.85rem]",
    md: "size-11 text-[0.95rem]",
    lg: "size-12 text-[1.05rem]",
  };

  const tones = {
    light:
      "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700",
    dark: "border border-white/15 bg-white/5 text-white/70 hover:border-rose-300/60 hover:text-white",
    bare: "text-ink-500 hover:text-brand-700",
  };

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {available.map(({ key, label, icon: Icon }) => (
        <li key={key}>
          <motion.a
            href={siteConfig.social[key]}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${siteConfig.name} on ${label}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "grid place-items-center rounded-full transition-colors duration-300",
              sizes[size],
              tones[tone],
            )}
          >
            <Icon aria-hidden="true" />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}
