import type { IconType } from "react-icons";
import {
  FiActivity,
  FiAlertCircle,
  FiAward,
  FiClock,
  FiDroplet,
  FiEye,
  FiHeart,
  FiHome,
  FiLayers,
  FiShield,
  FiSmile,
  FiSun,
  FiThermometer,
  FiTrendingUp,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { img } from "./images";
import { siteConfig } from "./site";

export type Department = {
  slug: "pediatrics" | "eye-care";
  href: string;
  name: string;
  shortName: string;
  kicker: string;
  headline: string;
  intro: string;
  description: string[];
  accent: "brand" | "teal";
  icon: IconType;
  image: (typeof img)[keyof typeof img];
  heroImage: (typeof img)[keyof typeof img];
  services: { name: string; description: string; icon: IconType }[];
  metaTitle: string;
  metaDescription: string;
};

export const departments: Department[] = [
  {
    slug: "pediatrics",
    href: "/departments/pediatrics",
    name: "Paediatrics",
    shortName: "Paediatrics",
    kicker: "Child health, birth to adolescence",
    headline: "Care that grows with your child",
    intro:
      "From the first newborn examination to the last school health check, one paediatrician who knows your child's history.",
    description: [
      "The paediatric department at Yogeshwari Hospital handles the full arc of childhood health — newborn assessment, immunisation, growth and nutrition, the fevers and infections of the school years, and surgical evaluation when a child needs it.",
      "Continuity is the point. Seeing the same doctor each visit means the growth chart tells a story rather than showing a single dot, and a parent's instinct that 'something is different this time' is heard against a real baseline.",
      "Consultations are unhurried, instructions are written down, and you leave knowing exactly what to watch for at home and when to come back.",
    ],
    accent: "brand",
    icon: FiSmile,
    image: img.motherChildren,
    heroImage: img.pediatricExam,
    services: [
      {
        name: "Child Consultation",
        description:
          "A full assessment for any concern — from a persistent cough to a change in behaviour — with time to talk through what is going on.",
        icon: FiUserCheck,
      },
      {
        name: "Newborn Care",
        description:
          "First examination, jaundice and weight monitoring, feeding support, and the early follow-up that catches problems while they are still small.",
        icon: FiHeart,
      },
      {
        name: "Vaccination & Immunisation",
        description:
          "The complete IAP schedule, tracked visit by visit, with reminders so no dose is missed and catch-up planning if one already has been.",
        icon: FiShield,
      },
      {
        name: "Growth Monitoring",
        description:
          "Height, weight and head circumference plotted against standard curves, plus milestone review, so deviations show up early.",
        icon: FiTrendingUp,
      },
      {
        name: "Fever & Infection Management",
        description:
          "Assessment of fever, respiratory and gastrointestinal infection, with investigation only where it changes the treatment.",
        icon: FiThermometer,
      },
      {
        name: "Nutrition Counselling",
        description:
          "Practical feeding guidance for poor weight gain, fussy eating, anaemia and the transition to family food.",
        icon: FiActivity,
      },
      {
        name: "Paediatric Surgery Consultation",
        description:
          "Evaluation of hernia, hydrocele, undescended testis and similar conditions, with a clear opinion on whether surgery is needed and when.",
        icon: FiLayers,
      },
      {
        name: "Child Health Check-ups",
        description:
          "Scheduled preventive reviews covering vision, hearing, dental, development and nutrition in a single visit.",
        icon: FiAward,
      },
    ],
    metaTitle: `Paediatrician in ${siteConfig.city} | Child Specialist`,
    metaDescription: `Paediatric care in ${siteConfig.city} — newborn care, vaccination, growth monitoring and child health check-ups with Dr. Ramdash D. Nagargoje at Yogeshwari Hospital. Book an appointment.`,
  },
  {
    slug: "eye-care",
    href: "/departments/eye-care",
    name: "Eye Care & Ophthalmology",
    shortName: "Eye Care",
    kicker: "Vision, screening and eye surgery",
    headline: "Sight is worth protecting early",
    intro:
      "Most sight loss is preventable — if it is found in time. Comprehensive examination, screening and surgical evaluation under one roof.",
    description: [
      "The eye department covers the whole path from a routine vision check to surgical planning: refraction and spectacle prescription, cataract evaluation, glaucoma screening, diabetic retinal examination, and treatment of dry eye and ocular surface disease.",
      "Two conditions in particular take sight quietly. Glaucoma damages the optic nerve years before central vision changes, and diabetic retinopathy progresses without pain or blurring until it is advanced. Both are found by examination, not by symptoms — which is why an annual check matters even when your eyes feel fine.",
      "Every finding is explained: what the test showed, what it means for your sight, and what happens next.",
    ],
    accent: "teal",
    icon: FiEye,
    image: img.eyewear,
    heroImage: img.eyeExam,
    services: [
      {
        name: "Comprehensive Eye Examination",
        description:
          "A full assessment of vision, refraction, eye pressure, and the front and back of the eye in a single sitting.",
        icon: FiEye,
      },
      {
        name: "Vision Testing",
        description:
          "Accurate refraction for spectacle and contact lens prescription, including testing for children and for near-work strain.",
        icon: FiSun,
      },
      {
        name: "Cataract Consultation",
        description:
          "Grading of the cataract, discussion of lens options, and an honest opinion on whether surgery will meaningfully help yet.",
        icon: FiLayers,
      },
      {
        name: "Glaucoma Screening",
        description:
          "Eye pressure measurement and optic nerve assessment — the only way to catch a condition that has no early symptoms.",
        icon: FiShield,
      },
      {
        name: "Diabetic Eye Examination",
        description:
          "Dilated retinal examination for anyone living with diabetes, repeated annually, to find retinopathy while it is still treatable.",
        icon: FiActivity,
      },
      {
        name: "Dry Eye Treatment",
        description:
          "Assessment of tear film and ocular surface, with a treatment plan for burning, grittiness and screen-related strain.",
        icon: FiDroplet,
      },
      {
        name: "Eye Infection Treatment",
        description:
          "Prompt care for conjunctivitis, styes, lid inflammation and corneal infection, with clear guidance on preventing spread.",
        icon: FiAlertCircle,
      },
      {
        name: "Eye Surgery Consultation",
        description:
          "Pre-operative evaluation, biometry and surgical planning, along with the post-operative review that follows.",
        icon: FiAward,
      },
    ],
    metaTitle: `Eye Specialist in ${siteConfig.city} | Ophthalmologist`,
    metaDescription: `Eye care in ${siteConfig.city} — comprehensive eye examination, cataract consultation, glaucoma and diabetic eye screening with Dr. Manisha Nagargoje (Sanap) at Yogeshwari Hospital.`,
  },
];

export const getDepartment = (slug: Department["slug"]) =>
  departments.find((d) => d.slug === slug)!;

/* ── Surgical consultations (third services category) ─────────────────────── */

export const surgicalServices = [
  {
    name: "Cataract Surgery Consultation",
    description:
      "Biometry, intraocular lens selection and a realistic account of the visual outcome you can expect, before anything is scheduled.",
    icon: FiEye,
  },
  {
    name: "Paediatric Surgical Assessment",
    description:
      "Evaluation of common childhood surgical conditions — hernia, hydrocele, undescended testis — including whether watchful waiting is the better option.",
    icon: FiSmile,
  },
  {
    name: "Pre-operative Evaluation",
    description:
      "Fitness assessment, necessary investigations and a written plan covering fasting, medication and what to bring on the day.",
    icon: FiUserCheck,
  },
  {
    name: "Post-operative Review",
    description:
      "Structured follow-up after surgery to confirm healing is on track and to catch complications early.",
    icon: FiHeart,
  },
  {
    name: "Second Opinion",
    description:
      "An independent review of a surgical recommendation made elsewhere, with the reasoning explained in plain language.",
    icon: FiLayers,
  },
  {
    name: "Day-care Procedures",
    description:
      "Minor procedures completed with same-day discharge, so recovery happens at home rather than in a ward.",
    icon: FiHome,
  },
];

/* ── Why choose us ────────────────────────────────────────────────────────── */

export const differentiators = [
  {
    title: "Two specialities, one family practice",
    body: "A paediatrician and an ophthalmologist working under one roof — so a child needing a vision check and a grandparent needing a cataract opinion are seen in the same building, on the same day.",
    icon: FiUsers,
  },
  {
    title: "The same doctor, every visit",
    body: "Continuity is not a luxury in medicine. Seeing the same specialist means your history is known and small changes are noticed against a real baseline.",
    icon: FiUserCheck,
  },
  {
    title: "Unhurried consultations",
    body: "Time to describe the problem properly, ask what you actually want to ask, and leave with written instructions rather than a half-remembered explanation.",
    icon: FiClock,
  },
  {
    title: "Investigation only when it changes something",
    body: "Tests are ordered when the result will alter the treatment — not to fill a file. It keeps costs down and keeps the focus on the diagnosis.",
    icon: FiShield,
  },
];

/** TODO: replace with real, verifiable figures before publishing. */
export const stats = [
  { value: 15, suffix: "+", label: "Years of paediatric practice" },
  { value: 12, suffix: "+", label: "Years in ophthalmology" },
  { value: 2, suffix: "", label: "Specialist departments" },
  { value: 6, suffix: "", label: "Days a week OPD" },
];

/* ── Testimonials ─────────────────────────────────────────────────────────────
   TODO: THESE ARE PLACEHOLDERS, NOT REAL REVIEWS.
   Replace each entry with a genuine, verbatim Google review before publishing —
   or delete the section. Publishing invented reviews of a real medical practice
   is deceptive, and Google penalises it. For the same reason no aggregateRating
   is emitted in the structured data (see src/lib/schema.ts).
   ────────────────────────────────────────────────────────────────────────── */

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
  rating: number;
  department: "pediatrics" | "eye-care" | "general";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our daughter had been running a fever for four days and we were getting frantic. The doctor examined her properly, explained why he was not rushing to antibiotics, and wrote down exactly what to watch for. She was fine by the weekend.",
    author: "Placeholder — parent",
    context: "Paediatric consultation",
    rating: 5,
    department: "pediatrics",
  },
  {
    quote:
      "I went in for a routine check because my vision felt slightly off. They picked up early diabetic changes I had no idea about. I would never have known until it was too late.",
    author: "Placeholder — patient",
    context: "Diabetic eye screening",
    rating: 5,
    department: "eye-care",
  },
  {
    quote:
      "What I appreciated most was not being made to feel like I was wasting anyone's time. Every question got a real answer, and nobody looked at the clock.",
    author: "Placeholder — patient",
    context: "Eye examination",
    rating: 5,
    department: "eye-care",
  },
  {
    quote:
      "We have been bringing both children here since they were born. The vaccination record is properly maintained and we get a reminder before every due date.",
    author: "Placeholder — parent",
    context: "Immunisation",
    rating: 5,
    department: "pediatrics",
  },
  {
    quote:
      "My mother's cataract was assessed here. The doctor told us honestly that it was not yet worth operating on and asked us to come back in six months. That kind of advice is rare.",
    author: "Placeholder — family member",
    context: "Cataract consultation",
    rating: 5,
    department: "eye-care",
  },
  {
    quote:
      "Clean, calm and organised. With a newborn, not having to wait two hours in a crowded room makes an enormous difference.",
    author: "Placeholder — parent",
    context: "Newborn care",
    rating: 5,
    department: "pediatrics",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────────────── */

export type Faq = { question: string; answer: string };

export const faqsGeneral: Faq[] = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-in patients are seen during OPD hours, but booking ahead means a fixed slot and a much shorter wait. You can book online, send a WhatsApp message, or call the hospital directly.",
  },
  {
    question: "What are the OPD timings?",
    answer: `Morning OPD runs from 9:00 AM to 2:00 PM and evening OPD from 5:00 PM to 8:00 PM, Monday to Saturday. Sunday is reserved for emergencies and pre-booked appointments. ${siteConfig.emergencyNote}`,
  },
  {
    question: "Where is the hospital located?",
    answer: `Yogeshwari Hospital is in ${siteConfig.address.locality}, ${siteConfig.address.region}. The Contact page has an embedded map and a one-tap Get Directions link that opens Google Maps with the route already set.`,
  },
  {
    question: "Which languages do the doctors speak?",
    answer:
      "Consultations are available in Marathi, Hindi and English. Please tell reception if you would prefer a particular language and it will be arranged.",
  },
  {
    question: "Can both departments be seen in one visit?",
    answer:
      "Yes. Paediatrics and eye care operate from the same building, so a family can arrange consultations with both specialists on the same day. Mention it when booking and reception will sequence the slots.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Bring any previous prescriptions, test reports, discharge summaries and, for children, the immunisation card. If you wear spectacles, bring your current pair and the most recent prescription.",
  },
];

