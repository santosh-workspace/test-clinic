/**
 * Renders a JSON-LD graph. Server component — the script is in the initial
 * HTML, so crawlers see it without executing any JavaScript.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is built entirely from our own config, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
