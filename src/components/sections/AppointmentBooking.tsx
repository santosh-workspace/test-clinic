"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiCheck, FiClock, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { departments, type Department } from "@/config/content";
import { doctors, links, siteConfig } from "@/config/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Department-first booking.
 *
 * Step 1 picks the department, step 2 opens that department's own Calendly
 * event type. This is deliberately not one generic form: a parent booking a
 * vaccination and a patient booking a cataract review need different slots,
 * different durations, and a different doctor's calendar.
 *
 * The Calendly script is injected only after a department is chosen, so the
 * ~90KB widget never touches first load. If a Calendly URL has not been
 * configured yet (see siteConfig.calendly), step 2 falls back to a prefilled
 * WhatsApp message and a call button — the flow never dead-ends.
 */
export function AppointmentBooking() {
  const [selected, setSelected] = useState<Department["slug"] | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const stepTwoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const dept = departments.find((d) => d.slug === selected) ?? null;
  const doctor = dept ? doctors.find((doc) => doc.department === dept.slug)! : null;
  const calendlyUrl = dept ? siteConfig.calendly[camel(dept.slug)] : "";

  // Deep links from elsewhere on the site: /appointment#pediatrics
  // The fragment is not available during SSR and Next does not expose it as a
  // route param, so it has to be read once on mount.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hash === "pediatric-surgery" || hash === "eye-care") setSelected(hash);
  }, []);

  const choose = useCallback(
    (slug: Department["slug"]) => {
      setSelected(slug);
      // Move focus and scroll to step two so keyboard users follow the flow.
      requestAnimationFrame(() => {
        stepTwoRef.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        stepTwoRef.current?.focus({ preventScroll: true });
      });
    },
    [reduced],
  );

  return (
    <>
      {selected && (
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
          onReady={() => setScriptReady(true)}
        />
      )}

      {/* ── Step 1 ────────────────────────────────────────────────── */}
      <Section tone="white">
        <div className="container-page">
          <div className="flex items-start gap-4">
            <StepBadge n={1} active />
            <SectionHeading
              eyebrow="Step one"
              segments={[{ text: "Choose a" }, { text: "department", accent: true }]}
              lead="Each department books into its own calendar, so the slot you pick is with the right specialist for the right length of time."
            />
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-7">
            {departments.map((d, i) => {
              const doc = doctors.find((x) => x.department === d.slug)!;
              const rose = d.accent === "rose";
              const isActive = selected === d.slug;
              const Icon = d.icon;

              return (
                <Reveal key={d.slug} variant="up" delay={i * 0.1}>
                  <button
                    type="button"
                    onClick={() => choose(d.slug)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl2)] border-2 bg-white text-left transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]",
                      isActive
                        ? rose
                          ? "border-rose-500 shadow-[var(--shadow-lift)]"
                          : "border-brand-600 shadow-[var(--shadow-lift)]"
                        : "border-ink-100 shadow-[var(--shadow-soft)]",
                    )}
                  >
                    {/* Selected tick */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className={cn(
                            "absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full text-white shadow-lg",
                            rose ? "bg-rose-500" : "bg-brand-600",
                          )}
                        >
                          <FiCheck aria-hidden="true" />
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <div className="relative aspect-16/9 overflow-hidden">
                      <Image
                        src={d.heroImage.src}
                        alt={d.heroImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 44vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-107"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 mix-blend-multiply",
                          rose
                            ? "bg-linear-to-tr from-rose-900/85 via-rose-800/30 to-transparent"
                            : "bg-linear-to-tr from-brand-900/85 via-brand-800/30 to-transparent",
                        )}
                      />
                      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                        <h3 className="text-h3 font-bold text-white">{d.name}</h3>
                        <span
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-2xl text-[1.4rem] text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
                            rose ? "bg-rose-500" : "bg-brand-600",
                          )}
                        >
                          <Icon aria-hidden="true" />
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-center gap-3">
                        <Image
                          src={doc.image}
                          alt=""
                          width={48}
                          height={48}
                          className="size-12 rounded-full object-cover object-top"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[0.95rem] font-bold tracking-tight text-ink-950">
                            {doc.name}
                          </p>
                          <p className="truncate text-[0.8rem] text-ink-500">
                            {doc.qualification}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-[0.93rem] leading-relaxed text-ink-600">
                        {d.intro}
                      </p>

                      <p className="mt-5 flex items-center gap-2 text-[0.83rem] text-ink-500">
                        <FiClock aria-hidden="true" className="shrink-0" />
                        {doc.timings[0].days} · {doc.timings[0].time}
                      </p>

                      <span
                        className={cn(
                          "mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold text-white transition-all duration-400",
                          rose
                            ? "bg-rose-500 group-hover:bg-rose-600"
                            : "bg-brand-600 group-hover:bg-brand-700",
                        )}
                      >
                        {isActive ? "Selected" : `Book ${d.shortName} Appointment`}
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── Step 2 ────────────────────────────────────────────────── */}
      <Section tone="light" className="scroll-mt-20">
        <div className="container-page">
          <div
            ref={stepTwoRef}
            tabIndex={-1}
            className="outline-none"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              <StepBadge n={2} active={Boolean(selected)} />
              <SectionHeading
                eyebrow="Step two"
                segments={[{ text: "Pick a" }, { text: "time", accent: true }]}
                lead={
                  dept
                    ? `Choosing a slot with ${doctor!.name} in ${dept.name}.`
                    : "Select a department above and the available slots will appear here."
                }
              />
            </div>

            <AnimatePresence mode="wait">
              {!dept ? (
                <motion.div
                  key="empty"
                  initial={reduced ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  className="mt-10 grid min-h-64 place-items-center rounded-[var(--radius-xl2)] border-2 border-dashed border-ink-200 bg-white/60 p-10 text-center"
                >
                  <div>
                    <p className="font-display text-2xl text-ink-300">01 → 02</p>
                    <p className="mt-3 text-[0.95rem] text-ink-500">
                      No department selected yet.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={dept.slug}
                  initial={reduced ? undefined : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-10"
                >
                  {/* Selection summary */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-100 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={doctor!.image}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 rounded-full object-cover object-top"
                      />
                      <div>
                        <p className="text-[0.9rem] font-bold tracking-tight text-ink-950">
                          {dept.name}
                        </p>
                        <p className="text-[0.8rem] text-ink-500">{doctor!.name}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3.5 py-2 text-[0.83rem] font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <FiArrowLeft aria-hidden="true" />
                      Change department
                    </button>
                  </div>

                  {calendlyUrl ? (
                    <div className="overflow-hidden rounded-[var(--radius-xl2)] border border-ink-100 bg-white shadow-[var(--shadow-soft)]">
                      {!scriptReady && (
                        <div className="grid h-[42rem] place-items-center">
                          <p className="text-[0.9rem] text-ink-500">
                            Loading the booking calendar…
                          </p>
                        </div>
                      )}
                      <div
                        className={cn(
                          "calendly-inline-widget",
                          !scriptReady && "hidden",
                        )}
                        data-url={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=${
                          dept.accent === "rose" ? "0d9c8a" : "1454d6"
                        }`}
                        style={{ minWidth: "320px", height: "42rem" }}
                      />
                    </div>
                  ) : (
                    <CalendlyFallback dept={dept} doctorName={doctor!.name} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </>
  );
}

/**
 * Shown when no Calendly URL is configured yet. Rather than an inert "coming
 * soon", it routes the patient to the two channels that already work.
 */
function CalendlyFallback({
  dept,
  doctorName,
}: {
  dept: Department;
  doctorName: string;
}) {
  const rose = dept.accent === "rose";

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl2)] border border-ink-100 bg-white p-8 shadow-[var(--shadow-soft)] md:p-12">
      <div className="mx-auto max-w-xl text-center">
        <span
          className={cn(
            "mx-auto grid size-14 place-items-center rounded-2xl text-2xl text-white",
            rose ? "bg-rose-500" : "bg-brand-600",
          )}
        >
          <FaWhatsapp aria-hidden="true" />
        </span>

        <h3 className="mt-6 text-h3 font-bold tracking-tight text-ink-950">
          Request your {dept.shortName.toLowerCase()} slot
        </h3>
        <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-600">
          Online scheduling for this department is being set up. In the meantime, send
          a WhatsApp message or call — reception confirms most appointments within the
          hour during OPD times.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink
            href={links.whatsapp(
              `Hello, I would like to book a ${dept.name} appointment with ${doctorName} at Yogeshwari Hospital.`,
            )}
            variant={rose ? "rose" : "primary"}
            size="lg"
            icon={<FaWhatsapp />}
          >
            Request on WhatsApp
          </ButtonLink>
          <ButtonLink href={links.tel} variant="secondary" size="lg" icon={<FiPhone />}>
            {siteConfig.contact.phoneDisplay}
          </ButtonLink>
        </div>

        <div className="mt-9 border-t border-ink-100 pt-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
            OPD hours
          </p>
          <ul className="mt-3 space-y-1 text-[0.88rem] text-ink-600">
            {siteConfig.hours.map((h) => (
              <li key={`${h.days}-${h.label}`}>
                <span className="font-medium text-ink-800">{h.days}</span> · {h.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visible only to whoever is configuring the site */}
        <p className="mt-7 rounded-xl bg-amber-50 px-4 py-3 text-left text-[0.78rem] leading-relaxed text-amber-900">
          <strong>Setup note:</strong> add this department&rsquo;s Calendly event URL to{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5">
            siteConfig.calendly.{camel(dept.slug)}
          </code>{" "}
          in <code className="rounded bg-amber-100 px-1 py-0.5">src/config/site.ts</code>{" "}
          and the embedded calendar replaces this panel automatically.
        </p>
      </div>
    </div>
  );
}

function StepBadge({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-1 grid size-11 shrink-0 place-items-center rounded-2xl font-display text-lg transition-colors duration-500",
        active
          ? "bg-linear-to-br from-brand-600 to-rose-500 text-white"
          : "border border-ink-200 bg-white text-ink-400",
      )}
    >
      {n}
    </span>
  );
}

/** Maps a department slug onto its siteConfig.calendly key. */
function camel(slug: Department["slug"]): keyof typeof siteConfig.calendly {
  return slug === "eye-care" ? "eyeCare" : "pediatricSurgery";
}
