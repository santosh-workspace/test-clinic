"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn } from "@/lib/utils";

/**
 * Numbered editorial section header — "01 / Departments" above the headline.
 * The numbering is decorative and hidden from assistive tech.
 */
export function SectionHeading({
  index,
  eyebrow,
  segments,
  lead,
  align = "left",
  invert = false,
  className,
  as = "h2",
}: {
  index?: string;
  eyebrow: string;
  segments: { text: string; accent?: boolean }[];
  lead?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal variant="up">
        <p
          className={cn(
            "flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
            invert ? "text-rose-300" : "text-brand-600",
          )}
        >
          {index && (
            <span
              aria-hidden="true"
              className={cn(
                "font-display text-[0.95rem] tabular-nums not-italic",
                invert ? "text-white/35" : "text-ink-300",
              )}
            >
              {index}
            </span>
          )}
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              invert
                ? "bg-linear-to-r from-rose-300/70 to-transparent"
                : "bg-linear-to-r from-brand-400 to-transparent",
            )}
          />
          {eyebrow}
        </p>
      </Reveal>

      <SplitHeading
        as={as}
        segments={segments}
        className={cn(
          "mt-5 max-w-3xl text-h2",
          invert && "text-white",
          align === "center" && "mx-auto",
        )}
        accentClassName={
          invert
            ? "font-display italic bg-linear-to-r from-rose-200 to-brand-200 bg-clip-text text-transparent"
            : "font-display italic text-gradient"
        }
      />

      {lead && (
        <Reveal variant="up" delay={0.1}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-lead",
              invert ? "text-white/70" : "text-ink-600",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "light",
  spacing = "lg",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "white" | "ink" | "brand";
  spacing?: "sm" | "md" | "lg";
}) {
  const tones = {
    light: "bg-sand-50",
    white: "bg-white",
    ink: "bg-ink-950 text-white",
    brand: "bg-brand-50",
  };
  /* The site's vertical rhythm. Trimmed ~35% from the original scale — the
     sections were reading as disconnected rather than spacious. */
  const spacings = {
    sm: "py-9 md:py-12",
    md: "py-11 md:py-16",
    lg: "py-13 md:py-20",
  };

  return (
    <section id={id} className={cn("relative", tones[tone], spacings[spacing], className)}>
      {children}
    </section>
  );
}
