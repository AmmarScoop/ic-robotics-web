import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { CTASection } from "@/components/cta-section";
import { getPosts } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Blog — Insights for Parents & Schools",
  description: "Guidance on robotics, coding and AI for kids — for parents choosing a path and schools building STEM programs.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, content] = await Promise.all([getPosts(), getSiteContent()]);
  const b = content.blog;
  const forParents = posts.filter((p) => p.audience === "Parents");
  const forSchools = posts.filter((p) => p.audience === "Schools");
  return (
    <>
      <PageHero eyebrow={b.hero.eyebrow} title={b.hero.title} subtitle={b.hero.subtitle} />

      <section className="container-x py-16">
        <SectionHeading eyebrow={b.parents.eyebrow} title={b.parents.title} subtitle={b.parents.subtitle} center={false} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forParents.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow={b.schools.eyebrow} title={b.schools.title} subtitle={b.schools.subtitle} center={false} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forSchools.map((p) => <BlogCard key={p.id} post={p} />)}
          </div>
        </div>
      </section>

      <CTASection {...content.cta} title={b.ctaTitle || content.cta.title} />
    </>
  );
}
