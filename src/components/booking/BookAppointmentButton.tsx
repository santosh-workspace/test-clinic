"use client";

import type { ComponentProps, ReactNode } from "react";
import { useAppointment } from "@/components/booking/AppointmentProvider";
import { ButtonLink } from "@/components/ui/Button";
import type { Department } from "@/config/content";

/**
 * "Book Appointment" CTA.
 *
 * Progressive enhancement, deliberately: it renders a real link to
 * /appointment, so it is crawlable, middle-clickable and still works with
 * JavaScript off. The click handler intercepts and opens the dialog instead,
 * which is the faster path for everyone else.
 */
export function BookAppointmentButton({
  department,
  children = "Book Appointment",
  ...rest
}: {
  department?: Department["slug"];
  children?: ReactNode;
} & Omit<ComponentProps<typeof ButtonLink>, "href" | "children">) {
  const { open } = useAppointment();

  return (
    <ButtonLink
      href={department ? `/appointment#${department}` : "/appointment"}
      onClick={(e) => {
        // Let modified clicks (new tab/window) behave normally.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        open(department);
      }}
      {...rest}
    >
      {children}
    </ButtonLink>
  );
}
