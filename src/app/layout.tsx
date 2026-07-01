import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icrobotics.example"),
  title: {
    default: "IC Robotics Academy — Future Skills for Schools & Kids",
    template: "%s | IC Robotics Academy",
  },
  description:
    "IC Robotics helps schools and parents prepare children for the future through Robotics, Coding, AI and STEM programs, international competitions, assessments and student portfolios.",
  keywords: [
    "robotics for kids", "coding for kids", "AI for schools", "STEM programs",
    "school robotics partnership", "kids technology academy", "robotics competitions",
  ],
  openGraph: {
    title: "IC Robotics Academy",
    description: "Turn your school into a future skills powerhouse.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <ToastProvider>
          <SiteChrome>{children}</SiteChrome>
        </ToastProvider>
      </body>
    </html>
  );
}
