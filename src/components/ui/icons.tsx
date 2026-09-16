import type { ReactNode, SVGProps } from "react";

/**
 * Small inline stroke-icon set — no icon library dependency. 20x20 viewBox,
 * 1.75 stroke, round caps/joins throughout so every icon reads as one family
 * (apple-design §16 "Craft": nothing random, every value deliberate).
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M7 10.25 9 12.25 13.25 7.75" />
    </Icon>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M10 2.75 12.3 7.6l5.2.8-3.75 3.7.9 5.2L10 14.8l-4.65 2.5.9-5.2-3.75-3.7 5.2-.8Z" strokeLinejoin="round" />
    </Icon>
  );
}

export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6.5v4" />
      <path d="M10 13.25h.01" />
    </Icon>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="10" cy="10" r="3.25" />
      <path d="M10 2.5v1.75M10 15.75v1.75M17.5 10h-1.75M4.25 10H2.5M15.3 4.7l-1.24 1.24M5.94 14.06l-1.24 1.24M15.3 15.3l-1.24-1.24M5.94 5.94 4.7 4.7" />
    </Icon>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M16.5 11.8A6.75 6.75 0 0 1 8.2 3.5a6.75 6.75 0 1 0 8.3 8.3Z" strokeLinejoin="round" />
    </Icon>
  );
}

export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M10 3v3.5M10 13.5V17M3 10h3.5M13.5 10H17M5.5 5.5l2 2M12.5 12.5l2 2M14.5 5.5l-2 2M7.5 12.5l-2 2" />
    </Icon>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M5.5 5.5 14.5 14.5M14.5 5.5 5.5 14.5" />
    </Icon>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.25 6h13.5M3.25 10h13.5M3.25 14h13.5" />
    </Icon>
  );
}

export function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path
        d="M10.6 3H16a1 1 0 0 1 1 1v5.4a1 1 0 0 1-.3.7l-6.7 6.7a1 1 0 0 1-1.4 0l-5.4-5.4a1 1 0 0 1 0-1.4l6.7-6.7a1 1 0 0 1 .7-.3Z"
        strokeLinejoin="round"
      />
      <circle cx="13.25" cy="6.75" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function NoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <rect x="2.25" y="5.5" width="15.5" height="9" rx="1.75" />
      <circle cx="10" cy="10" r="2.1" />
    </Icon>
  );
}

export function SealIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <circle cx="10" cy="10" r="7.25" />
      <path
        d="M10 6.25 11.1 8.6l2.55.35-1.85 1.8.45 2.55L10 12.1l-2.25 1.2.45-2.55-1.85-1.8 2.55-.35Z"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M6 2.75h6l3 3v10.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.75a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M7.25 10.5h5.5M7.25 13.25h5.5" />
    </Icon>
  );
}
