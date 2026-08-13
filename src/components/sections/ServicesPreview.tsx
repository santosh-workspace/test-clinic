"use client";

import { ServiceCard } from "@/components/sections/ServiceCard";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { departments, emergencyServices } from "@/config/content";

/**
 * Homepage services preview.
 *
 * Renders the same <ServiceCard> as the department pages and /services, so a
 * service looks identical wherever it appears — same photograph, same banner,
 * same hover. Previously this section had its own bespoke card markup and
 * quietly drifted out of step once the cards gained imagery.
 *
 * Cards here additionally carry a department label and link through to that
 * department, which the in-page grids do not need.
 */
export function ServicesPreview() {
  const items = departments.flatMap((dept) =>
    dept.services.slice(0, 6).map((service) => ({ ...service, dept })),
  );

  // Alternate between departments so the colour rhythm is even across the grid.
  const eye = items.filter((i) => i.dept.slug === "eye-care");
  const interleaved = items
    .filter((i) => i.dept.slug === "pediatric-surgery")
    .flatMap((p, idx) => (eye[idx] ? [p, eye[idx]] : [p]));

  const total =
    departments.reduce((n, d) => n + d.services.length, 0) + emergencyServices.length;

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
            lead={`From a newborn's first operation to a cataract opinion. ${total} services across two departments, plus emergency and day-care procedures.`}
            className="lg:max-w-2xl"
          />
          <Reveal variant="up">
            <ButtonLink href="/services" variant="secondary" arrow className="shrink-0">
              All services
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          amount={0.055}
        >
          {interleaved.map((item) => (
            <ServiceCard
              key={`${item.dept.slug}-${item.name}`}
              name={item.name}
              description={item.description}
              icon={item.icon}
              image={item.image}
              accent={item.dept.accent}
              href={item.dept.href}
              meta={item.dept.shortName}
            />
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
