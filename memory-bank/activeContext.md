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
6. Finish Resend setup for contact notifications (verify sender domain and add production secrets)
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

## Recent Account UI Update (2026-10-11)
- AuthProvider loads the current Supabase user and tracks auth state changes.
- The navbar shows a profile avatar that opens account settings; sign-out is inside the menu.
- Account settings support display name and profile photo updates; the photo itself opens the file picker on hover/click.
- Password and email changes use separate dialogs. Theme remains available in the navbar only.
- Added a reduced-motion preference stored in the current browser.
- Profile photos use a private `avatars` Storage bucket with per-user RLS policies; signed URLs expire after one hour.
- Supabase migration `003_profile_avatars` was applied to the connected project.

## Contact Email Notifications (2026-10-11)
- The contact form writes submissions to the private, write-only `contact_submissions` table through `/api/contact`.
- `/api/contact` now optionally sends a plain-text notification through the Resend API after the database insert succeeds.
- Notifications go to `beyondthedream.information@gmail.com` by default; provider configuration uses server-only `RESEND_API_KEY` and `CONTACT_NOTIFICATION_FROM` variables.
- Database receipt remains successful even when notification delivery is not configured or Resend is unavailable.
- Finish setup by creating a Resend account, verifying a sender domain, and adding the required environment variables locally and in production.
