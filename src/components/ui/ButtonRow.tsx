import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Lays out a group of CTAs so every button in it is the **same width**.
 *
 * Buttons size to their label by default, so "WhatsApp" next to
 * "Book Appointment" produced two visibly different pills. `auto-cols-fr` in a
 * column-flow grid makes every track the width of the widest one, and the grid
 * itself still shrinks to content — so the row stays as narrow as it can while
 * the buttons inside it match.
 *
 * Children must be passed `fullWidth` so they fill their track. Hidden children
 * (responsive `hidden`/`sm:block` wrappers) drop out of the grid entirely and
 * do not reserve a column.
 */
export function ButtonRow({
  children,
  className,
  align = "start",
  /** Stack on mobile and only equalise from `sm` up. */
  stack = true,
}: {
  children: ReactNode;
  className?: string;
  align?: "start" | "center";
  stack?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        stack
          ? "sm:grid-flow-col sm:auto-cols-fr sm:justify-start"
          : "grid-flow-col auto-cols-fr",
        align === "center" && "sm:justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
