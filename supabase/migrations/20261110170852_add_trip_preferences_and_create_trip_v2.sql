/*
# Add trip preferences and extend trip creation

1. Modified Tables
- `trips`: new `preferences` column (jsonb, defaults to an empty object) that holds the traveller's accommodation choice, transport choice, pace, food and activity preferences, accessibility needs, places to avoid and special requests.

2. Functions
- `create_trip`: replaced with a version that also accepts the preferences object. The previous 11-argument version is removed so there is only one creation function.

3. Security
- No change to row level security. Trip tables keep the same anon and authenticated policies.
- The function still runs with the caller's permissions and is granted only to anon and authenticated.

4. Important notes
- Preferences are flexible metadata, not core relational data, so jsonb is appropriate here.
- Idempotent: safe to re-run.
*/

ALTER TABLE trips ADD COLUMN IF NOT EXISTS preferences jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE trips DROP CONSTRAINT IF EXISTS trips_preferences_object;
ALTER TABLE trips ADD CONSTRAINT trips_preferences_object CHECK (jsonb_typeof(preferences) = 'object');

DROP FUNCTION IF EXISTS create_trip(text, text, date, date, integer, integer, integer, text[], bigint, text, text);

CREATE OR REPLACE FUNCTION create_trip(
  p_destination text,
  p_origin text,
  p_start_date date,
  p_end_date date,
  p_adults integer,
  p_children integer,
  p_infants integer,
  p_travel_styles text[],
  p_budget_minor bigint,
  p_currency text,
  p_notes text,
  p_preferences jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_trip_id uuid;
BEGIN
  IF p_end_date < p_start_date THEN
    RAISE EXCEPTION 'End date must be on or after the start date' USING ERRCODE = '22023';
  END IF;

  IF p_end_date - p_start_date > 60 THEN
    RAISE EXCEPTION 'Trips can be at most 61 days long' USING ERRCODE = '22023';
  END IF;

  INSERT INTO trips (
    title, origin, destination, start_date, end_date,
    adults, children, infants, travel_styles, budget_minor, currency, notes, preferences
  )
  VALUES (
    p_destination, COALESCE(p_origin, ''), p_destination, p_start_date, p_end_date,
    p_adults, p_children, p_infants, COALESCE(p_travel_styles, '{}'), p_budget_minor, p_currency,
    COALESCE(p_notes, ''), COALESCE(p_preferences, '{}'::jsonb)
  )
  RETURNING id INTO v_trip_id;

  INSERT INTO trip_days (trip_id, day_number, day_date)
  SELECT v_trip_id, g.n, p_start_date + (g.n - 1)
  FROM generate_series(1, p_end_date - p_start_date + 1) AS g(n);

  RETURN v_trip_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_trip(text, text, date, date, integer, integer, integer, text[], bigint, text, text, jsonb) TO anon, authenticated;
