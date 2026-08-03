export default function Footer() {
  return (
    <footer className="max-w-content mx-auto px-5 md:px-8 py-10 pb-28 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-display text-lg">
            Meridian<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted mt-1">
            Sports physiotherapy & recovery, Pune.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a href="#approach" className="hover:text-ink">Approach</a>
          <a href="#services" className="hover:text-ink">Services</a>
          <a href="#process" className="hover:text-ink">Process</a>
          <a href="#stories" className="hover:text-ink">Patient stories</a>
          <a href="#book" className="hover:text-ink">Book</a>
        </nav>
      </div>

      <div className="hairline mt-8 pt-6 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted">
        <p>© {new Date().getFullYear()} Meridian Physio & Recovery. All rights reserved.</p>
        <p>Mon–Sat, 7am–8pm · Koregaon Park, Pune</p>
      </div>
    </footer>
  );
}
