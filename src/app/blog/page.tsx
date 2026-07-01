import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { CTASection } from "@/components/cta-section";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Insights for Parents & Schools",
  description: "Guidance on robotics, coding and AI for kids — for parents choosing a path and schools building STEM programs.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();
  const forParents = posts.filter((p) => p.audience === "Parents");
  const forSchools = posts.filter((p) => p.audience === "Schools");
  return (
    <>
      <PageHero eyebrow="Blog" title="Ideas For The Future Of Learning" subtitle="Practical, research-backed articles for parents and school leaders." />

      <section className="container-x py-16">
        <SectionHeading eyebrow="For Parents" title="Helping you choose the right path" center={false} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {forParents.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-brand-50/40 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="For Schools" title="Build a world-class STEM program" center={false} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forSchools.map((p) => <BlogCard key={p.id} post={p} />)}
          </div>
        </div>
      </section>

      <CTASection title="Bring these ideas to life in your school" />
    </>
  );
}
