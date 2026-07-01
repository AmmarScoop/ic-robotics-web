import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { FloatingShapes } from "@/components/floating-shapes";

export function CTASection({
  title = "Ready To Build The Next Generation Of Innovators?",
  subtitle = "Bring world-class Robotics, Coding and AI into your school — or find the perfect path for your child.",
  primary = { label: "Request School Proposal", href: "/contact?type=proposal" },
  secondary = { label: "Book School Demo", href: "/contact?type=demo" },
}: {
  title?: string; subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="container-x my-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-grape-600 px-6 py-16 text-center text-white shadow-glow sm:px-16">
          <FloatingShapes />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base text-white/85">{subtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg"><Link href={primary.href}>{primary.label}</Link></Button>
              <Button asChild size="lg" className="bg-white/15 text-white backdrop-blur hover:bg-white/25">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
