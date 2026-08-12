/**
 * IMAGE MANIFEST
 *
 * Every image is a *static import*, which lets Next.js infer intrinsic
 * dimensions (no CLS) and generate a blur placeholder at build time.
 *
 * TO SWAP IN A REAL HOSPITAL PHOTO: overwrite the file in /public/images
 * keeping the same filename and a similar aspect ratio. Nothing else changes.
 * See /public/images/README.md for the required ratio of each slot.
 *
 * Current photos are royalty-free placeholders (Unsplash / Pexels licence).
 */

import heroHospital from "../../public/images/hero-hospital.jpg";
import hospitalExterior from "../../public/images/hospital-exterior.jpg";
import ward from "../../public/images/ward.jpg";
import patientRoom from "../../public/images/patient-room.jpg";
import consultationRoom from "../../public/images/consultation-room.jpg";
import operatingTheatre from "../../public/images/operating-theatre.jpg";
import corridor from "../../public/images/corridor.jpg";
import equipment from "../../public/images/equipment.jpg";
import childHappy from "../../public/images/child-happy.jpg";
import pediatricExam from "../../public/images/pediatric-exam.jpg";
import motherChildren from "../../public/images/mother-children.jpg";
import newborn from "../../public/images/newborn.jpg";
import eyeExam from "../../public/images/eye-exam.jpg";
import eyewear from "../../public/images/eyewear.jpg";
import eyeClinic from "../../public/images/eye-clinic.jpg";
import drRamdash from "../../public/images/doctors/dr-ramdash-nagargoje.jpg";
import drManisha from "../../public/images/doctors/dr-manisha-nagargoje.jpg";

export const img = {
  heroHospital: {
    src: heroHospital,
    alt: "Bright, calm reception area at Yogeshwari Hospital",
  },
  hospitalExterior: {
    src: hospitalExterior,
    alt: "Exterior of Yogeshwari Hospital in Chhatrapati Sambhajinagar",
  },
  ward: {
    src: ward,
    alt: "Clean, well-lit inpatient ward with individual beds",
  },
  patientRoom: {
    src: patientRoom,
    alt: "Private patient room with an attendant seating area",
  },
  consultationRoom: {
    src: consultationRoom,
    alt: "Consultation room equipped for examination",
  },
  operatingTheatre: {
    src: operatingTheatre,
    alt: "Surgical team operating in a sterile theatre",
  },
  corridor: {
    src: corridor,
    alt: "Clinical staff walking through the hospital corridor",
  },
  equipment: {
    src: equipment,
    alt: "Diagnostic equipment used for laboratory investigation",
  },
  pediatricExam: {
    src: pediatricExam,
    alt: "A paediatrician examining a young child during a consultation",
  },
  childHappy: {
    src: childHappy,
    alt: "A smiling young child after a health check-up",
  },
  motherChildren: {
    src: motherChildren,
    alt: "A mother with her two young children",
  },
  newborn: {
    src: newborn,
    alt: "A sleeping newborn baby wrapped in a soft blanket",
  },
  eyeExam: {
    src: eyeExam,
    alt: "Patient undergoing a computerised eye examination",
  },
  eyewear: {
    src: eyewear,
    alt: "A prescription spectacle frame after vision testing",
  },
  eyeClinic: {
    src: eyeClinic,
    alt: "Ophthalmologist beside a slit lamp in the eye clinic",
  },
  drRamdash: {
    src: drRamdash,
    /** TODO: replace with a real portrait of Dr. Ramdash D. Nagargoje. */
    alt: "Portrait of Dr. Ramdash D. Nagargoje, Paediatrician",
  },
  drManisha: {
    src: drManisha,
    /** TODO: replace with a real portrait of Dr. Manisha Nagargoje (Sanap). */
    alt: "Portrait of Dr. Manisha Nagargoje (Sanap), Ophthalmologist",
  },
} as const;

export type ImageKey = keyof typeof img;
