"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCheck, FiClock, FiGlobe, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";
import { type Department, getDepartment } from "@/config/content";
import { img } from "@/config/images";
import { getDoctorByDepartment, links } from "@/config/site";
import { cn } from "@/lib/utils";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";

/**
 * Shared department body — services grid, doctor panel and CTA band.
 * Both /departments/pediatrics and /departments/eye-care render this.
 *
 * Takes only the slug, never the department object: `Department.icon` and
 * `service.icon` are React component *functions*, and functions cannot be
 * serialised across the server→client boundary. Looking them up here — in the
 * client bundle — keeps the props plain.
 */
export function DepartmentDetail({ slug }: { slug: Department["slug"] }) {
  const dept = getDepartment(slug);
  const doctor = getDoctorByDepartment(slug);
  const rose = dept.accent === "rose";
  const secondary = dept.slug === "pediatric-surgery" ? img.motherChildren : img.eyeClinic;

  return (
    <>
      {/* ── Intro ─────────────────────────────────────────────────── */}
      <Section tone="white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                index="01"
                eyebrow="Overview"
                segments={[{ text: dept.headline, accent: false }]}
              />
              <Stagger className="mt-7 space-y-5 text-[1rem] leading-relaxed text-ink-600">
                {dept.description.map((para) => (
                  <Reveal key={para.slice(0, 24)} child variant="up">
                    <p>{para}</p>
                  </Reveal>
                ))}
              </Stagger>
            </div>

            <div className="lg:col-span-5">
              <MediaFrame
                image={secondary}
                ratio="aspect-4/5"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── Services ──────────────────────────────────────────────── */}
      <Section tone="light">
        <div className="container-page">
          <SectionHeading
            index="02"
            eyebrow={`${dept.shortName} services`}
            segments={[
              { text: "What we" },
              { text: "treat", accent: true },
              { text: "here" },
            ]}
            lead={`${dept.services.length} services, each with an unhurried consultation and written instructions to take home.`}
          />

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.06}>
            {dept.services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.name} child variant="up">
                  <TiltCard
                    className="h-full"
                    intensity={4}
                    glow={rose ? "rgb(214 104 140 / 0.14)" : "rgb(42 111 240 / 0.14)"}
                  >
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-ink-100 bg-white p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                      <span
                        aria-hidden="true"
                        className="absolute right-4 top-3 font-display text-[2.6rem] leading-none text-ink-100/90 transition-colors duration-500 group-hover:text-brand-100"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={cn(
                          "relative grid size-12 place-items-center rounded-2xl text-[1.3rem] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
                          rose
                            ? "bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white"
                            : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
                        )}
                      >
                        <Icon aria-hidden="true" />
                      </span>

                      <h3 className="relative mt-5 text-[1.02rem] font-bold leading-snug tracking-tight text-ink-950">
                        {service.name}
                      </h3>
                      <p className="relative mt-2.5 text-[0.88rem] leading-relaxed text-ink-600">
                        {service.description}
                      </p>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </Stagger>
        </div>
      </Section>

      {/* ── Doctor ────────────────────────────────────────────────── */}
      <Section tone="white">
        <div className="container-page">
          <SectionHeading
            index="03"
            eyebrow="Your specialist"
            segments={[
              { text: "Who you" },
              { text: "will see", accent: true },
            ]}
          />

          <Reveal variant="up" className="mt-9">
            <div className="overflow-hidden rounded-[var(--radius-xl2)] border border-ink-100 bg-white shadow-[var(--shadow-soft)]">
              <div className="grid lg:grid-cols-12">
                <div className="relative aspect-4/5 lg:col-span-4 lg:aspect-auto">
                  <Image
                    src={doctor.image}
                    alt={`Portrait of ${doctor.name}, ${doctor.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-7 lg:col-span-8 lg:p-10">
                  <p
                    className={cn(
                      "text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
                      rose ? "text-rose-600" : "text-brand-600",
                    )}
                  >
                    {dept.name}
                  </p>
                  <h3 className="mt-2 text-h2 font-bold tracking-tight text-ink-950">
                    {doctor.name}
                  </h3>
                  <p className="mt-2 text-[1rem] text-ink-600">{doctor.role}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-ink-50 px-3 py-1.5 text-[0.8rem] font-semibold text-ink-700">
                      {doctor.qualification}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1.5 text-[0.8rem] font-semibold",
                        rose ? "bg-rose-50 text-rose-700" : "bg-brand-50 text-brand-700",
                      )}
                    >
                      {doctor.experience} experience
                    </span>
                  </div>

                  <div className="mt-7 space-y-4 text-[0.96rem] leading-relaxed text-ink-600">
                    {doctor.bio.slice(0, 2).map((p) => (
                      <p key={p.slice(0, 20)}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-6 border-t border-ink-100 pt-7 sm:grid-cols-2">
                    <div>
                      <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                        <FiClock aria-hidden="true" /> Consulting hours
                      </p>
                      <ul className="mt-3 space-y-1.5 text-[0.89rem] text-ink-700">
                        {doctor.timings.map((t) => (
                          <li key={t.time}>
                            <span className="font-medium">{t.days}</span> · {t.time}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                        <FiGlobe aria-hidden="true" /> Languages
                      </p>
                      <p className="mt-3 text-[0.89rem] text-ink-700">
                        {doctor.languages.join(" · ")}
                      </p>
                      <Link
                        href={`/doctors#${doctor.slug}`}
                        className={cn(
                          "mt-4 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold transition-colors",
                          rose
                            ? "text-rose-700 hover:text-rose-800"
                            : "text-brand-700 hover:text-brand-800",
                        )}
                      >
                        Full profile
                        <FiArrowUpRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  {/* Consultation areas */}
                  <div className="mt-8 border-t border-ink-100 pt-7">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                      Common reasons to book
                    </p>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {doctor.consultationAreas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2.5 text-[0.89rem] text-ink-700"
                        >
                          <FiCheck
                            aria-hidden="true"
                            className={cn(
                              "mt-0.5 shrink-0",
                              rose ? "text-rose-500" : "text-brand-500",
                            )}
                          />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <BookAppointmentButton
                      department={dept.slug}
                      variant={rose ? "rose" : "primary"}
                      size="lg"
                      arrow
                    >
                      Book {dept.shortName} Appointment
                    </BookAppointmentButton>
                    <ButtonLink
                      href={links.whatsapp(
                        `Hello, I would like to book a ${dept.shortName} appointment at Yogeshwari Hospital.`,
                      )}
                      variant="whatsapp"
                      size="lg"
                      icon={<FaWhatsapp />}
                    >
                      WhatsApp
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Cross-link to the other department ────────────────────── */}
      <Section tone="light" spacing="sm">
        <div className="container-page">
          <Reveal variant="up">
            <Link
              href={
                dept.slug === "pediatric-surgery"
                  ? "/departments/eye-care"
                  : "/departments/pediatric-surgery"
              }
              className="group flex flex-col gap-4 rounded-[var(--radius-xl2)] border border-ink-100 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Also at Yogeshwari Hospital
                </p>
                <p className="mt-2 text-h3 font-bold tracking-tight text-ink-950">
                  {dept.slug === "pediatric-surgery"
                    ? "Eye Care & Ophthalmology"
                    : "Paediatrics"}
                </p>
                <p className="mt-1.5 text-[0.92rem] text-ink-600">
                  {dept.slug === "pediatric-surgery"
                    ? "Comprehensive eye examination, cataract and glaucoma screening with Dr. Manisha Nagargoje (Sanap)."
                    : "Newborn care, vaccination and child health check-ups with Dr. Ramdas D. Nagargoje."}
                </p>
              </div>
              <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-ink-950 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
                <FiArrowUpRight aria-hidden="true" className="text-xl" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── Sticky-ish contact strip ──────────────────────────────── */}
      <Section tone="white" spacing="sm">
        <div className="container-page">
          <div className="flex flex-col items-center gap-4 rounded-[var(--radius-xl2)] border border-ink-100 bg-linear-to-br from-brand-50 to-rose-50/60 p-8 text-center">
            <p className="text-h3 font-bold tracking-tight text-ink-950">
              Not sure if you need an appointment?
            </p>
            <p className="max-w-xl text-[0.96rem] text-ink-600">
              Call during OPD hours and reception will tell you whether this needs a
              visit, and how soon.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={links.tel} icon={<FiPhone />} size="lg">
                Call the hospital
              </ButtonLink>
              <BookAppointmentButton variant="secondary" size="lg" arrow>
                Book online
              </BookAppointmentButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
