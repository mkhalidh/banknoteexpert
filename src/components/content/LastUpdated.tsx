import { LAST_UPDATED, LAST_UPDATED_ISO } from "@/config/site";

/**
 * Renders the shared "Last updated" stamp as a machine-readable <time>.
 * Server Component.
 */
export function LastUpdated({ className }: { className?: string }) {
  return (
    <p className={className}>
      Last updated:{" "}
      <time dateTime={LAST_UPDATED_ISO}>{LAST_UPDATED}</time>
    </p>
  );
}
