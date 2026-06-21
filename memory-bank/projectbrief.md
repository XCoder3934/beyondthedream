# Project Brief

## Project Name
Beyond the Dream — Volunteer Mentorship Platform for Students

## Core Goal
Build a volunteer mentorship platform where students discover mentors, view details, apply, and get matched with mentors who volunteer their time.

## Core User Flow
1. Students discover mentors
2. Students view mentor details
3. Students apply / get matched
4. Mentors join via application form and appear in listing

## User Roles
- **Student** — discovers mentors, applies, uses matching
- **Mentor** — volunteers expertise; listed after application (no admin approval)

## Scope Boundaries

### In Scope
- Mentor listing with cards and detail modal
- Student application and rule-based matching (inline results)
- Mentor application form (direct Supabase insert)
- Optional auth (Supabase: email/password + Google SSO)
- Auth modal triggered by key actions (not forced on entry)
- Pages: Home, Mentors, Match, About
- Navbar + mobile hamburger navigation
- Footer with contact form (not a separate page)
- External donation link
- PostHog analytics (4 essential events only)
- Premium, modern UI (Stripe/Linear-inspired)

### Out of Scope
- Admin/approval system for mentors
- Payment or subscription logic
- Custom analytics dashboards
- Contact as a standalone page
- Auth as dedicated pages (modal only)
- Complex ML matching (rule-based only)

## Technical Stack
- Next.js 16 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Supabase (sole backend: auth + data)
- PostHog (product analytics only)

## Architecture Principles
- Supabase is the only backend
- Simple components: MentorCard, MentorModal, MatchForm
- Prefer server components unless interactivity required
- Avoid over-engineering
- Minimal, functional implementation
- Analytics must not affect core product functionality

## AI Behavior Rules
- Ask if something is unclear
- Do not assume missing features
- Do not add unnecessary features
- Prefer simplest working solution
