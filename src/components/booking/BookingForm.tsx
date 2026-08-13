"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheck,
  FiClock,
  FiExternalLink,
  FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { ButtonLink } from "@/components/ui/Button";
import { departments, type Department } from "@/config/content";
import { doctors, links, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The appointment request form.
 *
 * Shared by the /appointment page and the booking modal so the two can never
 * drift apart.
 *
 * ── How a submission is actually delivered ──────────────────────────────────
 * There is no backend and no database — this is a static site. Submitting
 * composes the answers into a structured WhatsApp message and hands off to
 * WhatsApp, which is where this practice already takes bookings. Nothing is
 * stored or transmitted anywhere else, which also keeps patient details out of
 * any third-party form service (they are health enquiries).
 *
 * If a Calendly event URL is configured for the chosen department, a "pick a
 * slot" button appears alongside, and the date/time questions drop away —
 * Calendly owns those once it is live.
 */

type Slot = "morning" | "evening" | "either";

const SLOTS: { id: Slot; label: string; detail: string }[] = [
  { id: "morning", label: "Morning", detail: "9:00 AM – 2:00 PM" },
  { id: "evening", label: "Evening", detail: "5:00 PM – 8:00 PM" },
  { id: "either", label: "Either", detail: "Whichever is sooner" },
];

const calendlyKey = (slug: Department["slug"]) =>
  slug === "eye-care" ? ("eyeCare" as const) : ("pediatricSurgery" as const);

/** Today in YYYY-MM-DD, for the date input's `min`. */
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function BookingForm({
  initialDepartment = null,
  compact = false,
  syncHash = false,
  onDone,
}: {
  initialDepartment?: Department["slug"] | null;
  /** Tighter spacing for the modal. */
  compact?: boolean;
  /** Preselect from /appointment#<department>. Page use only. */
  syncHash?: boolean;
  onDone?: () => void;
}) {
  const [slug, setSlug] = useState<Department["slug"] | null>(initialDepartment);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<Slot>("either");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  /* Deep links like /appointment#eye-care preselect the department. The
     fragment is not available during SSR, so it has to be read on mount. */
  useEffect(() => {
    if (!syncHash) return;
    const h = window.location.hash.replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (h === "pediatric-surgery" || h === "eye-care") setSlug(h);
  }, [syncHash]);

  const dept = departments.find((d) => d.slug === slug) ?? null;
  const doctor = dept ? doctors.find((d) => d.department === dept.slug)! : null;
  const calendlyUrl = dept ? siteConfig.calendly[calendlyKey(dept.slug)] : "";

  const phoneOk = phone.replace(/\D/g, "").length >= 10;
  const valid = Boolean(slug) && name.trim().length > 1 && phoneOk;

  const message = useMemo(() => {
    if (!dept || !doctor) return "";
    const chosen = SLOTS.find((s) => s.id === slot)!;
    return [
      `Appointment request — ${siteConfig.name}`,
      ``,
      `Department: ${dept.name}`,
      `Doctor: ${doctor.name}`,
      `Patient name: ${name.trim()}`,
      age.trim() ? `Patient age: ${age.trim()}` : null,
      `Contact number: ${phone.trim()}`,
      date ? `Preferred date: ${date}` : `Preferred date: earliest available`,
      `Preferred time: ${chosen.label}${
        chosen.id === "either" ? "" : ` (${chosen.detail})`
      }`,
      notes.trim() ? `` : null,
      notes.trim() ? `Reason for visit: ${notes.trim()}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }, [dept, doctor, name, age, phone, date, slot, notes]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.open(links.whatsapp(message), "_blank", "noopener,noreferrer");
    setSent(true);
    onDone?.();
  }

  const gap = compact ? "space-y-5" : "space-y-7";
  const field =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-[0.95rem] text-ink-900 shadow-[var(--shadow-soft)] outline-none transition-colors placeholder:text-ink-400 focus:border-brand-400";
  const label =
    "mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-500";

  if (sent) {
    return (
      <div className="rounded-[var(--radius-xl2)] border border-ink-100 bg-white p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#25D366] text-2xl text-white">
          <FiCheck aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-h3 font-bold tracking-tight text-ink-950">
          WhatsApp is open — press send
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600">
          Your request has been written out for you in WhatsApp. It is not booked
          until you send it and reception confirms. If WhatsApp did not open, call
          the hospital instead.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={links.tel} variant="secondary" icon={<FiPhone />} magnetic={false}>
            {siteConfig.contact.phoneDisplay}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="rounded-full px-5 py-3 text-[0.9rem] font-semibold text-ink-600 transition-colors hover:text-ink-950"
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={gap} noValidate>
      {/* ── Department ─────────────────────────────────────────────── */}
      <fieldset>
        <legend className={label}>1 · Which department?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {departments.map((d) => {
            const doc = doctors.find((x) => x.department === d.slug)!;
            const active = slug === d.slug;
            const rose = d.accent === "rose";
            const Icon = d.icon;
            return (
              <button
                key={d.slug}
                type="button"
                onClick={() => setSlug(d.slug)}
                aria-pressed={active}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left transition-all duration-300",
                  active
                    ? rose
                      ? "border-rose-500 shadow-[var(--shadow-soft)]"
                      : "border-brand-600 shadow-[var(--shadow-soft)]"
                    : "border-ink-100 hover:border-ink-300",
                )}
              >
                <Image
                  src={doc.image}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0 rounded-xl object-cover object-top"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[0.88rem] font-bold tracking-tight text-ink-950">
                    <Icon
                      aria-hidden="true"
                      className={rose ? "text-rose-500" : "text-brand-600"}
                    />
                    {d.shortName}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.76rem] text-ink-500">
                    {doc.name}
                  </span>
                </span>
                {active && (
                  <FiCheck
                    aria-hidden="true"
                    className={cn("shrink-0", rose ? "text-rose-500" : "text-brand-600")}
                  />
                )}
              </button>
            );
          })}
        </div>
        {touched && !slug && (
          <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-rose-600">
            <FiAlertCircle aria-hidden="true" /> Please choose a department.
          </p>
        )}
      </fieldset>

      {/* ── Patient ────────────────────────────────────────────────── */}
      <fieldset>
        <legend className={label}>2 · Patient details</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="bk-name" className="sr-only">
              Patient name
            </label>
            <input
              id="bk-name"
              name="name"
              autoComplete="name"
              placeholder="Patient's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              required
            />
            {touched && name.trim().length <= 1 && (
              <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-rose-600">
                <FiAlertCircle aria-hidden="true" /> Please enter the patient&rsquo;s name.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bk-phone" className="sr-only">
              Contact number
            </label>
            <input
              id="bk-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
              required
            />
            {touched && !phoneOk && (
              <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] text-rose-600">
                <FiAlertCircle aria-hidden="true" /> Enter a 10-digit number.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bk-age" className="sr-only">
              Patient age (optional)
            </label>
            <input
              id="bk-age"
              name="age"
              inputMode="numeric"
              placeholder="Age (optional)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={field}
            />
          </div>
        </div>
      </fieldset>

      {/* ── When ───────────────────────────────────────────────────── */}
      {calendlyUrl ? (
        <div className="rounded-2xl border border-ink-100 bg-ink-50 p-5">
          <p className="text-[0.9rem] font-semibold text-ink-900">
            Pick an exact slot
          </p>
          <p className="mt-1.5 text-[0.85rem] text-ink-600">
            {dept?.name} has live online scheduling — choose a time that suits you.
          </p>
          <div className="mt-4">
            <ButtonLink
              href={calendlyUrl}
              variant={dept?.accent === "rose" ? "rose" : "primary"}
              icon={<FiExternalLink />}
              magnetic={false}
            >
              Choose a time slot
            </ButtonLink>
          </div>
        </div>
      ) : (
        <fieldset>
          <legend className={label}>3 · When suits you?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-date" className="sr-only">
                Preferred date
              </label>
              <div className="relative">
                <FiCalendar
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                />
                <input
                  id="bk-date"
                  name="date"
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={cn(field, "pl-11")}
                />
              </div>
            </div>

            <div className="flex gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlot(s.id)}
                  aria-pressed={slot === s.id}
                  title={s.detail}
                  className={cn(
                    "flex-1 rounded-xl border-2 px-2 py-2.5 text-[0.82rem] font-semibold transition-colors",
                    slot === s.id
                      ? "border-brand-600 bg-brand-50 text-brand-700"
                      : "border-ink-100 bg-white text-ink-600 hover:border-ink-300",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[0.78rem] text-ink-500">
            <FiClock aria-hidden="true" className="shrink-0" />
            OPD: Mon–Sat 9:00 AM – 2:00 PM and 5:00 PM – 8:00 PM. Sunday emergencies only.
          </p>
        </fieldset>
      )}

      {/* ── Reason ─────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="bk-notes" className={label}>
          {calendlyUrl ? "3" : "4"} · Reason for the visit{" "}
          <span className="font-normal normal-case tracking-normal text-ink-400">
            (optional)
          </span>
        </label>
        <textarea
          id="bk-notes"
          name="notes"
          rows={compact ? 2 : 3}
          placeholder="Briefly — symptoms, how long, any previous treatment or reports."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={cn(field, "resize-none")}
        />
      </div>

      {/* ── Submit ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 border-t border-ink-100 pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={touched && !valid}
          className="inline-flex h-13 flex-1 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-[0.95rem] font-semibold text-white shadow-[0_18px_50px_-16px_rgb(37_211_102/0.55)] transition-all duration-300 hover:bg-[#1EBE5A] disabled:cursor-not-allowed disabled:opacity-55"
        >
          <FaWhatsapp aria-hidden="true" className="text-[1.15em]" />
          Send request on WhatsApp
        </button>
        <a
          href={links.tel}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 text-[0.9rem] font-semibold text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <FiPhone aria-hidden="true" />
          Call instead
        </a>
      </div>

      <p className="text-[0.76rem] leading-relaxed text-ink-500">
        Your details are sent only as a WhatsApp message to the hospital — nothing is
        stored on this website. An appointment is confirmed by reception, not by
        submitting this form. For an emergency, please call.
      </p>
    </form>
  );
}
