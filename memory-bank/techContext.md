# Tech Context

## Core Stack
| Technology | Version / Notes |
|------------|-----------------|
| Next.js | 16, App Router |
| TypeScript | strict mode |
| Tailwind CSS | v4 |
| Supabase | Auth + Database (sole backend) |
| PostHog | Product analytics only |

## Authentication
- **Provider**: Supabase Auth only
- **Methods**: Email + password, Google SSO
- **UX**: Modal (not pages); optional on entry
- **Roles**: Student, Mentor — assigned after signup

## Supabase Usage

### Auth
- Google OAuth provider
- Email/password signup and login
- User metadata or profiles table for role storage

### Database
- **`mentors`** table — primary data store for mentor listings
  - name, bio, category, skills (array), optional avatar
  - email, phone (from mentor application form)
- Direct insert on mentor application (no approval queue)
- RLS policies TBD during implementation (public read for mentors, authenticated write for applications)

### Environment Variables (expected)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=  # optional
NEXT_PUBLIC_DONATION_URL=  # external link
```

## PostHog Integration
- Client-side SDK
- Events: `user_signup`, `mentor_view`, `mentor_apply_click`, `match_submit`
- Must not block or affect core functionality
- No custom dashboards in app

## Development Setup
- Not yet scaffolded
- Recommended: `create-next-app` with App Router, TypeScript, Tailwind v4
- Supabase JS client (`@supabase/supabase-js`) + SSR helpers (`@supabase/ssr`) for Next.js

## File Structure (planned)

```
app/
  layout.tsx          # Root layout: Navbar, Footer
  page.tsx            # Home
  mentors/page.tsx
  match/page.tsx
  about/page.tsx
components/
  MentorCard.tsx
  MentorModal.tsx
  MatchForm.tsx
  AuthModal.tsx
  MentorApplyModal.tsx
  Navbar.tsx
  Footer.tsx
lib/
  supabase/
    client.ts
    server.ts
  matching.ts         # Rule-based match logic
  analytics.ts        # PostHog helpers
types/
  mentor.ts
```

## Technical Constraints
- Prefer Server Components unless interactivity required
- Supabase is the only backend — no custom API routes unless needed for server actions
- Keep implementation minimal
- Strict TypeScript throughout
- Mobile-first CSS with Tailwind v4

## Dependencies (to install)
- `next`, `react`, `react-dom`
- `typescript`, `@types/react`, `@types/node`
- `tailwindcss` v4
- `@supabase/supabase-js`, `@supabase/ssr`
- `posthog-js`
