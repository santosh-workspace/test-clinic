"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { departments } from "@/config/content";
import { doctors, links, siteConfig } from "@/config/site";
import { BookAppointmentButton } from "@/components/booking/BookAppointmentButton";

/**
 * Closing conversion block. Three routes out — book, call, WhatsApp — plus a
 * direct shortcut into each department's booking flow, because a visitor who
 * has read this far usually already knows which doctor they need.
 */
export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-950 py-14 text-white md:py-20">
      {/* Animated aurora background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduced ? undefined : { x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-brand-600/28 blur-[130px]"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-rose-500/22 blur-[130px]"
        />
        {/* Fine grid, barely visible — adds structure to the gradient */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 72%)",
          }}
        />
      </div>

      <div className="container-page relative text-center">
        <Reveal variant="up">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-rose-300 backdrop-blur">
            <span className="relative flex size-2">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-rose-400"
                style={
                  reduced
                    ? undefined
                    : { animation: "pulse-ring 2.4s var(--ease-smooth) infinite" }
                }
              />
              <span className="size-2 rounded-full bg-rose-400" />
            </span>
            Accepting new patients
          </p>
        </Reveal>

        <SplitHeading
          segments={[
            { text: "Book a" },
            { text: "consultation", accent: true },
            { text: "today" },
          ]}
          className="mx-auto mt-7 max-w-4xl text-h1 font-bold text-white"
          accentClassName="font-display italic bg-linear-to-r from-rose-200 to-brand-200 bg-clip-text text-transparent"
        />

        <Reveal variant="up" delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-white/65">
            Choose a department and pick a time that works. If you would rather just
            ask a question first, WhatsApp is usually the quickest way to reach us.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookAppointmentButton size="lg" arrow>
              Book Appointment
            </BookAppointmentButton>
            <ButtonLink
              href={links.whatsapp()}
              variant="whatsapp"
              size="lg"
              icon={<FaWhatsapp />}
            >
              WhatsApp us
            </ButtonLink>
            <ButtonLink href={links.tel} variant="onDark" size="lg" icon={<FiPhone />}>
              {siteConfig.contact.phoneDisplay}
            </ButtonLink>
          </div>
        </Reveal>

        {/* Direct department shortcuts */}
        <Reveal variant="up" delay={0.28}>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {/*
              Plain links rather than <ButtonLink>: these are card-shaped with
              a two-line label, which the button's fixed height and
              whitespace-nowrap base would fight.
            */}
            {departments.map((dept) => {
              const doc = doctors.find((d) => d.department === dept.slug)!;
              const Icon = dept.icon;
              return (
                <Link
                  key={dept.slug}
                  href={`/appointment#${dept.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-left backdrop-blur-md transition-all duration-400 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/15"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/12 text-lg text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-[0.95rem] font-bold text-white">
                      {dept.shortName}
                    </span>
                    <span className="truncate text-[0.78rem] text-white/55">
                      {doc.name}
                    </span>
                  </span>
                  <FiArrowRight
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-white/50 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
