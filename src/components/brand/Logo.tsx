import Image from "next/image";
import emblemSrc from "../../../public/brand/logo-emblem.png";
import lockupSrc from "../../../public/brand/logo-full.png";
import { cn } from "@/lib/utils";

/**
 * BRAND ASSETS
 *
 * Two derivatives of the supplied logo, both transparent:
 *
 *  logo-full.png    the complete lockup, including the arc wordmark
 *                   "Eye & Paediatric Surgery Centre". The arc text is solid
 *                   black, so this is for light surfaces and larger sizes
 *                   only — below ~140px the arc becomes illegible.
 *
 *  logo-emblem.png  the ring, baby and cradling hands with the arc wordmark
 *                   removed. Works at any size and on any background, and is
 *                   what the header, footer and favicon use, paired with a
 *                   typeset wordmark.
 *
 * See scripts/README in the repo notes for how these were derived from the
 * original (white background flood-filled to alpha, wordmark separated by
 * connected-component labelling).
 */

/** Just the cradled-eye mark. Safe at any size, on any background. */
export function Emblem({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={emblemSrc}
      alt=""
      aria-hidden="true"
      priority={priority}
      sizes="120px"
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

/**
 * The full artwork including the arc wordmark. Give it room — it carries the
 * hospital's descriptor, so it should never be shrunk below about 140px.
 */
export function LogoLockup({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={lockupSrc}
      alt="Yogeshwari Hospital — Eye and Paediatric Surgery Centre"
      priority={priority}
      sizes="(max-width: 768px) 240px, 340px"
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

/**
 * Header/footer signature: emblem plus a typeset wordmark.
 *
 * Typesetting the words rather than using the arc artwork keeps them crisp at
 * small sizes and lets them recolour with the active theme — the baked-in arc
 * text could do neither.
 */
export function Logo({
  className,
  compact = false,
  invert = false,
  priority = false,
}: {
  className?: string;
  compact?: boolean;
  invert?: boolean;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Emblem priority={priority} className="w-10 shrink-0 md:w-11" />
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
