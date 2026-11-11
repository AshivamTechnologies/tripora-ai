/*
# Scope trips to their owners (sign-in required)

Plain-English summary
Each trip now belongs to the account that created it. Signed-in people can only see, change, and delete their own trips and the days and activities inside them. Nobody can use the app anonymously any more.

1. Modified table: trips
- New column `user_id` (uuid). It defaults to the currently signed-in user, so trips created from the app are owned automatically.
- Trips created before this change have no owner (`user_id` is empty). They are kept in the database but are hidden from everyone, because no account can prove ownership of them. Nothing is deleted.
- Index on `user_id` for fast lookups of a person's trips.

2. Security
- Anonymous access is removed from `trips`, `trip_days`, and `trip_activities`. Only the `authenticated` role keeps access.
- Old open policies (named anon_*) are dropped.
- Owner-scoped policies are created for select, insert, update, and delete on each table:
  - trips: the row's `user_id` must equal the signed-in user.
  - trip_days and trip_activities: the parent trip must belong to the signed-in user.
- The `create_trip` function is callable only by signed-in users.

3. Important notes
- Deleting an account removes its trips (cascade).
- Trip days and activities are protected through their parent trip, so they cannot be read or changed by other users.
*/

ALTER TABLE trips ADD COLUMN IF NOT EXISTS user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS trips_user_id_idx ON trips (user_id);

REVOKE ALL ON trips, trip_days, trip_activities FROM anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON trips, trip_days, trip_activities TO authenticated;

DROP POLICY IF EXISTS "anon_select_trips" ON trips;
DROP POLICY IF EXISTS "anon_insert_trips" ON trips;
DROP POLICY IF EXISTS "anon_update_trips" ON trips;
DROP POLICY IF EXISTS "anon_delete_trips" ON trips;
DROP POLICY IF EXISTS "anon_select_trip_days" ON trip_days;
DROP POLICY IF EXISTS "anon_insert_trip_days" ON trip_days;
DROP POLICY IF EXISTS "anon_update_trip_days" ON trip_days;
DROP POLICY IF EXISTS "anon_delete_trip_days" ON trip_days;
DROP POLICY IF EXISTS "anon_select_trip_activities" ON trip_activities;
DROP POLICY IF EXISTS "anon_insert_trip_activities" ON trip_activities;
DROP POLICY IF EXISTS "anon_update_trip_activities" ON trip_activities;
DROP POLICY IF EXISTS "anon_delete_trip_activities" ON trip_activities;

DROP POLICY IF EXISTS "select_own_trips" ON trips;
CREATE POLICY "select_own_trips" ON trips FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_trips" ON trips;
CREATE POLICY "insert_own_trips" ON trips FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_trips" ON trips;
CREATE POLICY "update_own_trips" ON trips FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_trips" ON trips;
CREATE POLICY "delete_own_trips" ON trips FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "select_own_trip_days" ON trip_days;
CREATE POLICY "select_own_trip_days" ON trip_days FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_trip_days" ON trip_days;
CREATE POLICY "insert_own_trip_days" ON trip_days FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "update_own_trip_days" ON trip_days;
CREATE POLICY "update_own_trip_days" ON trip_days FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_trip_days" ON trip_days;
CREATE POLICY "delete_own_trip_days" ON trip_days FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "select_own_trip_activities" ON trip_activities;
CREATE POLICY "select_own_trip_activities" ON trip_activities FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_activities.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_trip_activities" ON trip_activities;
CREATE POLICY "insert_own_trip_activities" ON trip_activities FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_activities.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "update_own_trip_activities" ON trip_activities;
CREATE POLICY "update_own_trip_activities" ON trip_activities FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_activities.trip_id AND t.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_activities.trip_id AND t.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_trip_activities" ON trip_activities;
CREATE POLICY "delete_own_trip_activities" ON trip_activities FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM trips t WHERE t.id = trip_activities.trip_id AND t.user_id = auth.uid())
  );

REVOKE EXECUTE ON FUNCTION public.create_trip(text, text, date, date, integer, integer, integer, text[], bigint, text, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_trip(text, text, date, date, integer, integer, integer, text[], bigint, text, text, jsonb) TO authenticated;
