# Product Context

## Why This Exists
Students need accessible mentorship from volunteers who can guide them in academic and career interests. The platform connects students with mentors across STEM, Arts, Languages, and Social Sciences — without friction, approval gates, or payment barriers.

## Problems It Solves
- Students struggle to find relevant mentors in their interest areas
- Volunteer mentors need a simple way to register and be discovered
- Matching should feel immediate and transparent (inline results, not a black box)

## How It Should Work

### Discovery (Mentors Page)
- Responsive grid of mentor cards
- Each card: name, category badge, short bio (1–2 lines), skills tags (max 5)
- Hover: subtle lift + shadow
- Click card → modal with full details, expanded bio/skills, CTA "Apply as Student"

### Student Flow (Match Page)
- Form fields: age, interests (tags), goals
- On submit → ranked match results appear below on the same page
- Matching: rule-based — student interests vs mentor categories/skills

### Mentor Onboarding
- "Become a Mentor" opens form modal
- Fields: name, bio, category, skills, email, phone
- Direct insert into Supabase — no approval workflow
- New mentors appear in listing

### Authentication UX
- **Optional** — not forced on site entry
- Navbar: small secondary "Login" button
- Primary auth triggered by:
  - Apply to mentor
  - Use Match feature
  - Become a Mentor
- Auth appears as **modal** (not page)
- Modal supports Google SSO + email login/signup
- Role assigned after signup (Student or Mentor)

## User Experience Goals
- Premium, modern, trustworthy feel
- Inspired by Stripe / Linear design language
- Mobile-first
- Strong typography hierarchy
- Clean spacing system
- Subtle animations only: fade-in, hover micro-interactions, modal transitions
- Do NOT hardcode colors, layouts, or animations in spec — choose best UI per page

## Navigation

### Desktop Navbar
- Home | Mentors | Match | About
- Donation button ("Support" / "Donate") — external link

### Mobile
- All nav items in hamburger menu (including Donation)

## Footer
- Links: About, Privacy Policy, Terms & Conditions
- Contact form (always in footer, not a page): name, email, phone, message
- Copyright

## Donation
- Simple external link/button
- No payment system

## Analytics (PostHog)
Track only:
- `user_signup`
- `mentor_view`
- `mentor_apply_click`
- `match_submit`

No dashboards or custom analytics UI.
