# Investor Portal — Milestone 1

Proves the auth + per-investor data-isolation model end to end.

**Stack:** Next.js (App Router, TS) · Supabase (Auth + Postgres + RLS) · Tremor · Tailwind.

---

## What's here

```
app/
  login/            email/password login (Server Action)
  dashboard/        PROTECTED page: Tremor KPI cards + holdings table
  auth/signout/     sign-out route
middleware.ts       refreshes session + redirects logged-out users to /login
utils/supabase/     browser / server / middleware Supabase clients
supabase/
  migrations/0001_init.sql   schema + signup trigger + RLS policies
  seed.sql                   sample accounts + holdings (run after signup)
```

---

## Setup (do this in order)

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Supabase credentials
```bash
cp .env.local.example .env.local
```
Then edit `.env.local` and paste, from **Supabase dashboard → Project Settings → API**:
- `NEXT_PUBLIC_SUPABASE_URL` ← Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ← anon / public key

(The anon key is meant to be public. RLS is what protects data. Never put the
`service_role` key in a `NEXT_PUBLIC_` variable.)

### 3. Apply the database migration

**Option A — Supabase dashboard (simplest):**
Open **SQL Editor**, paste the contents of `supabase/migrations/0001_init.sql`, Run.

**Option B — Supabase CLI:**
```bash
npx supabase login                     # opens browser for an access token
npx supabase link --project-ref <your-project-ref>   # the xxxx in your URL
npx supabase db push                   # applies supabase/migrations/*
```

### 4. Create a test user
Either sign up in the app, or in the dashboard go to **Authentication → Users →
Add user** (set "Auto Confirm" so you can log in immediately). Use email
`investor@example.com` to match the seed file (or change the email in
`supabase/seed.sql`). The signup trigger auto-creates the matching `investors` row.

### 5. Seed sample data (so the dashboard isn't empty)
In the SQL Editor, paste and run `supabase/seed.sql`.

### 6. Run it
```bash
npm run dev
```
Open http://localhost:3000 → you'll be redirected to `/login`. Sign in →
`/dashboard` shows your KPIs and holdings.

---

## How the data isolation works (verify this)

RLS is enabled on all three tables with **SELECT-only** policies:

| table | policy `USING` clause | meaning |
|---|---|---|
| `investors` | `id = auth.uid()` | read only your own investor row |
| `accounts` | `investor_id = auth.uid()` | read only your own accounts |
| `holdings` | `account_id IN (SELECT id FROM accounts WHERE investor_id = auth.uid())` | read a holding only if it's in one of your accounts |

`auth.uid()` returns the logged-in user's id from their JWT, and the check runs
**inside Postgres on every query** — so even a frontend bug cannot leak another
investor's data.

**To verify:** create a second user (e.g. `investor2@example.com`), seed it too
(change the email in `seed.sql`), log in as each, and confirm each sees only
their own holdings. There are intentionally **no** INSERT/UPDATE/DELETE policies
in Milestone 1, so clients cannot write at all.
