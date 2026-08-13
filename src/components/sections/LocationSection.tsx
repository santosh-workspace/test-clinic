"use client";

import { FiClock, FiMapPin, FiNavigation, FiPhone } from "react-icons/fi";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { addressOneLine, links, siteConfig } from "@/config/site";
import { ButtonRow } from "@/components/ui/ButtonRow";

/**
 * Map + visit details.
 *
 * The iframe is `loading="lazy"` and sits below the fold — an eagerly loaded
 * Google Maps embed pulls in several hundred KB from a third party and is one
 * of the most common causes of a failed Lighthouse run on clinic sites.
 */
export function LocationSection() {
  const { address, maps } = siteConfig;

  const embedSrc =
    maps.embedSrc ||
    `https://maps.google.com/maps?q=${encodeURIComponent(
      `${siteConfig.name}, ${addressOneLine}`,
    )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <Section id="location" tone="light">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              index="08"
              eyebrow="Find us"
              segments={[{ text: "Visiting the" }, { text: "hospital", accent: true }]}
              lead={`We are in ${address.locality}. Tap Get Directions and Google Maps will open with the route already set from wherever you are.`}
            />

            <div className="mt-9 space-y-3.5">
              {[
                {
                  icon: FiMapPin,
                  label: "Address",
                  value: addressOneLine,
                },
                {
                  icon: FiPhone,
                  label: "Phone",
                  value: siteConfig.contact.phoneDisplay,
                  href: links.tel,
                },
                {
                  icon: FiClock,
                  label: "OPD hours",
                  value: siteConfig.hours
                    .map((h) => `${h.days}: ${h.label}`)
                    .join(" · "),
                },
              ].map((row, i) => {
                const Icon = row.icon;
                return (
                  <Reveal key={row.label} variant="up" delay={i * 0.06}>
                    <div className="group flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-[1.15rem] text-brand-600 transition-colors duration-400 group-hover:bg-brand-600 group-hover:text-white">
                        <Icon aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                          {row.label}
                        </p>
                        {row.href ? (
                          <a
                            href={row.href}
                            className="mt-1 block text-[0.94rem] font-medium text-ink-900 hover:text-brand-700"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-[0.94rem] text-ink-700">{row.value}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal variant="up" delay={0.2}>
              <ButtonRow className="mt-7">
                <ButtonLink
                  href={maps.directionsUrl}
                  size="lg"
                  icon={<FiNavigation />}
                  fullWidth
                >
                  Get Directions
                </ButtonLink>
                <ButtonLink
                  href={links.tel}
                  variant="secondary"
                  size="lg"
                  icon={<FiPhone />}
                  fullWidth
                >
                  Call the hospital
                </ButtonLink>
              </ButtonRow>
            </Reveal>
          </div>

          {/* Map */}
          <Reveal variant="clip" className="lg:col-span-7">
            <div className="relative h-[22rem] overflow-hidden rounded-[var(--radius-xl2)] border border-ink-100 bg-ink-100 shadow-[var(--shadow-soft)] sm:h-[26rem] lg:h-full lg:min-h-[30rem]">
              <iframe
                src={embedSrc}
                title={`Map showing the location of ${siteConfig.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 grayscale-[0.25] transition-[filter] duration-700 hover:grayscale-0"
              />

              {/* Pulsing marker overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="relative flex size-5 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full bg-brand-500/40"
                    style={{ animation: "pulse-ring 2.6s var(--ease-smooth) infinite" }}
                  />
                  <span className="size-3 rounded-full bg-brand-600 ring-2 ring-white" />
                </span>
              </div>

              {/* Floating label */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4">
                <div className="glass inline-flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)]">
                  <FiMapPin aria-hidden="true" className="text-brand-600" />
                  <div>
                    <p className="text-[0.85rem] font-bold tracking-tight text-ink-950">
                      {siteConfig.name}
                    </p>
                    <p className="text-[0.75rem] text-ink-600">
                      {address.locality}, {address.region}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
