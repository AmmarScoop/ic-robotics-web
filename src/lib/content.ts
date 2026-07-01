// Public read layer. Reads managed content from Supabase when configured,
// and gracefully falls back to the bundled mock data so the site always renders.
import { getPublicClient, isSupabaseConfigured } from "@/lib/supabase";
import { testimonials as mockTestimonials, blogPosts as mockPosts } from "@/lib/data";
import type { Testimonial, Post, MediaItem } from "@/lib/types";

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = getPublicClient();
  if (!sb) return mockTestimonials as Testimonial[];
  try {
    const { data, error } = await sb
      .from("testimonials")
      .select("id,type,name,role,quote,sort")
      .eq("published", true)
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return mockTestimonials as Testimonial[];
    return data as Testimonial[];
  } catch {
    return mockTestimonials as Testimonial[];
  }
}

function rowToPost(r: any): Post {
  return {
    id: r.id, slug: r.slug, audience: r.audience, category: r.category,
    title: r.title, excerpt: r.excerpt, body: r.body, readMinutes: r.read_minutes,
  };
}

export async function getPosts(): Promise<Post[]> {
  const sb = getPublicClient();
  if (!sb) return mockPosts as Post[];
  try {
    const { data, error } = await sb
      .from("posts")
      .select("id,slug,audience,category,title,excerpt,body,read_minutes")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return mockPosts as Post[];
    return data.map(rowToPost);
  } catch {
    return mockPosts as Post[];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const sb = getPublicClient();
  if (!sb) return (mockPosts.find((p) => p.slug === slug) as Post) ?? null;
  try {
    const { data, error } = await sb
      .from("posts")
      .select("id,slug,audience,category,title,excerpt,body,read_minutes")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return (mockPosts.find((p) => p.slug === slug) as Post) ?? null;
    return rowToPost(data);
  } catch {
    return (mockPosts.find((p) => p.slug === slug) as Post) ?? null;
  }
}

export async function getMedia(): Promise<MediaItem[]> {
  const sb = getPublicClient();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("media")
      .select("id,type,url,caption,tags")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as MediaItem[];
  } catch {
    return [];
  }
}

export { isSupabaseConfigured };
