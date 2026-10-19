"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { SiteContent } from "@/lib/site-defaults";

export function SiteChrome({ children, settings }: { children: React.ReactNode; settings: SiteContent["settings"] }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
