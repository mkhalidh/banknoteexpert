import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PatternGuidePage } from "@/components/content/PatternGuidePage";
import { solid as content } from "@/content/silo-a-guides";

export const metadata: Metadata = buildMetadata({ ...content.meta, allowLongMetadata: true });
export default function Page() { return <PatternGuidePage content={content} />; }
