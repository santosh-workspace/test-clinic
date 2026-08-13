"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FiX } from "react-icons/fi";
import { BookingForm } from "@/components/booking/BookingForm";
import { Emblem } from "@/components/brand/Logo";
import type { Department } from "@/config/content";
import { siteConfig } from "@/config/site";

type Ctx = {
  open: (department?: Department["slug"]) => void;
  close: () => void;
  isOpen: boolean;
};

const AppointmentCtx = createContext<Ctx | null>(null);

/** Any component can pull this to open the booking dialog. */
export function useAppointment() {
  const ctx = useContext(AppointmentCtx);
  if (!ctx) {
    throw new Error("useAppointment must be used inside <AppointmentProvider>");
  }
  return ctx;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<Department["slug"] | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  const open = useCallback((department?: Department["slug"]) => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setPreset(department ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to whatever opened the dialog.
    restoreRef.current?.focus?.();
  }, []);

  /**
   * While the dialog is open: lock the page behind it, close on Escape, and
   * keep Tab inside the dialog. Compensating for the scrollbar width stops the
   * page jumping sideways as it locks.
   */
  useEffect(() => {
    if (!isOpen) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const barWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (barWidth > 0) body.style.paddingRight = `${barWidth}px`;

    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <AppointmentCtx.Provider value={value}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              initial={
                reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[var(--radius-xl2)] bg-surface-2 shadow-[var(--shadow-lift)] sm:max-h-[90dvh] sm:max-w-2xl sm:rounded-[var(--radius-xl2)]"
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-edge px-5 py-4 sm:px-7 sm:py-5">
                <div className="flex items-center gap-3">
                  <Emblem className="w-10 shrink-0" />
                  <div>
                    <h2
                      id="booking-title"
                      className="text-[1.05rem] font-bold tracking-tight text-fg"
                    >
                      Book an appointment
                    </h2>
                    <p className="mt-0.5 text-[0.78rem] text-fg-subtle">
                      {siteConfig.name} · {siteConfig.address.locality}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close booking form"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-edge text-fg-muted transition-colors hover:border-edge-strong hover:text-fg"
                >
                  <FiX aria-hidden="true" className="text-[1.1rem]" />
                </button>
              </div>

              {/* Scrollable body — data-lenis-prevent keeps the smooth-scroll
                  wrapper from stealing the wheel inside the dialog. */}
              <div
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-7"
              >
                <BookingForm initialDepartment={preset} compact onDone={undefined} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AppointmentCtx.Provider>
  );
}
