import { cn } from "@/lib/utils";

/**
 * The YH monogram. Two arcs that read as a stylised eye when closed and as a
 * protective curve when open — vector so it stays crisp at any size, and it
 * doubles as the loading-screen mark.
 *
 * TODO: swap for the real hospital logo if one exists.
 */
export function Monogram({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <defs>
        {/*
          userSpaceOnUse, not the default objectBoundingBox: a perfectly
          vertical line (the Y's stem) has a zero-width bounding box, which
          makes an objectBoundingBox gradient degenerate — the browser then
          skips painting the stroke entirely and the Y renders as a V.
          Mapping the gradient to viewBox coordinates also makes every element
          share one continuous ramp rather than each restarting it.
        */}
        <linearGradient
          id="yh-grad"
          gradientUnits="userSpaceOnUse"
          x1="8"
          y1="8"
          x2="92"
          y2="92"
        >
          <stop offset="0%" stopColor="var(--color-brand-600)" />
          <stop offset="55%" stopColor="var(--color-brand-500)" />
          <stop offset="100%" stopColor="var(--color-teal-400)" />
        </linearGradient>
      </defs>

      {/* Outer ring — the "care" enclosure */}
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#yh-grad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        {...(animated
          ? {
              strokeDasharray: 289,
              style: {
                animation: "draw-ring 1.4s var(--ease-out-expo) forwards",
              },
            }
          : {})}
      />

      {/* The eye/iris — reads as the O of the ophthalmology side */}
      <circle cx="50" cy="50" r="13" fill="url(#yh-grad)" opacity="0.16" />
      <circle cx="50" cy="50" r="6" fill="url(#yh-grad)" />

      {/* Y stem, upper left — paediatrics */}
      <path
        d="M28 27 L50 50"
        stroke="url(#yh-grad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M72 27 L50 50"
        stroke="url(#yh-grad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M50 50 L50 74"
        stroke="url(#yh-grad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
  invert = false,
}: {
  className?: string;
  compact?: boolean;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Monogram className="h-9 w-9 md:h-10 md:w-10" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.32rem] leading-none tracking-tight md:text-[1.45rem]",
              invert ? "text-white" : "text-ink-950",
            )}
          >
            Yogeshwari
          </span>
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.19em]",
              invert ? "text-white/60" : "text-ink-500",
            )}
          >
            Hospital
          </span>
        </span>
      )}
    </span>
  );
}
