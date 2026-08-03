const steps = [
  {
    n: "01",
    title: "Assessment",
    copy: "60-minute intake: movement screen, joint-by-joint range of motion, and a baseline you can see.",
  },
  {
    n: "02",
    title: "Diagnosis",
    copy: "A written plan naming the specific tissue or pattern involved, not just \"lower back pain.\"",
  },
  {
    n: "03",
    title: "Treatment plan",
    copy: "A staged programme with milestones tied to real dates, shared with you and your surgeon if relevant.",
  },
  {
    n: "04",
    title: "Active recovery",
    copy: "Weekly sessions, re-measured each visit against your baseline, adjusted as you progress.",
  },
  {
    n: "05",
    title: "Maintenance",
    copy: "A home programme and check-in schedule so gains hold once formal treatment ends.",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-lg mb-10 md:mb-14">
        <p className="eyebrow mb-3">How treatment runs</p>
        <h2 className="text-display-lg font-display font-medium">
          Five stages, in order, every time
        </h2>
      </div>

      <ol className="md:grid md:grid-cols-5 gap-px bg-line rounded-card overflow-hidden">
        {steps.map((step) => (
          <li key={step.n} className="bg-surface p-6 md:p-6">
            <span className="font-mono text-sm text-accent-dark">{step.n}</span>
            <h3 className="mt-3 text-lg font-display font-medium">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {step.copy}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
