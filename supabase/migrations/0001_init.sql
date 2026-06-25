-- =============================================================================
-- Milestone 1: schema, signup trigger, and Row-Level Security
-- =============================================================================
-- Tables:
--   investors  (1:1 with auth.users)
--   accounts   (an investor has many accounts)
--   holdings   (an account has many holdings / positions)
--
-- RLS model: a logged-in investor can READ ONLY their own data.
-- No INSERT/UPDATE/DELETE policies in Milestone 1 -> clients cannot write;
-- data is loaded via migrations / SQL editor (service role bypasses RLS).
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Tables
-- -----------------------------------------------------------------------------

create table if not exists public.investors (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text,
  created_at timestamptz not null default now()
);

create table if not exists public.accounts (
  id           uuid primary key default gen_random_uuid(),
  investor_id  uuid not null references public.investors (id) on delete cascade,
  name         text not null,
  account_type text,
  created_at   timestamptz not null default now()
);

create table if not exists public.holdings (
  id            uuid primary key default gen_random_uuid(),
  account_id    uuid not null references public.accounts (id) on delete cascade,
  symbol        text not null,
  quantity      numeric not null default 0,
  cost_basis    numeric not null default 0,   -- per-share purchase price
  current_price numeric not null default 0,   -- latest per-share price
  created_at    timestamptz not null default now()
);

-- Helpful indexes for the ownership lookups used by RLS and the dashboard.
create index if not exists accounts_investor_id_idx on public.accounts (investor_id);
create index if not exists holdings_account_id_idx on public.holdings (account_id);

-- -----------------------------------------------------------------------------
-- Auto-create an investors row whenever a new auth user signs up.
-- SECURITY DEFINER so it can insert into public.investors regardless of RLS.
-- -----------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.investors (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Row-Level Security
-- -----------------------------------------------------------------------------
-- Enabling RLS with NO policy = deny all. We then add SELECT-only policies.

alter table public.investors enable row level security;
alter table public.accounts  enable row level security;
alter table public.holdings  enable row level security;

-- investors: you can read only your own row (PK == your auth uid).
drop policy if exists "investors_select_own" on public.investors;
create policy "investors_select_own"
  on public.investors
  for select
  to authenticated
  using ( id = (select auth.uid()) );

-- accounts: you can read only accounts whose investor_id is you.
drop policy if exists "accounts_select_own" on public.accounts;
create policy "accounts_select_own"
  on public.accounts
  for select
  to authenticated
  using ( investor_id = (select auth.uid()) );

-- holdings: you can read a holding only if it belongs to one of YOUR accounts.
-- Holdings don't reference the investor directly, so ownership is checked
-- transitively through the accounts table.
drop policy if exists "holdings_select_own" on public.holdings;
create policy "holdings_select_own"
  on public.holdings
  for select
  to authenticated
  using (
    account_id in (
      select id from public.accounts
      where investor_id = (select auth.uid())
    )
  );
