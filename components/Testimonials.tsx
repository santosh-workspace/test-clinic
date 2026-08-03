const quotes = [
  {
    quote:
      "They didn't just tell me to rest. They showed me the range-of-motion numbers every week, so I knew the plan was actually working.",
    name: "A. Kulkarni",
    tag: "ACL reconstruction — returned to running, week 9",
  },
  {
    quote:
      "First clinic that treated my shoulder like an athlete's shoulder and not a generic ache. The staged plan made sense from day one.",
    name: "R. Mehta",
    tag: "Rotator cuff — returned to swimming, week 12",
  },
  {
    quote:
      "My back pain had no clear cause anywhere else I went. The assessment here actually named what was going on.",
    name: "S. Verma",
    tag: "Chronic low back pain — resolved, week 7",
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="bg-surface border-y border-line">
      <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-lg mb-10 md:mb-14">
          <p className="eyebrow mb-3">Patient outcomes</p>
          <h2 className="text-display-lg font-display font-medium">
            In their words, on their timeline
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="rounded-card border border-line bg-paper p-6 md:p-7 flex flex-col"
            >
              <blockquote className="text-base leading-relaxed flex-1">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 hairline pt-4">
                <div className="text-sm font-medium">{q.name}</div>
                <div className="font-mono text-xs text-muted mt-1">
                  {q.tag}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
