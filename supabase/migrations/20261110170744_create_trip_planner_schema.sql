/*
# Create trip planner schema

1. New Tables
- `trips`: one planned trip with destination, origin, dates, travellers, travel styles, budget (stored as integer minor units, e.g. cents) and currency code.
- `trip_days`: one row per calendar day of a trip, ordered by day number.
- `trip_activities`: activities placed on a specific day, grouped by time slot (morning, afternoon, evening), with duration, estimated cost and a manual sort position.

2. Functions
- `create_trip(...)`: validates the trip details, saves the trip and creates all of its day rows in one transaction so a trip is never saved without its days.

3. Security
- Row level security is enabled on all three tables.
- The app has no sign-in yet, so the anon and authenticated roles get CRUD access. This is intentional for this stage and must be replaced with owner-scoped policies when accounts are added.
- `create_trip` runs with the caller's permissions and is granted only to anon and authenticated.

4. Important notes
- Money is never stored as floating point. All amounts are integers in minor units.
- Deleting a trip removes its days and activities (cascade).
- Idempotent: safe to re-run.
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  origin text NOT NULL DEFAULT '',
  destination text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  adults integer NOT NULL DEFAULT 1,
  children integer NOT NULL DEFAULT 0,
  infants integer NOT NULL DEFAULT 0,
  travel_styles text[] NOT NULL DEFAULT '{}',
  budget_minor bigint NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT trips_dates_valid CHECK (end_date >= start_date),
  CONSTRAINT trips_adults_min CHECK (adults >= 1),
  CONSTRAINT trips_children_min CHECK (children >= 0),
  CONSTRAINT trips_infants_min CHECK (infants >= 0),
  CONSTRAINT trips_budget_min CHECK (budget_minor >= 0),
  CONSTRAINT trips_currency_format CHECK (currency ~ '^[A-Z]{3}$')
);

CREATE TABLE IF NOT EXISTS trip_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  day_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT trip_days_number_positive CHECK (day_number >= 1),
  CONSTRAINT trip_days_unique_number UNIQUE (trip_id, day_number),
  CONSTRAINT trip_days_unique_date UNIQUE (trip_id, day_date)
);

CREATE TABLE IF NOT EXISTS trip_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  trip_day_id uuid NOT NULL REFERENCES trip_days(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  time_slot text NOT NULL DEFAULT 'MORNING',
  start_time time,
  duration_minutes integer,
  estimated_cost_minor bigint NOT NULL DEFAULT 0,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT trip_activities_time_slot_valid CHECK (time_slot IN ('MORNING', 'AFTERNOON', 'EVENING')),
  CONSTRAINT trip_activities_duration_positive CHECK (duration_minutes IS NULL OR duration_minutes > 0),
  CONSTRAINT trip_activities_cost_min CHECK (estimated_cost_minor >= 0),
  CONSTRAINT trip_activities_title_not_blank CHECK (length(btrim(title)) > 0)
);

CREATE INDEX IF NOT EXISTS trips_start_date_idx ON trips (start_date);
CREATE INDEX IF NOT EXISTS trip_days_trip_id_idx ON trip_days (trip_id);
CREATE INDEX IF NOT EXISTS trip_activities_trip_id_idx ON trip_activities (trip_id);
CREATE INDEX IF NOT EXISTS trip_activities_day_order_idx ON trip_activities (trip_day_id, time_slot, position);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_activities ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON trips TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON trip_days TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON trip_activities TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_trips" ON trips;
CREATE POLICY "anon_select_trips" ON trips FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trips" ON trips;
CREATE POLICY "anon_insert_trips" ON trips FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trips" ON trips;
CREATE POLICY "anon_update_trips" ON trips FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trips" ON trips;
CREATE POLICY "anon_delete_trips" ON trips FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_trip_days" ON trip_days;
CREATE POLICY "anon_select_trip_days" ON trip_days FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trip_days" ON trip_days;
CREATE POLICY "anon_insert_trip_days" ON trip_days FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trip_days" ON trip_days;
CREATE POLICY "anon_update_trip_days" ON trip_days FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trip_days" ON trip_days;
CREATE POLICY "anon_delete_trip_days" ON trip_days FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_trip_activities" ON trip_activities;
CREATE POLICY "anon_select_trip_activities" ON trip_activities FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_trip_activities" ON trip_activities;
CREATE POLICY "anon_insert_trip_activities" ON trip_activities FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_trip_activities" ON trip_activities;
CREATE POLICY "anon_update_trip_activities" ON trip_activities FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_trip_activities" ON trip_activities;
CREATE POLICY "anon_delete_trip_activities" ON trip_activities FOR DELETE
  TO anon, authenticated USING (true);

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
  p_notes text
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
    adults, children, infants, travel_styles, budget_minor, currency, notes
  )
  VALUES (
    p_destination, COALESCE(p_origin, ''), p_destination, p_start_date, p_end_date,
    p_adults, p_children, p_infants, COALESCE(p_travel_styles, '{}'), p_budget_minor, p_currency, COALESCE(p_notes, '')
  )
  RETURNING id INTO v_trip_id;

  INSERT INTO trip_days (trip_id, day_number, day_date)
  SELECT v_trip_id, g.n, p_start_date + (g.n - 1)
  FROM generate_series(1, p_end_date - p_start_date + 1) AS g(n);

  RETURN v_trip_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_trip(text, text, date, date, integer, integer, integer, text[], bigint, text, text) TO anon, authenticated;
