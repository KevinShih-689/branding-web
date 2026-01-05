ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "experiences" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "experience_details" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "skill_categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "tech_tools" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "contact_submissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "documents" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER POLICY "public read access" ON "certifications" RENAME TO "Public read access";--> statement-breakpoint
CREATE POLICY "Users can only read their own profile" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("profiles"."id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only insert profile with their own id" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("profiles"."id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only update their own profile" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("profiles"."id" = auth.uid()) WITH CHECK ("profiles"."id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only read their own experiences" ON "experiences" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("experiences"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only insert experiences for themselves" ON "experiences" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("experiences"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only update their own experiences" ON "experiences" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("experiences"."profile_id" = auth.uid()) WITH CHECK ("experiences"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only read experience details for their own experiences" ON "experience_details" AS PERMISSIVE FOR SELECT TO "authenticated" USING (
        "experience_details"."experience_id" IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can only insert experience details for their own experiences" ON "experience_details" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (
        "experience_details"."experience_id" IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can only update experience details for their own experiences" ON "experience_details" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        "experience_details"."experience_id" IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      ) WITH CHECK (
        "experience_details"."experience_id" IN (
          SELECT id FROM experiences WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can only read their own skill categories" ON "skill_categories" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("skill_categories"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only insert skill categories for themselves" ON "skill_categories" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("skill_categories"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only update their own skill categories" ON "skill_categories" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("skill_categories"."profile_id" = auth.uid()) WITH CHECK ("skill_categories"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "All authenticated users can read tech tools" ON "tech_tools" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "Users can only insert tech tools for their own categories" ON "tech_tools" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (
        "tech_tools"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can only update tech tools for their own categories" ON "tech_tools" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (
        "tech_tools"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      ) WITH CHECK (
        "tech_tools"."category_id" IN (
          SELECT id FROM skill_categories WHERE profile_id = auth.uid()
        )
      );--> statement-breakpoint
CREATE POLICY "Users can only read their own contact submissions" ON "contact_submissions" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("contact_submissions"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only insert contact submissions for themselves" ON "contact_submissions" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("contact_submissions"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only update their own contact submissions" ON "contact_submissions" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("contact_submissions"."profile_id" = auth.uid()) WITH CHECK ("contact_submissions"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only read their own documents" ON "documents" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("documents"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only insert documents for themselves" ON "documents" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ("documents"."profile_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "Users can only update their own documents" ON "documents" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ("documents"."profile_id" = auth.uid()) WITH CHECK ("documents"."profile_id" = auth.uid());