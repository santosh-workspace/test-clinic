"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; href: string };

/**
 * Inner-page hero. Consistent across every route so navigation feels
 * continuous, with an optional image column for the department pages.
 *
 * The visible breadcrumb trail mirrors the BreadcrumbList JSON-LD emitted by
 * each page, which is what earns the breadcrumb display in search results.
 */
export function PageHero({
  eyebrow,
  segments,
  lead,
  crumbs,
  image,
  children,
  accent = "brand",
}: {
  eyebrow: string;
  segments: { text: string; accent?: boolean }[];
  lead?: string;
  crumbs: Crumb[];
  image?: { src: StaticImageData; alt: string };
  children?: ReactNode;
  accent?: "brand" | "teal";
}) {
  const reduced = useReducedMotion();
  const teal = accent === "teal";

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-14 md:pt-14 md:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full blur-[120px]",
            teal ? "bg-teal-100/70" : "bg-brand-100/60",
          )}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-sand-50" />
      </div>

      <div className="container-page">
        {/* Breadcrumbs */}
        <motion.nav data-reveal {...rise(0)} aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[0.8rem] text-ink-500">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="font-medium text-ink-800">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-brand-700"
                      >
                        {crumb.name}
                      </Link>
                      <FiChevronRight aria-hidden="true" className="text-ink-300" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <div
          className={cn(
            "mt-8 grid items-center gap-12",
            image ? "lg:grid-cols-12 lg:gap-14" : "",
          )}
        >
          <div className={image ? "lg:col-span-7" : "max-w-4xl"}>
            <motion.p
              data-reveal {...rise(0.06)}
              className={cn(
                "flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
                teal ? "text-teal-600" : "text-brand-600",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-8",
                  teal
                    ? "bg-linear-to-r from-teal-400 to-transparent"
                    : "bg-linear-to-r from-brand-400 to-transparent",
                )}
              />
              {eyebrow}
            </motion.p>

            <SplitHeading
              as="h1"
              segments={segments}
              className="mt-5 text-h1 font-bold tracking-tight text-ink-950"
              accentClassName={cn(
                "font-display italic",
                teal
                  ? "bg-linear-to-r from-teal-600 to-brand-500 bg-clip-text text-transparent"
                  : "text-gradient",
              )}
            />

            {lead && (
              <motion.p data-reveal {...rise(0.3)} className="mt-6 max-w-2xl text-lead text-ink-600">
                {lead}
              </motion.p>
            )}

            {children && <motion.div data-reveal {...rise(0.4)}>{children}</motion.div>}
          </div>

          {image && (
            <motion.div
              data-reveal
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, clipPath: "inset(10% round 1.75rem)" },
                    animate: { opacity: 1, clipPath: "inset(0% round 1.75rem)" },
                    transition: { duration: 1.1, delay: 0.15, ease: EASE },
                  })}
              className="relative aspect-4/3 overflow-hidden rounded-[var(--radius-xl2)] bg-ink-100 shadow-[var(--shadow-lift)] lg:col-span-5 lg:aspect-4/5"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink-950/30 to-transparent"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
