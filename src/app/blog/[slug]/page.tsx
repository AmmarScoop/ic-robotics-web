import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CTASection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getPost, getPosts } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "Article" };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <article className="container-x max-w-3xl py-14">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
        <div className="mt-6 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-600">For {post.audience}</span>
          <span className="flex items-center gap-1 text-slate-400"><Clock className="h-3 w-3" /> {post.readMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <MediaPlaceholder label={post.category} withPlay={false} className="mt-8 aspect-[16/7]" />

        {post.body ? (
          <div className="prose mt-8 max-w-none whitespace-pre-wrap text-slate-700">{post.body}</div>
        ) : (
          <div className="prose mt-8 space-y-4 text-slate-700">
            <p>This article body hasn&apos;t been written yet. Add it from the admin dashboard (Articles → edit → Body) and it will appear here.</p>
            <h2 className="text-2xl font-bold text-ink">Key takeaways</h2>
            <ul className="list-disc pl-6">
              <li>Start early and build progressively across stages.</li>
              <li>Balance robotics, coding and AI for well-rounded skills.</li>
              <li>Measure progress with assessments, portfolios and certificates.</li>
            </ul>
          </div>
        )}

        <div className="mt-10">
          <Button asChild><Link href="/child-assessment">Find your child&apos;s path</Link></Button>
        </div>
      </article>
      <CTASection />
    </>
  );
}