export const faqsPediatrics: Faq[] = [
  {
    question: "At what age should a child's first check-up happen?",
    answer:
      "Within the first week of life, and then at regular intervals through the first two years. These early visits establish the growth curve and confirm that feeding, weight gain and reflexes are all developing as expected.",
  },
  {
    question: "My child missed a vaccine dose. Is it too late?",
    answer:
      "Almost never. Catch-up schedules exist for every vaccine in the routine programme. Bring the immunisation card and a revised plan will be worked out — restarting the whole course is rarely necessary.",
  },
  {
    question: "When is a fever serious enough to come in?",
    answer:
      "Come in for any fever in an infant under three months, a fever above 38.5°C lasting more than three days, a fever with rash, breathlessness, persistent vomiting, unusual drowsiness or reduced urine output. When in doubt, call — it costs nothing to ask.",
  },
  {
    question: "How is growth actually monitored?",
    answer:
      "Height, weight and head circumference are measured at each visit and plotted on standard growth charts. It is the trend across visits that matters, not any single reading, which is why keeping to the follow-up schedule is useful.",
  },
  {
    question: "Does a paediatric surgery consultation mean surgery is needed?",
    answer:
      "No. A consultation is an assessment. Many childhood conditions — some hernias and hydroceles, for instance — resolve on their own or can safely be watched. You will be told plainly if that is the case.",
  },
  {
    question: "Can I bring a child for a check-up when nothing is wrong?",
    answer:
      "Yes, and it is encouraged. Preventive check-ups cover vision, hearing, dental health, development and nutrition, and are the visits most likely to find something worth acting on early.",
  },
];

