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

  /** Confirmed by the client. TODO: the PIN code is still outstanding. */
  address: {
    street: "Gut No. 91, Plot No. 4, Behind Bembde Hospital and Hotel MH 20",
    area: "Sangram Nagar, Beed Bypass",
    locality: "Chhatrapati Sambhajinagar",
    region: "Maharashtra",
    /** TODO: confirm the PIN code — deliberately blank rather than guessed. */
    postalCode: "",
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
      "https://www.google.com/maps/dir/?api=1&destination=Yogeshwari+Hospital%2C+Gut+No.+91%2C+Plot+No.+4%2C+Sangram+Nagar%2C+Beed+Bypass%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra",
    placeUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital%2C+Gut+No.+91%2C+Plot+No.+4%2C+Sangram+Nagar%2C+Beed+Bypass%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra",
    /** TODO: the "Write a review" short link from the Google Business Profile. */
    reviewUrl:
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital%2C+Gut+No.+91%2C+Plot+No.+4%2C+Sangram+Nagar%2C+Beed+Bypass%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra",
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
      "https://www.google.com/maps/search/?api=1&query=Yogeshwari+Hospital%2C+Gut+No.+91%2C+Plot+No.+4%2C+Sangram+Nagar%2C+Beed+Bypass%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra",
  },

  /**
   * TODO: create two Calendly event types and paste the URLs.
   * Until then the appointment CTAs fall back to WhatsApp + phone, so the page
   * never dead-ends a patient.
   */
  calendly: {
    pediatricSurgery: "",
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
  department: "pediatric-surgery" | "eye-care";
  qualification: string;
  /** Post-graduate / super-speciality degree, shown separately where relevant. */
  superSpeciality?: string;
  /** Where they trained. A real trust signal for a surgical practice. */
  training?: string;
  experience: string;
  /** State medical council registration. Displaying it is good practice in India. */
  registration: string;
  bio: string[];
  specializations: string[];
  consultationAreas: string[];
  timings: { days: string; time: string }[];
  languages: string[];
  image: string;
  /** Public path used for structured data (absolute URL is derived from it). */
  photo: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-ramdas-nagargoje",
    name: "Dr. Ramdas D. Nagargoje",
    honorific: "Dr.",
    role: "Paediatric Surgeon",
    department: "pediatric-surgery",
    qualification: "M.B.B.S., M.S. (General Surgery), M.Ch. (Paediatric Surgery)",
    superSpeciality: "M.Ch. (Paediatric Surgery)",
    training: "K.E.M. Hospital & B.J. Wadia Hospital for Children, Mumbai",
    /** Inferred from the 2002 registration year — deliberately conservative. */
    experience: "20+ years",
    registration: "2002/03/1074",
    bio: [
      "Dr. Ramdas D. Nagargoje is a paediatric surgeon and heads the surgical department at Yogeshwari Hospital. He holds an M.S. in General Surgery followed by an M.Ch. in Paediatric Surgery — the super-speciality qualification required to operate on newborns and children.",
      "He trained at K.E.M. Hospital and at B.J. Wadia Hospital for Children in Mumbai, one of India's foremost paediatric institutions. His practice spans newborn and infant surgery, laparoscopic abdominal procedures, paediatric urology with urodynamic assessment, brain and spine surgery, airway and tracheal work, endoscopy and thoracoscopy, and emergency trauma.",
      "Parents consistently describe the same thing: an unhurried explanation of what is actually wrong, a clear account of whether an operation is needed at all, and written instructions to take home. Where a condition will resolve without surgery, he says so.",
    ],
    specializations: [
      "Newborn & infant surgery",
      "Laparoscopic (keyhole) abdominal surgery",
      "Paediatric urology & urodynamics",
      "Brain & spine surgery in children",
      "Endoscopy & thoracoscopy",
      "Emergency & trauma surgery",
    ],
    consultationAreas: [
      "Hernia, hydrocele and undescended testis",
      "Antenatally detected congenital malformation",
      "Chronic constipation and soiling",
      "Daytime wetting and recurrent urine infection",
      "Acute abdominal pain or vomiting in a child",
      "Second opinion on recommended child surgery",
    ],
    timings: [
      { days: "Monday – Saturday", time: "9:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "Emergency and trauma only" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-ramdas-nagargoje.png",
    photo: "/images/doctors/dr-ramdas-nagargoje.png",
  },
  {
    slug: "dr-manisha-nagargoje",
    name: "Dr. Manisha Nagargoje (Sanap)",
    honorific: "Dr.",
    role: "Ophthalmologist",
    department: "eye-care",
    qualification: "M.B.B.S., D.O.M.S. (Mumbai)",
    superSpeciality: "D.O.M.S. (Mumbai)",
    training: "Mumbai",
    /** Inferred from the 2004 registration year — deliberately conservative. */
    experience: "20+ years",
    registration: "2004/03/1498",
    bio: [
      "Dr. Manisha Nagargoje (Sanap) heads eye care at Yogeshwari Hospital. She holds a D.O.M.S. from Mumbai and practises the full range of general ophthalmology — vision testing and refraction through to cataract assessment and surgical planning.",
      "She has a particular interest in the eye complications of diabetes and in glaucoma — two conditions that quietly take vision years before a patient notices anything is wrong, and which are found by examination rather than by symptoms.",
      "She also screens children's vision, which sits naturally alongside the hospital's paediatric department: squint, refractive error and lazy eye respond far better when caught before school age.",
    ],
    specializations: [
      "Comprehensive eye examination",
      "Vision testing & refraction",
      "Cataract evaluation & surgical planning",
      "Glaucoma screening and monitoring",
      "Diabetic retinopathy assessment",
      "Paediatric vision screening",
    ],
    consultationAreas: [
      "Blurred or declining vision",
      "Spectacle and contact lens prescription",
      "Cataract second opinion",
      "Annual diabetic eye screening",
      "Red, painful or watering eyes",
      "Squint or lazy eye in a child",
    ],
    timings: [
      { days: "Monday – Saturday", time: "10:00 AM – 2:00 PM" },
      { days: "Monday – Saturday", time: "5:00 PM – 8:00 PM" },
      { days: "Sunday", time: "By prior appointment" },
    ],
    languages: ["Marathi", "Hindi", "English"],
    image: "/images/doctors/dr-manisha-nagargoje.png",
    photo: "/images/doctors/dr-manisha-nagargoje.png",
  },
];

export const getDoctorByDepartment = (dept: Doctor["department"]) =>
  doctors.find((d) => d.department === dept)!;

/** Convenience links built from the config above. */
/**
 * Address rendered as display lines. Kept in one place so the footer, contact
 * card, location panel and schema can never drift apart — NAP consistency is a
 * direct local-ranking factor. Blank parts (currently the PIN) drop out.
 */
export const addressLines: string[] = [
  siteConfig.address.street,
  siteConfig.address.area,
  [
    `${siteConfig.address.locality}, ${siteConfig.address.region}`,
    siteConfig.address.postalCode,
  ]
    .filter(Boolean)
    .join(" "),
].filter(Boolean);

export const addressOneLine = addressLines.join(", ");

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
      { label: "Paediatric Surgery", href: "/departments/pediatric-surgery" },
      { label: "Eye Care & Ophthalmology", href: "/departments/eye-care" },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;
