import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { PageHero } from "@/components/layout/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TiltCard } from "@/components/ui/TiltCard";
import { departments, faqsGeneral, surgicalServices } from "@/config/content";
import { img } from "@/config/images";
import { doctors, siteConfig } from "@/config/site";
import { breadcrumbSchema, faqSchema, graph, hospitalSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Services — Paediatric & Eye Care in ${siteConfig.city}`,
  description: `Full service list at Yogeshwari Hospital, ${siteConfig.city}: child consultation, newborn care, vaccination, growth monitoring, eye examination, cataract and glaucoma screening, and surgical consultation.`,
  alternates: { canonical: "/services" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

type Category = {
  id: string;
  index: string;
  eyebrow: string;
  segments: { text: string; accent?: boolean }[];
  lead: string;
  accent: "brand" | "rose";
  items: { name: string; description: string; icon: React.ComponentType }[];
  image: (typeof img)[keyof typeof img];
  href?: string;
  hrefLabel?: string;
  doctorName?: string;
};

export default function ServicesPage() {
  const pediatrics = departments.find((d) => d.slug === "pediatrics")!;
  const eyeCare = departments.find((d) => d.slug === "eye-care")!;

  const categories: Category[] = [
    {
      id: "pediatric-services",
      index: "01",
      eyebrow: "Paediatric services",
      segments: [{ text: "Child health," }, { text: "start to finish", accent: true }],
      lead: pediatrics.intro,
      accent: "brand",
      items: pediatrics.services,
      image: img.newborn,
      href: pediatrics.href,
      hrefLabel: "Paediatrics department",
      doctorName: doctors[0].name,
    },
    {
      id: "eye-care-services",
      index: "02",
      eyebrow: "Eye care services",
      segments: [{ text: "Vision, checked" }, { text: "properly", accent: true }],
      lead: eyeCare.intro,
      accent: "rose",
      items: eyeCare.services,
      image: img.eyeExam,
      href: eyeCare.href,
      hrefLabel: "Eye care department",
      doctorName: doctors[1].name,
    },
    {
      id: "surgical-consultations",
      index: "03",
      eyebrow: "Surgical consultations",
      segments: [{ text: "An honest opinion" }, { text: "on surgery", accent: true }],
      lead: "Assessment, planning and follow-up for both departments — including the cases where the right advice is to wait rather than operate.",
      accent: "brand",
      items: surgicalServices,
      image: img.operatingTheatre,
    },
  ];

  return (
    <>
      <JsonLd
        data={graph(hospitalSchema(), faqSchema(faqsGeneral), breadcrumbSchema(crumbs))}
      />

      <PageHero
        eyebrow="Services"
        segments={[
          { text: "Twenty-two services," },
          { text: "two specialists", accent: true },
        ]}
        lead={`Everything Yogeshwari Hospital offers across paediatrics, eye care and surgical consultation in ${siteConfig.city}.`}
        crumbs={crumbs}
      >
        {/* In-page jump nav — doubles as internal linking */}
        <nav aria-label="Service categories" className="mt-8">
          <ul className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-[0.86rem] font-medium text-ink-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[0.8rem] text-ink-300"
                  >
                    {cat.index}
                  </span>
                  {cat.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {categories.map((cat, i) => {
        const rose = cat.accent === "rose";
        return (
          <Section
            key={cat.id}
            id={cat.id}
            tone={i % 2 === 0 ? "white" : "light"}
            className="scroll-mt-24"
          >
            <div className="container-page">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <SectionHeading
                    index={cat.index}
                    eyebrow={cat.eyebrow}
                    segments={cat.segments}
                    lead={cat.lead}
                  />

                  {cat.doctorName && (
                    <Reveal variant="up" delay={0.1}>
                      <p className="mt-6 text-[0.88rem] text-ink-500">
                        Led by{" "}
                        <span className="font-semibold text-ink-800">
                          {cat.doctorName}
                        </span>
                      </p>
                    </Reveal>
                  )}

                  <Reveal variant="up" delay={0.14}>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <ButtonLink
                        href="/appointment"
                        variant={rose ? "rose" : "primary"}
                        arrow
                      >
                        Book appointment
                      </ButtonLink>
                      {cat.href && (
                        <Link
                          href={cat.href}
                          className={cn(
                            "inline-flex items-center gap-1.5 self-center text-[0.9rem] font-semibold transition-colors",
                            rose
                              ? "text-rose-700 hover:text-rose-800"
                              : "text-brand-700 hover:text-brand-800",
                          )}
                        >
                          {cat.hrefLabel}
                          <FiArrowUpRight aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </Reveal>

                  <div className="mt-9 hidden lg:block">
                    <MediaFrame
                      image={cat.image}
                      ratio="aspect-4/3"
                      sizes="(max-width: 1024px) 100vw, 34vw"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <Stagger className="grid gap-4 sm:grid-cols-2" amount={0.06}>
                    {cat.items.map((service, idx) => {
                      const Icon = service.icon;
                      return (
                        <Reveal key={service.name} child variant="up">
                          <TiltCard
                            className="h-full"
                            intensity={4}
                            glow={
                              rose ? "rgb(214 104 140 / 0.13)" : "rgb(42 111 240 / 0.13)"
                            }
                          >
                            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-ink-100 bg-white p-6 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                              <div className="flex items-start justify-between gap-4">
                                <span
                                  className={cn(
                                    "grid size-11 shrink-0 place-items-center rounded-xl text-[1.2rem] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110",
                                    rose
                                      ? "bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white"
                                      : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white",
                                  )}
                                >
                                  <Icon aria-hidden="true" />
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="font-display text-[1.6rem] leading-none text-ink-100 transition-colors duration-500 group-hover:text-ink-200"
                                >
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <h3 className="mt-5 text-[1rem] font-bold leading-snug tracking-tight text-ink-950">
                                {service.name}
                              </h3>
                              <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-600">
                                {service.description}
                              </p>
                            </article>
                          </TiltCard>
                        </Reveal>
                      );
                    })}
                  </Stagger>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      <FaqSection faqs={faqsGeneral} index="04" tone="white" />
      <FinalCTA />
    </>
  );
}
