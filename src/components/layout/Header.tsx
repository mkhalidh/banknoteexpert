import Link from "next/link";
import { getRoute } from "@/config/routes";
import { navigation } from "@/config/navigation";
import { SealIcon } from "@/components/ui/icons";
import { MegaNavigation } from "@/components/layout/MegaNavigation";
export function Header() {
  return <header className="site-header sticky top-0 z-40"><div className="site-header-inner mx-auto flex items-center gap-6"><Link href="/" className="site-brand flex shrink-0 items-center gap-3" title={getRoute("/").title}><SealIcon className="brand-seal h-9 w-9 shrink-0" />Banknote Expert</Link><MegaNavigation items={navigation} /></div></header>;
}
