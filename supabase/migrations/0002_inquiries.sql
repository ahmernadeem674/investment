-- =============================================================================
-- Contact / query submissions from the public marketing site.
-- =============================================================================
-- Anyone (anonymous visitors) may INSERT a query. No SELECT/UPDATE/DELETE
-- policy is defined, so submissions are NOT readable through the public API —
-- only the service role (Supabase dashboard / admin) can read them.
-- =============================================================================

create table if not exists public.inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Allow public (anon) and logged-in users to submit a query.
drop policy if exists "inquiries_insert_public" on public.inquiries;
create policy "inquiries_insert_public"
  on public.inquiries
  for insert
  to anon, authenticated
  with check ( true );

-- (Intentionally no SELECT policy: read submissions in the Supabase dashboard
--  under Table Editor → inquiries, which uses the service role.)
