import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { MediaPlaceholder } from "@/components/media-placeholder";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-glow">
      <MediaPlaceholder label={post.category} withPlay={false} tone={post.audience === "Parents" ? "accent" : "brand"} className="h-36" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-bold text-brand-600">For {post.audience}</span>
          <span className="flex items-center gap-1 text-slate-400"><Clock className="h-3 w-3" /> {post.readMinutes} min</span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-ink">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
