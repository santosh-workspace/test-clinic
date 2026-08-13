"use client";

import { FiStar } from "react-icons/fi";
import { FaGoogle, FaQuoteLeft } from "react-icons/fa6";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials, type Testimonial } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee of review cards, two rows drifting in opposite directions.
 *
 * The track is duplicated and translated -50%, which loops seamlessly with a
 * single CSS animation — no JS per frame, so it costs nothing on the main
 * thread. Hovering pauses it, and reduced-motion stops it entirely (the CSS
 * for that lives in globals.css).
 *
 * The cards are marked up as an aria-hidden decorative region for the
 * duplicate track so screen readers hear each quote exactly once.
 */
function ReviewCard({ item }: { item: Testimonial }) {
  const rose = item.department === "pediatric-surgery";

  return (
    <figure className="flex h-full w-[19rem] shrink-0 flex-col rounded-[1.4rem] border border-edge bg-surface-2 p-6 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:w-[22rem]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <FiStar
              key={i}
              aria-hidden="true"
              className="size-4 fill-amber-400 text-amber-400"
            />
          ))}
        </div>
        <FaGoogle aria-hidden="true" className="size-4 text-ink-300" />
      </div>

      <FaQuoteLeft
        aria-hidden="true"
        className={cn("mt-5 size-5", rose ? "text-rose-300" : "text-brand-300")}
      />

      <blockquote
        lang={item.lang}
        className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-fg-muted"
      >
        {item.quote}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-edge pt-4">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full text-[0.8rem] font-bold",
            rose ? "bg-rose-50 text-rose-700" : "bg-brand-50 text-brand-700",
          )}
          aria-hidden="true"
        >
          {item.context.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[0.85rem] font-semibold text-fg">
            {item.author}
          </p>
          <p className="truncate text-[0.76rem] text-fg-subtle">{item.context}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  reverse = false,
  duration = 52,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
}) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4 animate-marquee"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {items.map((item, i) => (
          <ReviewCard key={`a-${i}`} item={item} />
        ))}
        {/* Duplicate track for the seamless loop — hidden from assistive tech */}
        <div className="flex gap-4" aria-hidden="true">
          {items.map((item, i) => (
            <ReviewCard key={`b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <Section id="testimonials" tone="light" className="overflow-hidden">
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Patient stories"
          align="center"
          segments={[{ text: "In their" }, { text: "own words", accent: true }]}
          lead="What families say after a visit — about the waiting, the explanation, and whether they felt heard."
        />
      </div>

      <div className="mt-10 space-y-4">
        <Row items={rowA} duration={54} />
        <Row items={rowB} reverse duration={64} />
      </div>

      <div className="container-page mt-12 text-center">
        <Reveal variant="up">
          <ButtonLink
            href={siteConfig.maps.reviewUrl}
            variant="secondary"
            icon={<FaGoogle />}
          >
            Read reviews on Google
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
