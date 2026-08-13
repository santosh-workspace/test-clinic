import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { departments } from "@/config/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-surface-2 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand-100/60 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-rose-100/60 blur-[110px]" />
      </div>

      <div className="container-page text-center">
        <Emblem className="mx-auto w-20" />
        <p className="mt-8 font-display text-[5rem] leading-none text-gradient">404</p>
        <h1 className="mt-4 text-h2 font-bold tracking-tight text-fg">
          This page has moved on
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lead text-fg-muted">
          The link may be out of date. Everything below is one tap away.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/appointment" variant="secondary" size="lg">
            Book an appointment
          </ButtonLink>
        </div>

        <nav aria-label="Departments" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {departments.map((dept) => (
              <li key={dept.slug}>
                <Link
                  href={dept.href}
                  className="inline-flex rounded-full border border-edge bg-surface-2 px-4 py-2 text-[0.88rem] font-medium text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
                >
                  {dept.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-edge bg-surface-2 px-4 py-2 text-[0.88rem] font-medium text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
