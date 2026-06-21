# Active Context

## Current Focus
**Memory bank initialization** — project specification captured; implementation not yet started.

## Project State
- Repository contains `AGENTS.md` and `.git` only
- No Next.js app scaffolded yet
- No Supabase schema or env configuration yet

## Immediate Next Steps
1. Scaffold Next.js 16 app with TypeScript (strict), Tailwind CSS v4, App Router
2. Configure Supabase client (auth + database)
3. Define Supabase schema:
   - `mentors` table (name, bio, category, skills[], optional avatar, email, phone from application)
   - User roles linked to Supabase Auth profiles
4. Build shared layout: Navbar (desktop + mobile hamburger), Footer with contact form
5. Implement Auth modal (Google + email, role assignment after signup)
6. Build pages: Home, Mentors, Match, About
7. Build components: MentorCard, MentorModal, MatchForm, mentor application modal
8. Implement rule-based matching logic
9. Integrate PostHog with 4 essential events
10. Add external donation link

## Active Decisions
- Auth is modal-only, optional on entry
- Mentor applications insert directly — no admin approval
- Match results render inline on Match page
- Contact lives in footer only
- Supabase is sole backend

## Patterns to Follow
- Server components by default; client components only for interactivity (modals, forms, auth)
- Keep components small and named: MentorCard, MentorModal, MatchForm
- Analytics fire-and-forget; never block UX on analytics

## Open Questions
- None yet — spec is comprehensive. Ask user if donation URL, Supabase project details, or PostHog keys are needed before deployment.
