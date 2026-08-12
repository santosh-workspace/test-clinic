"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { departments } from "@/config/content";
import { cn } from "@/lib/utils";

/**
 * Interleaved services grid — the first six from each department, alternating,
 * so the section reads as one hospital rather than two lists side by side.
 */
export function ServicesPreview() {
  const items = departments.flatMap((dept) =>
    dept.services.slice(0, 6).map((service) => ({ ...service, dept })),
  );

  // Alternate between departments so colour rhythm is even across the grid.
  const interleaved = items
    .filter((i) => i.dept.slug === "pediatrics")
    .flatMap((p, idx) => {
      const e = items.filter((i) => i.dept.slug === "eye-care")[idx];
      return e ? [p, e] : [p];
    });

  return (
    <Section id="services" tone="white">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="04"
            eyebrow="Services"
            segments={[
              { text: "Everything a family" },
              { text: "usually needs", accent: true },
            ]}
            lead="From a first vaccination to a cataract opinion. Twenty-two services across two departments, with surgical consultation for both."
            className="lg:max-w-2xl"
          />
          <Reveal variant="up">
            <ButtonLink href="/services" variant="secondary" arrow className="shrink-0">
              All services
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          amount={0.055}
        >
          {interleaved.map((item) => {
            const teal = item.dept.accent === "teal";
            const Icon = item.icon;

            return (
              <Reveal key={`${item.dept.slug}-${item.name}`} child variant="up">
                <Link
                  href={item.dept.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-ink-100 bg-white p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
                >
                  {/* Colour wash that fades in on hover */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      teal
                        ? "bg-linear-to-br from-teal-50 to-transparent"
                        : "bg-linear-to-br from-brand-50 to-transparent",
                    )}
                  />

                  <span
                    className={cn(
                      "relative grid size-12 place-items-center rounded-2xl text-[1.3rem] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
                      teal
                        ? "bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white"
                        : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
                    )}
                  >
                    <Icon aria-hidden="true" />
                  </span>

                  <h3 className="relative mt-5 text-[1.05rem] font-bold tracking-tight text-ink-950">
                    {item.name}
                  </h3>
                  <p className="relative mt-2.5 flex-1 text-[0.89rem] leading-relaxed text-ink-600">
                    {item.description}
                  </p>

                  <span
                    className={cn(
                      "relative mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em]",
                      teal ? "text-teal-600" : "text-brand-600",
                    )}
                  >
                    {item.dept.shortName}
                    <FiArrowRight
                      aria-hidden="true"
                      className="opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
