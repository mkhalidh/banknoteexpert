/**
 * Renders a JSON-LD structured-data block. Server Component, no interactivity.
 * `data` is a plain JSON-serialisable object describing a schema.org type.
 */
export interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
