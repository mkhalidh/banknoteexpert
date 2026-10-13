import { socialImage } from "@/lib/social-image";
import { getRoute } from "@/config/routes";

const title = getRoute("/star-note-lookup/").title;
export const alt = `${title} | Banknote Expert`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return socialImage(title); }
