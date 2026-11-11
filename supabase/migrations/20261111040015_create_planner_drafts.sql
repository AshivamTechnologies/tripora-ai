/*
# Save planner progress per account

Plain-English summary
Each signed-in person gets one saved planner draft. It is updated every time they move to another step of the trip planner, so a half-finished trip is still there after closing the tab. It is deleted once their trip is created.

1. New table: planner_drafts
- `user_id` (uuid): the owner. It defaults to the signed-in user and is also the primary key, so each person has exactly one draft.
- `draft` (jsonb): the planner answers. Must be a JSON object.
- `step_index` (integer): the step the person was on, from 0 to 6.
- `updated_at` (timestamp): when the draft was last saved.

2. Security
- Row level security is enabled.
- Only the `authenticated` role can use the table, and only for its own row. Select, insert, update, and delete each have their own owner-scoped policy.
- Anonymous visitors cannot read or write drafts.

3. Important notes
- Deleting an account deletes its draft.
- Re-running this migration is safe.
*/

CREATE TABLE IF NOT EXISTS planner_drafts (
  user_id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  draft jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(draft) = 'object'),
  step_index integer NOT NULL DEFAULT 0 CHECK (step_index BETWEEN 0 AND 6),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE planner_drafts ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON planner_drafts FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON planner_drafts TO authenticated;

DROP POLICY IF EXISTS "select_own_planner_draft" ON planner_drafts;
CREATE POLICY "select_own_planner_draft" ON planner_drafts FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_planner_draft" ON planner_drafts;
CREATE POLICY "insert_own_planner_draft" ON planner_drafts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_planner_draft" ON planner_drafts;
CREATE POLICY "update_own_planner_draft" ON planner_drafts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_planner_draft" ON planner_drafts;
CREATE POLICY "delete_own_planner_draft" ON planner_drafts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
