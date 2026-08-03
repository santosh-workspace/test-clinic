"use client";

import { useState } from "react";

const links = [
  { href: "#approach", label: "Approach" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#stories", label: "Patient stories" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#main" className="font-display text-xl md:text-2xl tracking-tight">
            Meridian
            <span className="text-primary">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ink/80 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#book"
              className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary text-paper text-sm font-medium hover:bg-primary-dark"
            >
              Book assessment
            </a>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-full"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`h-[1.5px] bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span className={`h-[1.5px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-[1.5px] bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 pb-5 gap-1 border-t border-line">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="h-12 flex items-center text-base text-ink/85"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="mt-2 h-12 flex items-center justify-center rounded-full bg-primary text-paper font-medium"
          >
            Book assessment
          </a>
        </nav>
      </div>

      {/* Sticky mobile CTA bar, appears above the safe-area on small screens */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface border-t border-line px-4 py-3 flex items-center gap-3 [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="tel:+15551234567"
          className="flex-1 h-12 inline-flex items-center justify-center rounded-full border border-line text-sm font-medium"
        >
          Call clinic
        </a>
        <a
          href="#book"
          className="flex-1 h-12 inline-flex items-center justify-center rounded-full bg-accent text-ink text-sm font-semibold"
        >
          Book assessment
        </a>
      </div>
    </header>
  );
}
