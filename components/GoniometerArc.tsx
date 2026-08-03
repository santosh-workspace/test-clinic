"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single-line illustration of a knee joint with a goniometer arc sweeping
 * behind it, and a live degree readout. This is the page's signature element:
 * physiotherapy is fundamentally about measuring range of motion, so the
 * hero visual IS that measurement, not a stock photo of it.
 */
export default function GoniometerArc() {
  const [degrees, setDegrees] = useState(0);
  const targetRef = useRef(128);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDegrees(targetRef.current);
      return;
    }

    const duration = 1600;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDegrees(Math.round(eased * targetRef.current));
      if (progress < 1) requestAnimationFrame(tick);
    }

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square" aria-hidden="true">
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full motion-reduce:[&_.arc-draw]:[stroke-dashoffset:0]"
      >
        {/* Static reference arc (full range) */}
        <path
          d="M 60 230 A 120 120 0 0 1 260 150"
          fill="none"
          stroke="#D8DDD9"
          strokeWidth="2"
        />
        {/* Animated measured arc */}
        <path
          d="M 60 230 A 120 120 0 0 1 236 92"
          fill="none"
          stroke="#C98A2C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="340"
          className="arc-draw animate-draw-arc"
        />

        {/* Simple single-line joint illustration (femur–tibia hinge) */}
        <g stroke="#13231F" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <line x1="160" y1="70" x2="160" y2="170" />
          <line x1="160" y1="170" x2="230" y2="230" />
          <circle cx="160" cy="170" r="6" fill="#13231F" />
        </g>

        {/* Tick marks along the arc, every 45deg */}
        {[0, 45, 90, 135, 180].map((d) => (
          <circle
            key={d}
            r="2.5"
            fill="#5B6864"
            cx={160 + 120 * Math.cos(((230 - d) * Math.PI) / 180)}
            cy={230 - 120 * Math.sin(((230 - d) * Math.PI) / 180)}
          />
        ))}
      </svg>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
        <div className="font-mono text-3xl text-ink tabular-nums">
          {degrees}°
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          Knee flexion — week 6
        </div>
      </div>
    </div>
  );
}
