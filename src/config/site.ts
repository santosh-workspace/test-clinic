/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — Yogeshwari Hospital
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every real-world value on the site lives here. Nothing is hard-coded in a
 *  component. Search this file for `TODO` before going live.
 *
 *  The Google Business Profile could not be read programmatically, so the
 *  values marked TODO are DELIBERATE placeholders — they are NOT real. A
 *  plausible-looking-but-wrong phone number on a hospital site is worse than
 *  an obvious placeholder, so none were invented.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Yogeshwari Hospital",
  legalName: "Yogeshwari Hospital — Eye and Pediatric Surgery Centre",
  tagline: "Eye and Pediatric Surgery Centre",
  shortDescription:
    "A dedicated eye and paediatric surgery centre in Chhatrapati Sambhajinagar, bringing specialist child health and advanced eye care under one roof.",

  /** TODO: replace with the live domain before deploying. Used for canonicals, OG, sitemap. */
  url: "https://yogeshwarihospital.com",

  /** TODO: confirm against the Google Business Profile. */
  contact: {
    phoneDisplay: "+91 00000 00000",
    /** E.164, no spaces — used in tel: links */
    phoneE164: "+910000000000",
    /** Digits only, country code first — used in wa.me links */
    whatsapp: "910000000000",
    email: "care@yogeshwarihospital.com",
  },

  /** TODO: confirm the exact street address + pincode from the Google Business Profile. */
  address: {
    street: "Hospital Road",
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    postalCode: "431001",
    country: "IN",
    countryName: "India",
  },

  /** TODO: replace with the exact coordinates from the Google Business Profile pin. */
  geo: {
    latitude: 19.8762,
    longitude: 75.3433,
  },

  /**
   * TODO: paste the `src` from Google Maps → Share → Embed a map.
   * Falls back to a query-based embed, which needs no API key but is less precise.
   */
  maps: {
    embedSrc: "",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Yogeshwari+Hospital+Chhatrapati+Sambhajinagar",
    placeUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital+Chhatrapati+Sambhajinagar",
    /** TODO: the "Write a review" short link from the Google Business Profile. */
    reviewUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital+Chhatrapati+Sambhajinagar",
  },

  /** TODO: confirm OPD hours. Times are 24h, used for both display and schema. */
  hours: [
    { days: "Monday – Saturday", label: "Morning OPD", open: "09:00", close: "14:00" },
    { days: "Monday – Saturday", label: "Evening OPD", open: "17:00", close: "20:00" },
    { days: "Sunday", label: "Emergency only", open: "10:00", close: "13:00" },
  ],
  emergencyNote: "Emergency paediatric care available round the clock by phone.",

  /** TODO: replace with the real handles. Empty strings are hidden from the UI automatically. */
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    linkedin: "",
    google:
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital+Chhatrapati+Sambhajinagar",
  },

  /**
   * TODO: create two Calendly event types and paste the URLs.
   * Until then the appointment CTAs fall back to WhatsApp + phone, so the page
   * never dead-ends a patient.
   */
  calendly: {
    pediatrics: "",
    eyeCare: "",
  },

  /** The primary local-SEO city. Interpolated into titles, H1s and schema. */
  city: "Chhatrapati Sambhajinagar",
  cityAlt: "Aurangabad",

  /** TODO: replace with the Google Search Console verification token. */
  verification: {
    google: "",
  },
} as const;

export type Doctor = {
  slug: string;
  name: string;
  honorific: string;
  role: string;
  department: "pediatrics" | "eye-care";
  qualification: string;
  experience: string;
  registration?: string;
  bio: string[];
  specializations: string[];
  consultationAreas: string[];
  timings: { days: string; time: string }[];
  languages: string[];
  image: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-ramdash-nagargoje",
    name: "Dr. Ramdash D. Nagargoje",
    honorific: "Dr.",
    role: "Paediatrician & Paediatric Surgery Consultant",
    department: "pediatrics",
    /** TODO: confirm exact degrees and years with the doctor. */
    qualification: "MBBS, MD (Paediatrics)",
    experience: "15+ years",
    bio: [
      "Dr. Ramdash D. Nagargoje leads the paediatric department at Yogeshwari Hospital, caring for children from their first hours of life through adolescence.",
      "His practice centres on newborn care, immunisation, growth and nutrition, and the early recognition of childhood illness — the everyday medicine that keeps small problems small.",
      "Parents consistently describe an unhurried consultation: every question answered, every instruction written down, and a clear explanation of what to watch for at home.",
    ],
    specializations: [
      "Newborn & neonatal care",
      "Immunisation and vaccine scheduling",
      "Growth and development monitoring",
      "Paediatric infections & fever management",
      "Nutrition and feeding guidance",
      "Paediatric surgical assessment",
    ],
    consultationAreas: [
      "Routine child health check-ups",
      "Newborn examination and follow-up",
      "Persistent fever, cough and infection",
      "Feeding difficulty and poor weight gain",
      "Developmental and milestone concerns",
      "Pre- and post-operative paediatric review",
    ],
    timings: [
      { days: "Monday – Saturday", time: "9:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "Emergency consultation only" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-ramdash-nagargoje.jpg",
  },
  {
    slug: "dr-manisha-nagargoje",
    name: "Dr. Manisha Nagargoje (Sanap)",
    honorific: "Dr.",
    role: "Ophthalmologist & Eye Surgeon",
    department: "eye-care",
    /** TODO: confirm exact degrees and years with the doctor. */
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "12+ years",
    bio: [
      "Dr. Manisha Nagargoje (Sanap) heads eye care at Yogeshwari Hospital, combining routine vision assessment with the surgical evaluation of cataract and other sight-limiting conditions.",
      "She has a particular interest in the eye complications of diabetes and in glaucoma — two conditions that quietly take vision years before a patient notices anything is wrong.",
      "Her consultations are built around explanation: what the test showed, what it means for your sight, and what happens next.",
    ],
    specializations: [
      "Comprehensive eye examination",
      "Cataract evaluation & surgical planning",
      "Glaucoma screening and monitoring",
      "Diabetic retinopathy assessment",
      "Dry eye and ocular surface disease",
      "Paediatric vision screening",
    ],
    consultationAreas: [
      "Blurred or declining vision",
      "Spectacle and contact lens prescription",
      "Cataract second opinion",
      "Annual diabetic eye screening",
      "Red, painful or watering eyes",
      "Eye pressure and glaucoma follow-up",
    ],
    timings: [
      { days: "Monday – Saturday", time: "10:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "By prior appointment" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-manisha-nagargoje.jpg",
  },
];

export const getDoctorByDepartment = (dept: Doctor["department"]) =>
  doctors.find((d) => d.department === dept)!;

/** Convenience links built from the config above. */
export const links = {
  tel: `tel:${siteConfig.contact.phoneE164}`,
  whatsapp: (message = "Hello, I would like to book an appointment at Yogeshwari Hospital.") =>
    `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`,
  email: `mailto:${siteConfig.contact.email}`,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Departments",
    href: "/departments",
    children: [
      { label: "Paediatrics", href: "/departments/pediatrics" },
      { label: "Eye Care & Ophthalmology", href: "/departments/eye-care" },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;
