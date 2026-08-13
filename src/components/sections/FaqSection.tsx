"use client";

import { FiMessageCircle, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import type { Faq } from "@/config/content";
import { links } from "@/config/site";
import { ButtonRow } from "@/components/ui/ButtonRow";

export function FaqSection({
  faqs,
  index = "09",
  eyebrow = "Questions",
  segments = [{ text: "Before you" }, { text: "come in", accent: true }],
  lead = "The questions we are asked most often. If yours is not here, WhatsApp is the fastest way to get an answer.",
  tone = "white",
}: {
  faqs: Faq[];
  index?: string;
  eyebrow?: string;
  segments?: { text: string; accent?: boolean }[];
  lead?: string;
  tone?: "white" | "light";
}) {
  return (
    <Section tone={tone}>
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={index}
              eyebrow={eyebrow}
              segments={segments}
              lead={lead}
            />

            <Reveal variant="up" delay={0.12}>
              <div className="mt-9 rounded-[var(--radius-xl2)] border border-ink-100 bg-white p-6 shadow-[var(--shadow-soft)]">
                <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-brand-600 to-rose-500 text-lg text-white">
                  <FiMessageCircle aria-hidden="true" />
                </span>
                <p className="mt-4 text-[1rem] font-bold tracking-tight text-ink-950">
                  Still not sure?
                </p>
                <p className="mt-1.5 text-[0.89rem] leading-relaxed text-ink-600">
                  Describe the problem in a message and we will tell you whether it
                  needs an appointment — and with which department.
                </p>
                <ButtonRow className="mt-5 gap-2.5">
                  <ButtonLink
                    href={links.whatsapp(
                      "Hello, I have a question before booking an appointment.",
                    )}
                    variant="whatsapp"
                    size="sm"
                    icon={<FaWhatsapp />}
                    magnetic={false}
                    fullWidth
                  >
                    Ask on WhatsApp
                  </ButtonLink>
                  <ButtonLink
                    href={links.tel}
                    variant="secondary"
                    size="sm"
                    icon={<FiPhone />}
                    magnetic={false}
                    fullWidth
                  >
                    Call
                  </ButtonLink>
                </ButtonRow>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal variant="up">
              <Accordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
