"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { FiAlertTriangle, FiArrowRight, FiEye, FiHeart } from "react-icons/fi";
import { viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Image-backed header card for a service category.
 *
 * The photograph is the card — the copy sits *on* it rather than beside it. To
 * keep the type readable without hiding the image behind a flat panel, three
 * things stack:
 *
 *   1. an accent-tinted wash in `mix-blend-multiply`, which darkens the photo
 *      while keeping its texture rather than greying it out,
 *   2. a bottom-weighted scrim only where the text actually sits, and
 *   3. the oversized index numeral in `mix-blend-overlay`, so it reads as part
 *      of the photograph instead of a sticker on top of it.
 *
 * On hover the image scales, the wash lifts (the photo gets *more* visible, not
 * less), the card rises and the arrow slides. Every one of those is transform
 * or opacity, so it stays on the compositor. Reduced motion keeps the hover
 * colour change and drops the movement.
 */
/**
 * Icons are looked up here rather than passed in: they are React component
 * *functions*, which cannot cross the server→client boundary. The services page
 * is a server component, so it sends a plain string key instead.
 */
const ICONS = {
  "pediatric-surgery": FiHeart,
  "eye-care": FiEye,
  emergency: FiAlertTriangle,
} as const;

export type CategoryIconKey = keyof typeof ICONS;

export function ServiceCategoryCard({
  index,
  eyebrow,
  title,
  description,
  image,
  iconKey,
  accent,
  href,
  hrefLabel,
  count,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  image: { src: StaticImageData; alt: string };
  iconKey: CategoryIconKey;
  accent: "brand" | "rose";
  href?: string;
  hrefLabel?: string;
  count: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rose = accent === "rose";
  const Icon = ICONS[iconKey];

  const body = (
    <>
      {/* Photograph */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
        placeholder="blur"
        className={cn(
          "object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)]",
          !reduced && "group-hover:scale-108",
        )}
      />

      {/* Accent wash — multiply keeps the photo's texture visible through it */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 mix-blend-multiply transition-opacity duration-700 ease-[var(--ease-out-expo)] group-hover:opacity-70",
          rose
            ? "bg-linear-to-br from-rose-900/90 via-rose-800/55 to-brand-900/40"
            : "bg-linear-to-br from-brand-900/90 via-brand-800/55 to-ink-950/40",
        )}
      />
      {/* Scrim, bottom-weighted so it only sits under the type */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/25 to-transparent"
      />

      {/* Oversized numeral, blended into the photograph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 right-2 font-display text-[9rem] leading-none text-white/25 mix-blend-overlay transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:-translate-y-2 sm:-bottom-10 sm:right-6 sm:text-[12rem]"
      >
        {index}
      </span>

      {/* Copy */}
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8 md:p-10">
        <span
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm",
            rose ? "bg-rose-500/85" : "bg-brand-600/85",
          )}
        >
          {eyebrow}
        </span>

        <div className="mt-4 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-h2 font-bold tracking-tight text-white">{title}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/80 md:text-[1rem]">
              {description}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] font-semibold text-white/90">
              <span className="rounded-full border border-white/25 px-3 py-1">
                {count} services
              </span>
              {hrefLabel && (
                <span className="inline-flex items-center gap-1.5">
                  {hrefLabel}
                  <FiArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5"
                  />
                </span>
              )}
            </p>
          </div>

          {/* Icon medallion */}
          <span
            className={cn(
              "hidden size-16 shrink-0 place-items-center rounded-2xl text-[1.75rem] text-white shadow-lg transition-transform duration-500 ease-[var(--ease-out-expo)] sm:grid",
              !reduced && "group-hover:-rotate-6 group-hover:scale-110",
              rose ? "bg-rose-500" : "bg-brand-600",
            )}
          >
            <Icon aria-hidden="true" />
          </span>
        </div>
      </div>
    </>
  );

  const shell = cn(
    "group relative block h-[22rem] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:shadow-[var(--shadow-lift)] sm:h-[24rem] md:h-[26rem]",
    !reduced && "hover:-translate-y-1.5",
    className,
  );

  return (
    <motion.div
      data-reveal
      initial={reduced ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {href ? (
        <Link href={href} className={shell}>
          {body}
        </Link>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </motion.div>
  );
}
