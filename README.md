# Beyond the Dream

Volunteer mentorship platform for students — built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase.

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in your Supabase and optional PostHog keys in `.env.local`.

3. Run the Supabase migration in `supabase/migrations/001_initial.sql` against your project.

4. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3000).

## Pages

- `/` — Home
- `/mentors` — Mentor grid + detail modal
- `/match` — Student match form + inline results
- `/about` — About the platform

## Stack

- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Supabase Auth + Database
- PostHog analytics (optional)

Without Supabase configured, the app uses sample mentor data for local development.
