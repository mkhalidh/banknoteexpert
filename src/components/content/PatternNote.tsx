/** An illustrative note that shows the same eight-digit serial in both print positions. */
export function PatternNote({ serial, pattern, detail }: { serial: string; pattern: string; detail: string }) {
  return (
    <svg
      role="img"
      aria-label={`Illustrated dollar note with ${pattern} serial number ${serial} printed twice. ${detail}`}
      viewBox="0 0 1200 640"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-auto w-full"
    >
      <rect width="1200" height="640" fill="#14382b" />
      <rect x="46" y="46" width="1108" height="444" rx="12" fill="#f5efdf" />
      <rect x="64" y="64" width="1072" height="408" rx="4" fill="none" stroke="#355f49" strokeWidth="6" />
      <rect x="79" y="79" width="1042" height="378" rx="2" fill="none" stroke="#8eaa96" strokeWidth="2" />
      <path d="M94 123h82M1024 123h82M94 413h82M1024 413h82" stroke="#355f49" strokeWidth="3" />
      <text x="600" y="113" textAnchor="middle" fill="#14382b" fontFamily="Georgia, serif" fontSize="35" letterSpacing="5">ILLUSTRATIVE DOLLAR NOTE</text>
      <text x="600" y="149" textAnchor="middle" fill="#355f49" fontFamily="Georgia, serif" fontSize="16" letterSpacing="4">SERIAL NUMBER PATTERN EXAMPLE</text>
      <circle cx="600" cy="283" r="116" fill="none" stroke="#8eaa96" strokeWidth="8" />
      <circle cx="600" cy="283" r="101" fill="none" stroke="#355f49" strokeWidth="2" />
      <circle cx="600" cy="271" r="46" fill="#8eaa96" opacity="0.55" />
      <path d="M507 365c12-49 46-78 93-78s81 29 93 78" fill="#8eaa96" opacity="0.55" />
      <circle cx="196" cy="274" r="68" fill="none" stroke="#355f49" strokeWidth="5" />
      <circle cx="1004" cy="274" r="68" fill="none" stroke="#355f49" strokeWidth="5" />
      <text x="196" y="294" textAnchor="middle" fill="#14382b" fontFamily="Georgia, serif" fontSize="64">1</text>
      <text x="1004" y="294" textAnchor="middle" fill="#14382b" fontFamily="Georgia, serif" fontSize="64">1</text>
      <text x="160" y="173" fill="#14382b" fontFamily="monospace" fontSize="42" fontWeight="700" letterSpacing="2">{serial}</text>
      <text x="754" y="415" fill="#14382b" fontFamily="monospace" fontSize="42" fontWeight="700" letterSpacing="2">{serial}</text>
      <text x="600" y="446" textAnchor="middle" fill="#355f49" fontFamily="Georgia, serif" fontSize="18" letterSpacing="3">SAMPLE ILLUSTRATION · NOT LEGAL TENDER</text>
      <text x="600" y="540" textAnchor="middle" fill="#c5d2c4" fontFamily="sans-serif" fontSize="25" letterSpacing="3">{pattern.toUpperCase()} SERIAL</text>
      <text x="600" y="608" textAnchor="middle" fill="#f5efdf" fontFamily="monospace" fontSize="76" fontWeight="700" letterSpacing="11">{serial}</text>
    </svg>
  );
}
