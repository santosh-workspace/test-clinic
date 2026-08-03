import GoniometerArc from "./GoniometerArc";

const stats = [
  { value: "1,240+", label: "Assessments / yr" },
  { value: "94%", label: "Return-to-sport rate" },
  { value: "6.2 wks", label: "Avg. recovery, ACL" },
];

export default function Hero() {
  return (
    <section className="max-w-content mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <p className="eyebrow mb-5">Movement medicine, Pune</p>
          <h1 className="text-hero font-display font-medium">
            Recovery, measured
            <br />
            <span className="italic text-primary">in degrees</span>, not
            guesses.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-md">
            Every plan at Meridian starts with a real assessment — joint by
            joint — and every visit after is tracked against it, so you and
            your physio both know exactly where recovery stands.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#book"
              className="h-12 px-6 inline-flex items-center justify-center rounded-full bg-primary text-paper font-medium hover:bg-primary-dark"
            >
              Book an assessment
            </a>
            <a
              href="#approach"
              className="h-12 px-6 inline-flex items-center justify-center rounded-full border border-line font-medium hover:border-ink"
            >
              See our approach
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 max-w-sm">
            {stats.map((s) => (
              <div key={s.label} className="hairline pt-3">
                <dt className="font-mono text-xl md:text-2xl text-ink tabular-nums">
                  {s.value}
                </dt>
                <dd className="text-xs text-muted mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-first md:order-last">
          <GoniometerArc />
        </div>
      </div>
    </section>
  );
}
