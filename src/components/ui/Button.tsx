"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode, useCallback } from "react";
import { FiArrowRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "rose" | "whatsapp" | "onDark";
type Size = "sm" | "md" | "lg";

/**
 * NOTE: `inline-flex` here means a `hidden` passed through `className` will
 * lose the cascade (Tailwind emits `.inline-flex` after `.hidden`). Put
 * responsive visibility on a wrapper element instead of on the button.
 */
const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-semibold tracking-tight transition-[color,background-color,border-color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[var(--shadow-glow)] hover:bg-brand-700 hover:shadow-[0_24px_70px_-18px_rgb(16_67_171/0.55)]",
  rose: "bg-rose-500 text-white shadow-[0_20px_60px_-18px_rgb(222_110_149/0.5)] hover:bg-rose-600",
  /* WhatsApp brand green (#25D366). Deliberately not themed — it is their mark. */
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_18px_50px_-16px_rgb(37_211_102/0.55)] hover:bg-[#1EBE5A]",
  secondary:
    "border border-ink-200 bg-white text-ink-900 shadow-[var(--shadow-soft)] hover:border-brand-300 hover:text-brand-700",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-950",
  onDark:
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/50 hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.85rem]",
  md: "h-12 px-6 text-[0.94rem]",
  lg: "h-14 px-8 text-[1rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  /** Slides an arrow in on hover. */
  arrow?: boolean;
  /** Cursor-following magnet. Desktop pointers only. */
  magnetic?: boolean;
  fullWidth?: boolean;
};

/**
 * Shared shell: magnetic pull, a sheen sweep on hover, and an optional arrow.
 * Everything decorative is aria-hidden and disabled under reduced motion.
 *
 * Measures via `e.currentTarget` rather than holding a ref — the element is
 * always the one the handler is attached to, so a ref would be redundant
 * bookkeeping (and reading one during render is a lint error besides).
 */
function useMagnet(enabled: boolean) {
  const reduced = useReducedMotion();
  const active = enabled && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!active) return;
      // Ignore coarse pointers — a magnet under a thumb just feels broken.
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * 0.22);
      y.set(dy * 0.3);
    },
    [active, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { style: active ? { x: sx, y: sy } : undefined, onMove, onLeave };
}

function Inner({
  children,
  icon,
  arrow,
}: Pick<CommonProps, "children" | "icon" | "arrow">) {
  return (
    <>
      {/* Sheen sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[320%] motion-reduce:hidden"
      />
      {icon && <span className="relative text-[1.15em]">{icon}</span>}
      <span className="relative">{children}</span>
      {arrow && (
        <FiArrowRight
          aria-hidden="true"
          className="relative text-[1.1em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  );
}

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function ButtonLink({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  arrow,
  magnetic = true,
  fullWidth,
  ...rest
}: ButtonLinkProps) {
  const magnet = useMagnet(magnetic);
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <motion.a
        href={href}
        style={magnet.style}
        onMouseMove={magnet.onMove}
        onMouseLeave={magnet.onLeave}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...(rest as React.ComponentProps<typeof motion.a>)}
      >
        <Inner icon={icon} arrow={arrow}>
          {children}
        </Inner>
      </motion.a>
    );
  }

  return (
    <motion.div
      style={magnet.style}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      className={cn("inline-flex", fullWidth && "w-full")}
    >
      <Link href={href} className={classes} {...rest}>
        <Inner icon={icon} arrow={arrow}>
          {children}
        </Inner>
      </Link>
    </motion.div>
  );
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  arrow,
  magnetic = true,
  fullWidth,
  ...rest
}: ButtonProps) {
  const magnet = useMagnet(magnetic);

  return (
    <motion.button
      style={magnet.style}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      <Inner icon={icon} arrow={arrow}>
        {children}
      </Inner>
    </motion.button>
  );
}
