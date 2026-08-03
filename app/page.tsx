import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Meridian Physio & Recovery",
  medicalSpecialty: "Physiotherapy",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Koregaon Park",
    addressLocality: "Pune",
    addressRegion: "MH",
    addressCountry: "IN",
  },
  telephone: "+91-20-5551-2345",
  url: "https://meridianphysio.example.com",
  openingHours: "Mo-Sa 07:00-20:00",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <ProcessTimeline />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