export const faqsEyeCare: Faq[] = [
  {
    question: "How often should I have my eyes examined?",
    answer:
      "Every two years for healthy adults under 40, annually after 40, and annually without exception if you have diabetes, high blood pressure, or a family history of glaucoma.",
  },
  {
    question: "Why does diabetes require a separate eye examination?",
    answer:
      "Diabetic retinopathy damages the retina long before vision changes, and it cannot be detected without a dilated examination of the back of the eye. By the time sight is affected, treatment is harder and less effective.",
  },
  {
    question: "Will my eyes be dilated, and can I drive afterwards?",
    answer:
      "A comprehensive examination usually involves dilating drops. Vision stays blurred and light-sensitive for four to six hours afterwards, so please arrange for someone to drive you home and bring sunglasses.",
  },
  {
    question: "When is a cataract ready for surgery?",
    answer:
      "When it interferes with what you need to do — reading, driving, recognising faces — not at a particular grade or age. If it is not yet limiting you, being asked to come back in six months is the right advice.",
  },
  {
    question: "Are there early warning signs of glaucoma?",
    answer:
      "Usually none, which is precisely the danger. The common form damages peripheral vision so gradually that the brain compensates. It is found through eye-pressure measurement and optic nerve examination, which is why routine screening matters after 40.",
  },
  {
    question: "My eyes burn after screen work. Is that treatable?",
    answer:
      "Yes. Screen-related dry eye is common and responds well to a combination of tear film treatment, an ergonomic review and a corrected spectacle prescription. It is worth having assessed rather than living with.",
  },
];

/* ── Trust badges shown in the hero ───────────────────────────────────────── */

export const trustBadges = [
  { label: "Paediatrics", detail: "Newborn to adolescent" },
  { label: "Eye Care", detail: "Screening & surgery" },
  { label: "6 Days", detail: "Weekly OPD" },
];
