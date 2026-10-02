import { ImageResponse } from "next/og";
import { SealIcon } from "@/components/ui/icons";

export function socialImage(heading: string) {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 76px", background: "#14382b", color: "#f5efdf", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 38 }}>
        <SealIcon width={76} height={76} />
        Banknote Expert
      </div>
      <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 1048 }}>{heading}</div>
      <div style={{ display: "flex", fontSize: 28, borderTop: "1px solid #8eaa96", paddingTop: 26 }}>Free US banknote serial number tools</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
