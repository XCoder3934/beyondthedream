# Beyond the Dream

Volunteer mentorship platform for students — built with Next.js 16, TypeScript, Tailwind CSS v4, and Supabase.

## Getting Started

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in your Supabase and optional PostHog keys in `.env.local`.

3. Apply every SQL migration in `supabase/migrations/` to your Supabase project, in filename order.

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

## Contact email notifications

Contact messages are stored in Supabase. To also receive notifications, create a free [Resend](https://resend.com/signup) account, verify a domain you control in Resend, and create an API key. Add these server-side environment variables to `.env.local` and to the production host's environment settings:

```env
RESEND_API_KEY=re_...
CONTACT_NOTIFICATION_FROM=Beyond the Dream <notifications@your-verified-domain.com>
CONTACT_NOTIFICATION_TO=beyondthedream.information@gmail.com
```

The sender address must use the domain verified in Resend. Keep `RESEND_API_KEY` private and never prefix it with `NEXT_PUBLIC_`. If email is unavailable, the form submission remains saved in Supabase.
