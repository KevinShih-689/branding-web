ALTER TABLE "certifications" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public read access" ON "certifications" AS PERMISSIVE FOR SELECT TO public USING (true);--> statement-breakpoint
CREATE POLICY "Enable insert for users based on category ownership" ON "certifications" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (
        "certifications"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can update their own certifications" ON "certifications" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        "certifications"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      ) WITH CHECK (
        "certifications"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      );