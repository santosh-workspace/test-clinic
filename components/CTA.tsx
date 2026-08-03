export default function CTA() {
  return (
    <section id="book" className="bg-ink text-paper">
      <div className="max-w-content mx-auto px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="eyebrow !text-accent mb-3">Book an assessment</p>
          <h2 className="text-display-lg font-display font-medium">
            Start with a real baseline, this week.
          </h2>
          <p className="mt-4 text-paper/70 max-w-sm">
            Assessments run 60 minutes and include a written report. Most new
            patients are seen within 3 business days.
          </p>
          <div className="mt-8 space-y-1 font-mono text-sm text-paper/70">
            <p>+91 20 5551 2345</p>
            <p>hello@meridianphysio.example.com</p>
            <p>Koregaon Park, Pune</p>
          </div>
        </div>

        <form className="bg-paper text-ink rounded-card p-6 md:p-7 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full h-12 px-4 rounded-md border border-line bg-surface"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="w-full h-12 px-4 rounded-md border border-line bg-surface"
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1.5">
              What brings you in?
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              className="w-full px-4 py-3 rounded-md border border-line bg-surface resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-accent text-ink font-semibold hover:bg-accent-dark"
          >
            Request assessment
          </button>
        </form>
      </div>
    </section>
  );
}
