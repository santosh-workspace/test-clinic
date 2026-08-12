"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { differentiators, stats } from "@/config/content";

/**
 * Timeline-style differentiators against a dark ground, with animated
 * counters underneath. The vertical rule and numbered nodes give the section
 * an ordered, editorial rhythm rather than another four-card grid.
 */
export function WhyChooseUs() {
  return (
    <Section id="why-us" tone="ink" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-brand-600/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-rose-500/14 blur-[120px]"
      />

      <div className="container-page relative">
        <SectionHeading
          index="05"
          eyebrow="Why choose us"
          invert
          segments={[
            { text: "What actually" },
            { text: "changes", accent: true },
            { text: "your visit" },
          ]}
          lead="Not the equipment list. The four things patients tell us make the difference between a consultation that helps and one that just happens."
        />

        {/* Timeline */}
        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute left-[1.4rem] top-2 hidden h-[calc(100%-2rem)] w-px bg-linear-to-b from-rose-400/60 via-brand-400/30 to-transparent md:block"
          />

          <Stagger className="space-y-10 md:space-y-12" amount={0.13}>
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} child variant="up">
                  <div className="group grid gap-5 md:grid-cols-[3rem_1fr] md:gap-8">
                    {/* Node */}
                    <div className="relative flex md:justify-center">
                      <span className="relative z-10 grid size-12 place-items-center rounded-2xl border border-white/15 bg-ink-900 text-[1.25rem] text-rose-300 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:border-rose-300/60 group-hover:bg-rose-500 group-hover:text-white">
                        <Icon aria-hidden="true" />
                      </span>
                    </div>

                    <div className="md:grid md:grid-cols-12 md:items-baseline md:gap-8">
                      <div className="md:col-span-5">
                        <span
                          aria-hidden="true"
                          className="font-display text-[0.9rem] text-white/25"
                        >
                          0{i + 1}
                        </span>
                        <h3 className="mt-1 text-h3 font-bold tracking-tight text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-white/60 md:col-span-7 md:mt-0">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </Stagger>
        </div>

        {/* Counters */}
        <Stagger
          className="mt-18 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl2)] border border-white/10 bg-white/10 lg:grid-cols-4"
          amount={0.09}
        >
          {stats.map((stat) => (
            <Reveal key={stat.label} child variant="up">
              <div className="h-full bg-ink-950 px-5 py-8 text-center md:px-6 md:py-10">
                <p className="font-display text-[2.6rem] leading-none text-transparent md:text-[3.2rem]">
                  <span className="bg-linear-to-br from-white via-rose-200 to-brand-300 bg-clip-text">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                </p>
                <p className="mx-auto mt-3 max-w-[11rem] text-[0.8rem] leading-snug text-white/55">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
