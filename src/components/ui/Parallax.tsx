"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-linked parallax.
 *
 * GSAP handles this rather than Framer Motion because ScrollTrigger's `scrub`
 * is tied to Lenis's rAF loop (wired up in SmoothScroll.tsx), which keeps the
 * parallax perfectly in step with the smoothed scroll position instead of
 * lagging a frame behind it.
 *
 * `distance` is in pixels of travel across the full scroll pass.
 */
export function Parallax({
  children,
  className,
  distance = 80,
  direction = "y",
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "y" | "x";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const target = ref.current!.firstElementChild;
      if (!target) return;

      gsap.fromTo(
        target,
        { [direction]: -distance / 2, force3D: true },
        {
          [direction]: distance / 2,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("gpu", className)}>
      {children}
    </div>
  );
}

/**
 * Slow, continuous zoom on an image as it passes through the viewport.
 * Applied to the inner <img>, so the frame's rounded corners stay put.
 */
export function ScrollZoom({
  children,
  className,
  from = 1.14,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ref.current!.querySelector("img"),
        { scale: from, force3D: true },
        {
          scale: to,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
