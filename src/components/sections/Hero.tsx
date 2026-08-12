"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FiArrowDown, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Parallax } from "@/components/ui/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { trustBadges } from "@/config/content";
import { img } from "@/config/images";
import { doctors, links, siteConfig } from "@/config/site";
import { EASE } from "@/lib/motion";

/**
 * Editorial hero.
 *
 * The composition is asymmetric on purpose — an oversized headline against a
 * tall image portal, rather than the centred-text-over-full-bleed-photo that
 * every clinic template ships with.
 *
 * Performance notes:
 *  - The hero image is the LCP element: `priority` + `fetchPriority="high"`,
 *    static import for intrinsic sizing, and a blur placeholder.
 *  - The headline animates on mount (not on scroll) so it never delays paint.
 *  - Floating chips are transform-only, so they stay off the main thread.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  const headline = ["Specialist care", "for small eyes", "and small people."];

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-16 lg:pt-20 lg:pb-24">
      {/* Ambient field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-brand-100/60 blur-[130px]" />
        <div className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-teal-100/55 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent to-sand-50" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── Copy ────────────────────────────────────────────────── */}
          {/* 7/5 rather than 6/6: at 1440px a 6-col column is ~570px, which
              forces the third CTA onto its own line. */}
          <div className="lg:col-span-7">
            <motion.div data-reveal {...rise(0.05)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-200 bg-white/80 py-1.5 pl-1.5 pr-4 text-[0.76rem] font-medium text-ink-600 shadow-[var(--shadow-soft)] backdrop-blur">
                <span className="relative flex size-6 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-teal-400/25"
                    style={
                      reduced
                        ? undefined
                        : { animation: "pulse-ring 2.4s var(--ease-smooth) infinite" }
                    }
                  />
                  <span className="size-2 rounded-full bg-teal-500" />
                </span>
                {siteConfig.tagline} · {siteConfig.city}
              </span>
            </motion.div>

            <h1 className="mt-7 text-display font-bold tracking-tight text-ink-950">
              {headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    data-reveal
                    className="inline-block"
                    {...(reduced
                      ? {}
                      : {
                          initial: { y: "105%" },
                          animate: { y: "0%" },
                          transition: { duration: 1, delay: 0.12 + i * 0.1, ease: EASE },
                        })}
                  >
                    {i === 1 ? (
                      <>
                        for{" "}
                        <span className="font-display font-normal italic text-gradient">
                          small eyes
                        </span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              data-reveal {...rise(0.45)}
              className="mt-7 max-w-xl text-lead text-ink-600"
            >
              Two specialists, one hospital. A paediatrician who follows your child from
              their first examination onward, and an eye surgeon who finds what routine
              vision checks miss — both in {siteConfig.city}.
            </motion.p>

            {/* CTAs — Book is primary, Call and WhatsApp equal-weight beside it */}
            <motion.div
              data-reveal {...rise(0.58)}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <ButtonLink href="/appointment" size="lg" arrow>
                Book Appointment
              </ButtonLink>
              <ButtonLink
                href={links.tel}
                variant="secondary"
                size="lg"
                icon={<FiPhone />}
              >
                Call Now
              </ButtonLink>
              <ButtonLink
                href={links.whatsapp()}
                variant="secondary"
                size="lg"
                icon={<FaWhatsapp className="text-[#1DA851]" />}
              >
                WhatsApp
              </ButtonLink>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              data-reveal {...rise(0.72)}
              className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100"
            >
              {trustBadges.map((badge) => (
                <li key={badge.label} className="bg-white px-4 py-4 text-center sm:text-left">
                  <p className="text-[0.92rem] font-bold tracking-tight text-ink-950">
                    {badge.label}
                  </p>
                  <p className="mt-0.5 text-[0.74rem] leading-snug text-ink-500">
                    {badge.detail}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Image portal ────────────────────────────────────────── */}
          <div className="relative lg:col-span-5">
            <motion.div
              data-reveal
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, clipPath: "inset(12% 12% 12% 12% round 2rem)" },
                    animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 2rem)" },
                    transition: { duration: 1.3, delay: 0.2, ease: EASE },
                  })}
              className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-xl2)] bg-ink-100 shadow-[var(--shadow-lift)] sm:aspect-3/2 lg:aspect-4/5"
            >
              <Parallax distance={reduced ? 0 : 56} className="absolute inset-0 scale-110">
                <Image
                  src={img.heroHospital.src}
                  alt={img.heroHospital.alt}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </Parallax>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink-950/55 via-ink-950/5 to-transparent"
              />

              {/* Floating specialist chips */}
              <div className="absolute inset-x-4 bottom-4 space-y-2.5 sm:inset-x-5 sm:bottom-5">
                {doctors.map((doc, i) => (
                  <motion.div
                    key={doc.slug}
                    {...(reduced
                      ? {}
                      : {
                          initial: { opacity: 0, y: 18 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.8, delay: 0.85 + i * 0.13, ease: EASE },
                        })}
                    className="glass flex items-center gap-3 rounded-2xl p-2.5 pr-4 shadow-[0_10px_40px_-12px_rgb(4_18_30/0.35)]"
                  >
                    <Image
                      src={doc.image}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[0.86rem] font-bold leading-tight tracking-tight text-ink-950">
                        {doc.name}
                      </p>
                      <p className="truncate text-[0.74rem] text-ink-600">{doc.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating stat card — desktop only, decorative supporting detail */}
            <motion.div
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.8, delay: 1.05, ease: EASE },
                  })}
              className="absolute -left-6 top-10 hidden xl:block"
            >
              <div className="animate-float rounded-2xl border border-ink-100 bg-white p-4 shadow-[var(--shadow-lift)]">
                <p className="font-display text-3xl leading-none text-gradient">2</p>
                <p className="mt-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Specialities
                  <br />
                  One roof
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 1.3, duration: 0.8 },
              })}
          aria-hidden="true"
          className="mt-14 hidden items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-ink-400 lg:flex"
        >
          <FiArrowDown className="animate-float text-brand-500" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
