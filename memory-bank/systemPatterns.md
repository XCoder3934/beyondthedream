# System Patterns

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                 │
├──────────────┬──────────────┬──────────────┬─────────────┤
│     Home     │   Mentors    │    Match     │    About    │
│  (landing)   │ grid+modal   │ form+results │             │
└──────────────┴──────────────┴──────────────┴─────────────┘
         │              │              │
         ▼              ▼              ▼
┌─────────────────────────────────────────────────────────┐
│              Shared Layout (Navbar + Footer)             │
│  AuthModal │ MentorModal │ MentorApplyModal │ Contact   │
└─────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐            ┌─────────────────┐
│  Supabase Auth  │            │ Supabase DB     │
│  email + Google │            │ mentors, etc.   │
└─────────────────┘            └─────────────────┘
         │
         ▼
┌─────────────────┐
│    PostHog      │  (4 events, non-blocking)
└─────────────────┘
```

## Component Relationships

### Core Components
| Component | Type | Responsibility |
|-----------|------|----------------|
| `MentorCard` | Server or Client | Grid item: name, category badge, bio snippet, skills (≤5), click → modal |
| `MentorModal` | Client | Full mentor details, expanded bio/skills, "Apply as Student" CTA |
| `MatchForm` | Client | age, interests tags, goals → submit → inline ranked results |
| `AuthModal` | Client | Google + email login/signup; role assignment |
| `MentorApplyModal` | Client | Become a Mentor form → Supabase insert |
| `Navbar` | Client | Desktop links + mobile hamburger + Login + Donate |
| `Footer` | Mixed | Links + contact form |

### Page Structure
- **`/`** — Landing + platform explanation
- **`/mentors`** — Fetch mentors from Supabase, render grid, modal on card click
- **`/match`** — MatchForm + inline results after submit
- **`/about`** — About content

## Data Model (Mentor)

```typescript
interface Mentor {
  id: string;
  name: string;
  bio: string;
  category: 'STEM' | 'Arts' | 'Languages' | 'Social Sciences';
  skills: string[];
  avatar?: string; // optional URL
  email?: string;  // from mentor application
  phone?: string;  // from mentor application
  created_at?: string;
}
```

## Matching Algorithm (Rule-Based)

Simple scoring — no ML:
1. Compare student `interests` tags against mentor `skills` (exact + partial match)
2. Compare student interests against mentor `category`
3. Rank mentors by match score (descending)
4. Return top N results inline on Match page

## Auth Flow Pattern

1. User browses without auth (optional)
2. Action requires auth → open `AuthModal`
3. After signup → assign role (Student | Mentor)
4. Resume intended action (apply, match, become mentor)

Triggers:
- Apply as Student (from MentorModal)
- Submit Match form
- Become a Mentor

## Analytics Pattern

Fire events without awaiting or blocking UI:
- `user_signup` — after successful registration + role assignment
- `mentor_view` — when MentorModal opens
- `mentor_apply_click` — when "Apply as Student" clicked
- `match_submit` — when Match form submitted

## UI Patterns
- Modals for: auth, mentor details, mentor application
- Cards with hover lift + shadow
- Category badges on mentor cards
- Skills as tag chips (max 5 on card, full list in modal)
- Fade-in page loads, modal transition animations
- Mobile-first responsive grid

## Critical Implementation Paths

1. **Mentor listing**: Server fetch → MentorCard grid → client modal state
2. **Mentor apply**: Auth check → AuthModal if needed → student application (future) or match flow
3. **Become mentor**: AuthModal → MentorApplyModal → Supabase insert → refresh listing
4. **Match**: Auth check → MatchForm submit → client-side or server action matching → inline results
