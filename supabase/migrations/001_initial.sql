-- Mentors table
create table if not exists public.mentors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text not null,
  category text not null check (category in ('STEM', 'Arts', 'Languages', 'Social Sciences')),
  skills text[] not null default '{}',
  avatar text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.mentors enable row level security;

create policy "Mentors are publicly readable"
  on public.mentors for select
  using (true);

create policy "Authenticated users can insert mentors"
  on public.mentors for insert
  to authenticated
  with check (true);

-- Profiles for role storage
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text check (role in ('student', 'mentor')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
