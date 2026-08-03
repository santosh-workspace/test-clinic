const services = [
  {
    icon: (
      <path d="M6 20 L11 12 L15 16 L19 6" strokeLinecap="round" strokeLinejoin="round" />
    ),
    title: "Sports & performance rehab",
    copy: "For runners, lifters, and weekend athletes rebuilding load capacity after injury — with a return-to-sport target date from session one.",
    href: "#sports-rehab",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="9" r="3" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      </>
    ),
    title: "Manual & manipulative therapy",
    copy: "Hands-on joint mobilisation and soft-tissue work for chronic stiffness, back pain, and restricted movement that isn't resolving on its own.",
    href: "#manual-therapy",
  },
  {
    icon: (
      <path
        d="M4 12h4l2-6 4 12 2-6h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Post-surgical recovery",
    copy: "Staged protocols after ACL, rotator cuff, or joint replacement surgery, coordinated directly with your surgeon's timeline.",
    href: "#post-surgical",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface border-y border-line">
      <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-lg mb-10 md:mb-14">
          <p className="eyebrow mb-3">What we treat</p>
          <h2 className="text-display-lg font-display font-medium">
            Three programmes, one measurement standard
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="group block rounded-card border border-line bg-paper p-6 md:p-7 hover:border-primary transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="w-9 h-9 text-primary mb-6"
              >
                {s.icon}
              </svg>
              <h3 className="text-xl font-display font-medium mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{s.copy}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Learn more
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
