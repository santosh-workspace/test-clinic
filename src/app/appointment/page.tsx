import type { Metadata } from "next";
import { FiClock, FiFileText, FiPhone, FiUsers } from "react-icons/fi";
import { PageHero } from "@/components/layout/PageHero";
import { AppointmentBooking } from "@/components/sections/AppointmentBooking";
import { FaqSection } from "@/components/sections/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { faqsGeneral } from "@/config/content";
import { siteConfig } from "@/config/site";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  hospitalSchema,
  medicalClinicSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: `Book an Appointment — Paediatrics & Eye Care, ${siteConfig.city}`,
  description: `Book an appointment at Yogeshwari Hospital, ${siteConfig.city}. Choose paediatrics with Dr. Ramdash D. Nagargoje or eye care with Dr. Manisha Nagargoje (Sanap) and pick a time online.`,
  alternates: { canonical: "/appointment" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Book Appointment", href: "/appointment" },
];

const prep = [
  {
    icon: FiFileText,
    title: "Bring previous records",
    body: "Prescriptions, test reports and discharge summaries. For children, the immunisation card. For eye patients, your current spectacles and last prescription.",
  },
  {
    icon: FiClock,
    title: "Arrive ten minutes early",
    body: "Enough time for registration without eating into your consultation. If you are running late, call — the slot can usually be shifted rather than lost.",
  },
  {
    icon: FiUsers,
    title: "Book both departments together",
    body: "Mention it when booking and reception will sequence the two slots back to back, so one trip covers the whole family.",
  },
  {
    icon: FiPhone,
    title: "Dilating drops need a driver",
    body: "A full eye examination usually involves dilation, which blurs vision for four to six hours. Arrange for someone else to drive you home.",
  },
];

export default function AppointmentPage() {
  return (
    <>
      <JsonLd
        data={graph(
          hospitalSchema(),
          medicalClinicSchema("pediatrics"),
          medicalClinicSchema("eye-care"),
          faqSchema(faqsGeneral),
          breadcrumbSchema(crumbs),
        )}
      />

      <PageHero
        eyebrow="Book appointment"
        segments={[
          { text: "Two steps." },
          { text: "One minute.", accent: true },
        ]}
        lead="Choose the department you need, then pick a time from that specialist's calendar. Prefer to talk to someone? Call or WhatsApp instead — both are on this page."
        crumbs={crumbs}
      />

      <AppointmentBooking />

      {/* Before you come in */}
      <Section tone="white" spacing="md">
        <div className="container-page">
          <Reveal variant="up">
            <h2 className="text-h3 font-bold tracking-tight text-ink-950">
              Before you come in
            </h2>
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.07}>
            {prep.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} child variant="up">
                  <div className="flex h-full flex-col rounded-[1.4rem] border border-ink-100 bg-white p-6">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-[1.15rem] text-brand-600">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[0.98rem] font-bold leading-snug tracking-tight text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-600">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </Stagger>
        </div>
      </Section>

      <FaqSection faqs={faqsGeneral} index="03" tone="light" />
    </>
  );
}
