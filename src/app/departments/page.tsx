import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqsGeneral } from "@/config/content";
import { siteConfig } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  medicalClinicSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: `Departments — Paediatric Surgery & Eye Care in ${siteConfig.city}`,
  description: `Two specialist departments at Yogeshwari Hospital, ${siteConfig.city}: paediatric surgery with Dr. Ramdas D. Nagargoje, M.Ch., and eye care with Dr. Manisha Nagargoje (Sanap), D.O.M.S.`,
  alternates: { canonical: "/departments" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Departments", href: "/departments" },
];

export default function DepartmentsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          medicalClinicSchema("pediatric-surgery"),
          medicalClinicSchema("eye-care"),
          faqSchema(faqsGeneral),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Departments"
        segments={[
          { text: "Two specialities," },
          { text: "one hospital", accent: true },
        ]}
        lead={`Paediatric surgery and eye care operate side by side in ${siteConfig.city} — so a family can see both specialists in a single visit rather than across two appointments in two buildings.`}
        crumbs={crumbs}
      />

      <DepartmentsSection />
      <DoctorsSection />
      <FaqSection faqs={faqsGeneral} index="04" tone="white" />
      <FinalCTA />
    </>
  );
}
