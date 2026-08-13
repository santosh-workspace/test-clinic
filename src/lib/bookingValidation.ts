/**
 * Validation rules for the appointment form.
 *
 * Kept out of the component deliberately: these are pure functions of their
 * input, so they can be reasoned about and exercised on their own rather than
 * only through the UI. `BookingForm` imports them and renders the messages.
 */

export type BookingField = "department" | "name" | "phone" | "age" | "date" | "notes";

export const NOTES_MAX = 600;

export type BookingValues = {
  department: string | null;
  name: string;
  phone: string;
  age: string;
  /** YYYY-MM-DD, or "" for "earliest available". */
  date: string;
  notes: string;
};

export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;

/** Bookable window: today through six months out. */
export function dateBounds(now: Date = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setMonth(max.getMonth() + 6);
  return { today, min: iso(today), max: iso(max) };
}

export function validateName(raw: string): string | null {
  const n = raw.trim();
  if (!n) return "Please enter the patient's name.";
  if (n.length < 2) return "That looks too short — please give the full name.";
  // At least two letters, so "12" or "..." is rejected but "Jo" is fine.
  if (!/\p{L}\s*\p{L}/u.test(n)) return "Please enter a name, not just numbers.";
  if (n.length > 80) return "Please shorten the name.";
  return null;
}

/** Indian mobile: ten digits starting 6–9, with an optional +91 or 0 prefix. */
export function validatePhone(raw: string): string | null {
  const v = raw.trim();
  if (!v) return "Please enter a contact number.";
  if (/[^\d\s+()\-]/.test(v)) return "Use digits only.";
  const digits = v.replace(/\D/g, "").replace(/^(91|0)/, "");
  if (digits.length !== 10) return "Enter a 10-digit mobile number.";
  if (!/^[6-9]/.test(digits)) return "An Indian mobile number starts with 6, 7, 8 or 9.";
  return null;
}

/**
 * Age accepts what people actually write at a children's hospital: "3",
 * "3 years", "6 months", "10 days". A bare number is read as years.
 */
export function validateAge(raw: string): string | null {
  const v = raw.trim().toLowerCase();
  if (!v) return "Please enter the patient's age.";
  const m = v.match(/^(\d{1,3})\s*(days?|weeks?|months?|years?|yrs?|y)?$/);
  if (!m) return "Use a number, or a form like “6 months” or “3 years”.";
  const n = Number(m[1]);
  const unit = m[2] ?? "year";
  if (unit.startsWith("day")) {
    return n > 31 ? "Over 31 days — please give it in months." : null;
  }
  if (unit.startsWith("week")) {
    return n > 12 ? "Over 12 weeks — please give it in months." : null;
  }
  if (unit.startsWith("month")) {
    return n > 24 ? "Over 24 months — please give it in years." : null;
  }
  return n > 120 ? "Please check the age." : null;
}

/** Optional. Blank means "earliest available". */
export function validateDate(raw: string, now: Date = new Date()): string | null {
  if (!raw) return null;
  const picked = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(picked.getTime())) return "That date is not valid.";
  const { today, max } = dateBounds(now);
  if (picked < today) return "Please pick today or a later date.";
  if (iso(picked) > max) return "Please pick a date within the next six months.";
  return null;
}

export function validateNotes(raw: string): string | null {
  return raw.length > NOTES_MAX
    ? `Please keep this under ${NOTES_MAX} characters.`
    : null;
}

/** Sunday is emergency-only. A caution, not a blocker. */
export function sundayNotice(raw: string): string | null {
  if (!raw) return null;
  const d = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(d.getTime()) || d.getDay() !== 0) return null;
  return "That is a Sunday — emergencies and pre-booked appointments only. Reception will confirm.";
}

/** Every rule in one pass. An empty object means the form may be submitted. */
export function validateBooking(
  v: BookingValues,
  now: Date = new Date(),
): Partial<Record<BookingField, string>> {
  const e: Partial<Record<BookingField, string>> = {};
  if (!v.department) e.department = "Please choose a department.";
  const name = validateName(v.name);
  if (name) e.name = name;
  const phone = validatePhone(v.phone);
  if (phone) e.phone = phone;
  const age = validateAge(v.age);
  if (age) e.age = age;
  const date = validateDate(v.date, now);
  if (date) e.date = date;
  const notes = validateNotes(v.notes);
  if (notes) e.notes = notes;
  return e;
}
