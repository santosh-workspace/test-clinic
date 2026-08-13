"use client";

import { motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { links } from "@/config/site";

/**
 * Sticky bottom action bar — the primary conversion surface on mobile.
 *
 * Three thumb-sized targets (each ≥56px tall, well past the 44px minimum),
 * always reachable, no scrolling required. Hidden at the very top of the page
 * so it doesn't compete with the hero CTAs, then slides in.
 *
 * `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iOS home indicator.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 380);
  });

  const actions = [
    {
      href: links.tel,
      label: "Call",
      sub: "Speak now",
      icon: FiPhone,
      className: "text-ink-800",
    },
    {
      href: links.whatsapp(),
      label: "WhatsApp",
      sub: "Quick reply",
      icon: FaWhatsapp,
      /* WhatsApp's own brand green, so the tile is recognised at a glance. */
      brand: true,
      external: true,
    },
    {
      href: "/appointment",
      label: "Book",
      sub: "Pick a slot",
      icon: FiCalendar,
      primary: true,
    },
  ];

  return (
    <motion.nav
      aria-label="Quick actions"
      initial={false}
      animate={
        reduced
          ? { y: 0, opacity: 1 }
          : { y: visible ? 0 : 120, opacity: visible ? 1 : 0 }
      }
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-50 pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="mx-3 mb-3 grid grid-cols-3 gap-1.5 rounded-2xl border border-ink-200/80 bg-white/92 p-1.5 shadow-[0_-4px_30px_-6px_rgb(7_35_53/0.18)] backdrop-blur-xl">
        {actions.map((action) => {
          const Icon = action.icon;
          const content = (
            <>
              <Icon aria-hidden="true" className="text-[1.25rem]" />
              <span className="text-[0.78rem] font-semibold leading-none">{action.label}</span>
              <span className="text-[0.62rem] leading-none opacity-65">{action.sub}</span>
            </>
          );

          const base =
            "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl transition-transform active:scale-[0.97]";
          const classes = action.primary
            ? `${base} bg-brand-600 text-white`
            : action.brand
              ? `${base} bg-[#25D366] text-white`
              : `${base} bg-ink-50 text-ink-800`;

          return action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classes}
            >
              {content}
            </a>
          ) : (
            <Link key={action.label} href={action.href} className={classes}>
              {content}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
