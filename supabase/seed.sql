-- =============================================================================
-- Seed data for Milestone 1
-- =============================================================================
-- IMPORTANT: run this AFTER you have signed up your test user in the app,
-- because it attaches accounts/holdings to an existing investor row.
--
-- 1. Sign up / create a user with the email below (change it if you used a
--    different one). The signup trigger creates the matching investors row.
-- 2. Run this file (Supabase SQL editor, or `psql`).
--
-- Re-running is safe: it wipes and re-creates this investor's seed data.
-- =============================================================================

do $$
declare
  v_investor_id  uuid;
  v_brokerage_id uuid;
  v_ira_id       uuid;
begin
  -- >>> Change this email to match your test user <<<
  select id into v_investor_id
  from public.investors
  where email = 'investor@example.com'
  limit 1;

  if v_investor_id is null then
    raise exception
      'No investor found for investor@example.com. Sign up that user in the app first.';
  end if;

  -- Idempotency: clear any prior seed for this investor.
  delete from public.holdings
   where account_id in (
     select id from public.accounts where investor_id = v_investor_id
   );
  delete from public.accounts where investor_id = v_investor_id;

  insert into public.accounts (investor_id, name, account_type)
  values (v_investor_id, 'Taxable Brokerage', 'brokerage')
  returning id into v_brokerage_id;

  insert into public.accounts (investor_id, name, account_type)
  values (v_investor_id, 'Roth IRA', 'ira')
  returning id into v_ira_id;

  insert into public.holdings (account_id, symbol, quantity, cost_basis, current_price)
  values
    (v_brokerage_id, 'AAPL',  50, 150.00, 210.50),
    (v_brokerage_id, 'MSFT',  30, 280.00, 440.25),
    (v_brokerage_id, 'VTI',  100, 210.00, 265.10),
    (v_ira_id,       'GOOGL', 20, 120.00, 175.80),
    (v_ira_id,       'BND',   80,  75.00,  72.40);

  raise notice 'Seeded 2 accounts and 5 holdings for investor %', v_investor_id;
end $$;
