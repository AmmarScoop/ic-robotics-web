# IC Robotics Academy — Website + Admin CMS

A premium, conversion-focused website for **IC Robotics**, a kids technology academy that prepares
children for the future through Robotics, Coding, AI and STEM programs, competitions, assessments,
student portfolios, certificates and school partnerships.

It ships with a **password-protected admin dashboard** and a **Supabase** backend so forms persist
for real and site content (reviews, blog articles, media) is editable without touching code.

Built as a modern EdTech/STEM brand aimed at three lead sources: **schools**, **parents**, and
**students** interested in competitions and courses.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom brand design system)
- **Framer Motion** (subtle animations, count-ups, scroll reveals)
- **shadcn/ui-style** components (hand-built, minimal dependencies)
- **Supabase** (Postgres) for leads + managed content
- **lucide-react** icons
- Responsive, mobile-first, accessible (semantic HTML, labelled forms, keyboard-friendly, good contrast)

> The public site renders **with or without** Supabase configured. Until you add credentials it uses
> the bundled mock data (`src/lib/data.ts`) as a fallback, so `npm run dev` works out of the box.
> Lead persistence and the admin dashboard require Supabase (see setup below).

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev
```

Open http://localhost:3000 — and the dashboard at http://localhost:3000/admin

Other scripts: `npm run build`, `npm run start`, `npm run lint`. Requires Node 18.17+ (Node 20+ recommended).

## Environment Variables

Copy `.env.example` → `.env.local` and set:

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + server | Anon key — used for **public reads** of published content |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Service key — used by API routes for **lead inserts + all admin writes**. Never expose to the browser. |
| `ADMIN_PASSWORD` | server | The single password for `/admin` login |
| `ADMIN_SESSION_SECRET` | server | Any long random string used to sign the admin session cookie |

## Supabase Setup (one time)

1. Create a project at https://supabase.com.
2. Open the **SQL Editor** and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
   It creates four tables — `leads`, `testimonials`, `posts`, `media` — and Row Level Security
   policies that let the public read only *published* content.
3. In **Project Settings → API**, copy the URL, the `anon` key and the `service_role` key into `.env.local`.
4. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, then restart `npm run dev`.

That's it — forms now write to the `leads` table and the dashboard manages the other three tables.

## Admin Dashboard (`/admin`)

Protected by a password + signed session cookie (enforced in `src/middleware.ts`).

- **Overview** — live counts across all content.
- **Leads** — every form submission (contact, child assessment, school readiness, competition
  registration). Search, filter by type, and **export to CSV**.
- **Reviews** — add / edit / delete the testimonials shown across the site; toggle published + reorder.
- **Articles** — create / edit / delete blog posts (title, slug, audience, category, excerpt, body,
  read time, published). Published posts appear instantly at `/blog` and `/blog/[slug]`.
- **Media** — a photo/video library (URL + caption + tags). Images are used in the Competitions gallery.

Log in at `/admin/login`. Unauthenticated `/admin/*` requests redirect to login; `/api/admin/*` return 401.

## How Persistence Works

- **Forms →** `src/lib/submit.ts` POSTs to `POST /api/leads`, which inserts into Supabase using the
  service-role client. If the backend is unreachable it falls back to `localStorage` so no lead is lost.
- **Public pages read** through `src/lib/content.ts`, which queries Supabase and **falls back to the
  mock arrays** in `src/lib/data.ts` on any error/empty result — the site is never blank.
- **Admin writes** go through guarded `/api/admin/*` route handlers (service-role client).

## API Routes

| Method + Route | Auth | Purpose |
|---|---|---|
| `POST /api/leads` | public | Insert a lead from any site form |
| `POST /api/admin/login` / `logout` | public | Set / clear the admin session cookie |
| `GET /api/admin/leads` | admin | List leads |
| `GET·POST /api/admin/testimonials` · `PUT·DELETE /api/admin/testimonials/[id]` | admin | Reviews CRUD |
| `GET·POST /api/admin/posts` · `PUT·DELETE /api/admin/posts/[id]` | admin | Articles CRUD |
| `GET·POST /api/admin/media` · `DELETE /api/admin/media/[id]` | admin | Media CRUD |

## Public Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/for-schools` | For Schools |
| `/programs` | Programs (Robotics / Coding / AI + roadmap) |
| `/competitions` | Competitions (FLL, WRO, Robot Challenge, Technoxian) |
| `/success-stories` | Success Stories (MMC & SKY case studies) |
| `/blog` + `/blog/[slug]` | Blog listing + article |
| `/about` | About Us |
| `/contact` | Contact (proposal / demo / partner / parent / competition) |
| `/child-assessment` | Gamified Child Assessment Tool |
| `/school-readiness-assessment` | School Readiness Assessment (scored) |
| `/student-dashboard` | Student Dashboard Demo |
| `/student/[slug]` | Public Student Portfolio Demo (e.g. `/student/ahmed`) |
| `/verify` | Certificate Verification Demo |
| `/competition-registration` | Competition Registration form |

Every public page exports SEO `metadata`. Interactive pages are split into a server wrapper (metadata)
plus a client component.

## Folder Structure

```
ic-robotics-web/
├── src/
│   ├── middleware.ts            # Protects /admin and /api/admin
│   ├── app/
│   │   ├── layout.tsx           # Root layout: fonts, SiteChrome, ToastProvider, metadata
│   │   ├── globals.css          # Tailwind + design tokens/utilities
│   │   ├── page.tsx  not-found.tsx  <route>/page.tsx
│   │   ├── admin/               # Dashboard: login, overview, leads, reviews, articles, media
│   │   └── api/
│   │       ├── leads/route.ts           # public lead insert
│   │       └── admin/…                  # guarded CRUD + login/logout
│   ├── components/
│   │   ├── ui/                  # button, input, textarea, label, select, card, badge, field, toast, slot
│   │   ├── admin/              # admin-shell (nav + useAdminApi), modal
│   │   ├── site-chrome.tsx      # hides public nav/footer on /admin
│   │   └── …                    # hero, cards, forms, reveal, floating-shapes, etc.
│   └── lib/
│       ├── data.ts              # Mock data (fallback content + static site copy)
│       ├── content.ts           # Public read layer (Supabase → mock fallback)
│       ├── supabase.ts          # Public (anon) + service-role clients
│       ├── api.ts               # requireService() helper for route handlers
│       ├── auth.ts              # Session token (SHA-256) for admin cookie
│       ├── submit.ts            # Client → POST /api/leads
│       ├── assessment.ts        # Child-assessment questions, scoring, profiles
│       ├── types.ts             # Testimonial / Post / MediaItem / Lead
│       └── utils.ts             # cn() helper
├── supabase/schema.sql          # Tables + RLS — run once in Supabase
├── .env.example
├── tailwind.config.ts
└── package.json
```

## Design System

- **White background** with **blue (brand)**, **yellow (accent)** and **subtle purple (grape)** gradients.
- Rounded cards, soft shadows, floating geometric STEM shapes, robot/coding/AI icons.
- `Inter` font via `next/font`. Colours live in `tailwind.config.ts` (`brand`, `accent`, `grape`, `ink`).
- Reusable helpers: `.container-x`, `.eyebrow`, `.card-surface`, `.gradient-text`.

## Security Notes

- The `service_role` key is only ever read in server code (`src/lib/supabase.ts` `getServiceClient`,
  used exclusively by `/api/*` route handlers). Do **not** import it into client components.
- RLS lets the public read only `published` rows; `leads` has no public policy — all lead access is
  server-side via the service role.
- Admin auth is a single shared password suitable for one or a few trusted editors. For multiple
  named accounts with roles, swap `src/lib/auth.ts` + `middleware.ts` for NextAuth or Supabase Auth.

## Suggested Next Steps

1. **File uploads:** add Supabase Storage so admins can upload images directly (instead of pasting URLs).
2. **Richer articles:** store `body` as Markdown/MDX and render with `react-markdown`.
3. **Back the demos with data:** move `certificateDb`, student dashboard and portfolio to Supabase tables.
4. **Notifications:** email the team (Resend/SendGrid) on each new lead from `POST /api/leads`.
5. **Analytics + spam protection:** add a honeypot / rate limiting on the public lead endpoint.
6. **CRM sync:** forward leads to HubSpot/Salesforce/Zoho from the same route handler.

## Accessibility & Performance

- Semantic landmarks; all inputs have labels; buttons have clear text/`aria-label`s; focus-visible rings.
- Minimal dependency footprint; lightweight animations; public content reads are cached/revalidated.
