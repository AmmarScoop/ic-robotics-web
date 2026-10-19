import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { ToastProvider } from "@/components/ui/toast";
import { getSection } from "@/lib/site-content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSection("settings");
  return {
    metadataBase: new URL("https://icroboticsschools.com"),
    title: {
      default: s.siteTitle,
      template: `%s | ${s.copyrightName || "I.C Robotics Schools"}`,
    },
    description: s.siteDescription,
    keywords: [
      "robotics for kids", "coding for kids", "AI for schools", "STEM programs",
      "school robotics partnership", "kids technology academy", "robotics competitions",
    ],
    openGraph: {
      title: s.copyrightName || s.siteTitle,
      description: s.siteDescription,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSection("settings");
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <ToastProvider>
          <SiteChrome settings={settings}>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
