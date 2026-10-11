-- Keep mentor contact details available to the insert flow but out of public reads.
create or replace view public.public_mentors as
select id, name, bio, category, skills, avatar, created_at
from public.mentors;

revoke select on table public.mentors from anon, authenticated, public;
revoke all on table public.public_mentors from anon, authenticated, public;
grant select on table public.public_mentors to anon, authenticated;

-- Contact messages are write-only for visitors; no public read policy is defined.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (phone is null or char_length(phone) <= 40),
  message text not null check (char_length(trim(message)) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
revoke all on table public.contact_submissions from anon, authenticated, public;

create policy "Visitors can submit contact messages"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

grant insert on table public.contact_submissions to anon, authenticated;
