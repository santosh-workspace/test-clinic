"use client";

import { ServiceCard } from "@/components/sections/ServiceCard";
import { Stagger } from "@/components/ui/Reveal";
import { departments, emergencyServices } from "@/config/content";

/**
 * Grid of service cards for one category.
 *
 * Takes a plain string id and looks the services up itself rather than
 * receiving them as props: each service carries an `icon`, which is a React
 * component *function*, and functions cannot cross the server→client boundary.
 * The services page is a server component, so resolving the list here — inside
 * the client bundle — is what keeps the props serialisable.
 */
export type ServiceCategoryId = "pediatric-surgery" | "eye-care" | "emergency";

export function ServiceGrid({
  category,
  className = "grid gap-4 sm:grid-cols-2",
}: {
  category: ServiceCategoryId;
  className?: string;
}) {
  const dept = departments.find((d) => d.slug === category);
  const items = dept ? dept.services : emergencyServices;
  const accent: "brand" | "rose" = dept ? dept.accent : "rose";

  return (
    <Stagger className={className} amount={0.07}>
      {items.map((service) => (
        <ServiceCard
          key={service.name}
          name={service.name}
          description={service.description}
          icon={service.icon}
          image={service.image}
          accent={accent}
        />
      ))}
    </Stagger>
  );
}
