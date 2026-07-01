// Shared content types used by the store, API routes and UI.

export type Testimonial = {
  id: string;
  type: "Parent" | "Student" | "Principal" | "School";
  name: string;
  role: string;
  quote: string;
  published?: boolean;
  sort?: number;
};

export type Post = {
  id: string;
  slug: string;
  audience: "Parents" | "Schools";
  category: string;
  title: string;
  excerpt: string;
  body?: string;
  readMinutes: number;
  published?: boolean;
};

export type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  tags?: string;
};

export type Lead = {
  id: string;
  kind: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  payload: Record<string, unknown>;
  created_at: string;
};
