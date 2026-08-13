"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

/**
 * A single service card.
 *
 * Structure follows the reference layout — themed icon, accent-coloured title,
 * a hairline rule, then the description. The oversized ghost numeral the
 * earlier version carried is gone; it competed with the title and added
 * nothing once the grid already reads in order.
 *
 * ── Why every card has a banner ─────────────────────────────────────────────
 * Only about half the services have a photograph that genuinely depicts them —
 * there is no honest stock image of a urodynamics study. Rather than give those
 * a misleading photo, or leave them visibly shorter than their neighbours in a
 * stretched grid, cards without a photo get a flat accent-tinted banner with
 * the service icon watermarked into it. Same silhouette, same height, no
 * pretend imagery.
 *
 * The icon medallion straddles the banner and the copy so both variants share
 * one anchor point.
 *
 * Entrance is a staggered fade in from the right (the reference's
 * `fadeInRight`), orchestrated by the parent <Stagger>.
 */
export function ServiceCard({
  name,
  description,
  icon: Icon,
  accent,
  image,
  href,
  meta,
  className,
}: {
  name: string;
  description: string;
  icon: IconType;
  accent: "brand" | "rose";
  image?: { src: StaticImageData; alt: string };
  /** Makes the whole card a link. Used by the homepage preview. */
  href?: string;
  /** Small label at the foot — the department, on mixed grids. */
  meta?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rose = accent === "rose";

  const body = (
    <>
      {/* Banner — photograph where one honestly exists, tinted panel otherwise */}
      <div
        className={cn(
          "relative h-32 shrink-0 overflow-hidden",
          !image && (rose ? "bg-rose-50" : "bg-brand-50"),
        )}
      >
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              placeholder="blur"
              className={cn(
                "object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]",
                !reduced && "group-hover:scale-107",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 opacity-40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20",
                rose
                  ? "bg-linear-to-t from-rose-900/70 to-transparent"
                  : "bg-linear-to-t from-brand-900/70 to-transparent",
              )}
            />
          </>
        ) : (
          <>
            {/* Watermarked icon — decorative, never announced */}
            <Icon
              aria-hidden="true"
              className={cn(
                "absolute -right-3 -top-2 text-[6.5rem] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)]",
                !reduced && "group-hover:-translate-y-1 group-hover:scale-105",
                rose ? "text-rose-200/70" : "text-brand-200/70",
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0",
                rose
                  ? "bg-linear-to-br from-rose-100/60 via-transparent to-transparent"
                  : "bg-linear-to-br from-brand-100/60 via-transparent to-transparent",
              )}
            />
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        {/* Medallion straddles the banner so both variants share an anchor */}
        <span
          className={cn(
            "relative -mt-6 grid size-12 place-items-center rounded-full text-[1.2rem] shadow-[var(--shadow-soft)] ring-4 ring-white transition-all duration-400 ease-[var(--ease-out-expo)]",
            !reduced && "group-hover:scale-110",
            rose
              ? "bg-white text-rose-600 group-hover:bg-rose-500 group-hover:text-white"
              : "bg-white text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
          )}
        >
          <Icon aria-hidden="true" />
        </span>

        <h3
          className={cn(
            "mt-4 text-[1rem] font-bold leading-snug tracking-tight transition-colors duration-300",
            rose
              ? "text-rose-700 group-hover:text-rose-800"
              : "text-brand-700 group-hover:text-brand-800",
          )}
        >
          {name}
        </h3>

        {/* Hairline rule, as in the reference. Fills with the accent on hover. */}
        <span aria-hidden="true" className="relative mt-3 block h-px w-full bg-ink-100">
          <span
            className={cn(
              "absolute inset-y-0 left-0 w-0 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover:w-full",
              rose ? "bg-rose-400" : "bg-brand-400",
            )}
          />
        </span>

        <p className="mt-3.5 text-[0.87rem] leading-relaxed text-ink-600">
          {description}
        </p>

        {meta && (
          <span
            className={cn(
              "mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
              rose ? "text-rose-600" : "text-brand-600",
            )}
          >
            {meta}
            {href && (
              <FiArrowRight
                aria-hidden="true"
                className="opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:opacity-100"
              />
            )}
          </span>
        )}
      </div>
    </>
  );

  const shell = cn(
    "group flex h-full flex-col overflow-hidden rounded-[1.1rem] border border-ink-100 bg-white transition-[border-color,box-shadow,transform] duration-400 ease-[var(--ease-out-expo)] hover:border-transparent hover:shadow-[var(--shadow-lift)]",
    !reduced && "hover:-translate-y-1",
    className,
  );

  return (
    <motion.div
      data-reveal
      variants={{
        hidden: reduced ? {} : { opacity: 0, x: 28 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="h-full"
    >
      {href ? (
        <Link href={href} className={shell}>
          {body}
        </Link>
      ) : (
        <article className={shell}>{body}</article>
      )}
    </motion.div>
  );
}
