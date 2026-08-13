"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Rounded image "portal" with a clip-path wipe on entry.
 *
 * Static imports supply intrinsic dimensions and a build-time blur placeholder,
 * so there is no layout shift and no flash of empty box.
 */
export function MediaFrame({
  image,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  ratio = "aspect-[4/3]",
  rounded = "rounded-[var(--radius-xl2)]",
  overlay = false,
}: {
  image: { src: StaticImageData; alt: string };
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
  rounded?: string;
  overlay?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      data-reveal
      initial={reduced ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewport}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative overflow-hidden bg-surface-3", ratio, rounded, className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={cn("object-cover", imageClassName)}
      />
      {overlay && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-ink-950/10 to-transparent"
        />
      )}
    </motion.div>
  );
}
