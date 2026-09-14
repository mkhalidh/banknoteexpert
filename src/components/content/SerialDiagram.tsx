/**
 * Inline SVG diagram of where the serial number sits on a US note and how it is
 * structured. Server Component, no raster image, so it stays crisp and adds no
 * network request or layout shift.
 */
export function SerialDiagram() {
  return (
    <figure className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <svg
        viewBox="0 0 480 210"
        role="img"
        aria-labelledby="serial-diagram-title serial-diagram-desc"
        className="h-auto w-full"
      >
        <title id="serial-diagram-title">
          Diagram of a US banknote showing serial number positions
        </title>
        <desc id="serial-diagram-desc">
          A dollar bill with the serial number printed in green ink in the
          upper-right and lower-left corners, and its structure of prefix
          letter, eight digits, and a suffix letter or star.
        </desc>

        {/* Note body */}
        <rect
          x="6"
          y="6"
          width="468"
          height="150"
          rx="10"
          fill="#f0f4ef"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {/* Portrait oval */}
        <ellipse cx="240" cy="81" rx="52" ry="60" fill="#dfe7dd" stroke="#94a3b8" />
        <text x="240" y="86" textAnchor="middle" fontSize="11" fill="#64748b">
          portrait
        </text>

        {/* Upper-right serial (green ink) */}
        <text
          x="408"
          y="40"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="17"
          fontWeight="700"
          fill="#1a7f37"
        >
          L00088892*
        </text>
        {/* Lower-left serial (green ink) */}
        <text
          x="86"
          y="132"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="17"
          fontWeight="700"
          fill="#1a7f37"
        >
          L00088892*
        </text>

        {/* Callout structure below the note */}
        <text x="120" y="182" textAnchor="middle" fontSize="12" fill="#4338ca">
          L
        </text>
        <text x="120" y="198" textAnchor="middle" fontSize="10" fill="#64748b">
          prefix letter
        </text>

        <text x="240" y="182" textAnchor="middle" fontSize="12" fill="#4338ca">
          00088892
        </text>
        <text x="240" y="198" textAnchor="middle" fontSize="10" fill="#64748b">
          8 digits (the pattern)
        </text>

        <text x="372" y="182" textAnchor="middle" fontSize="12" fill="#4338ca">
          *
        </text>
        <text x="372" y="198" textAnchor="middle" fontSize="10" fill="#64748b">
          suffix letter or star
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-zinc-500">
        The serial number is printed twice, in green ink, in the upper-right and
        lower-left of the face of the note.
      </figcaption>
    </figure>
  );
}
