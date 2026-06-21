# Active Context

## Current Focus
**App scaffold complete** — Next.js 16 foundation, pages, components, and Supabase/PostHog wiring in place. Ready for Supabase project setup and env configuration.

## Project State
- Next.js 16.2.9 app scaffolded with TypeScript strict + Tailwind v4
- All core pages: Home, Mentors, Match, About (+ Privacy, Terms placeholders)
- Shared layout: Navbar (desktop + mobile hamburger), Footer with contact form
- Components: MentorCard, MentorModal, MatchForm, AuthModal, MentorApplyModal
- Supabase clients (browser + server), middleware session refresh, auth callback route
- Rule-based matching logic implemented
- PostHog analytics helper (4 events)
- SQL migration at `supabase/migrations/001_initial.sql`
- Sample mentor data used when Supabase env is unset (local dev)

## Immediate Next Steps
1. Create Supabase project and add credentials to `.env.local`
2. Run `001_initial.sql` migration in Supabase
3. Enable Google OAuth provider in Supabase dashboard
4. Configure PostHog key (optional)
5. Set `NEXT_PUBLIC_DONATION_URL` to real external link
6. Wire contact form to backend or email service (currently client-only thank-you)
7. Test auth flows end-to-end with real Supabase
8. Replace Privacy/Terms placeholder content

## Active Decisions
- Auth is modal-only, optional on entry
- Mentor applications insert directly — no admin approval
- Match results render inline on Match page
- Contact lives in footer only
- Supabase is sole backend
- Sample mentors shown when Supabase not configured (dev UX)

## Patterns to Follow
- Server components by default; client components only for interactivity (modals, forms, auth)
- Keep components small and named: MentorCard, MentorModal, MatchForm
- Analytics fire-and-forget; never block UX on analytics
- CSS design tokens in `globals.css` — no hardcoded page-level color schemes

## Open Questions
- Donation URL destination
- Contact form submission backend (email service vs Supabase table)
- Privacy/Terms legal content source
