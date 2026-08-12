"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { type RevealVariant, variantMap, viewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: ElementType;
  /** Set when a parent <Stagger> is orchestrating the timing. */
  child?: boolean;
};

/**
 * Scroll-triggered reveal. Honours prefers-reduced-motion by rendering the
 * final state immediately rather than animating to it — the content is never
 * hidden from anyone.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as = "div",
  child = false,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = variantMap[variant];

  if (child) {
    return (
      <MotionTag data-reveal variants={variants} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/** Orchestrates a group of <Reveal child /> elements. */
export function Stagger({
  children,
  className,
  amount = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduced) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: amount, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
