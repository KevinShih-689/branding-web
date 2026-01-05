CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"full_name" text,
	"headline" text,
	"avatar_url" text,
	"email" text,
	"phone" text,
	"location" text,
	"bio" text,
	"github_url" text,
	"linkedin_url" text,
	"cake_resume_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"company_name" text NOT NULL,
	"company_link" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "experience_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experience_id" uuid NOT NULL,
	"position" text NOT NULL,
	"content" text[] NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "skill_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"name" text NOT NULL,
	"proficiency" smallint,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_enable" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tech_tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" text NOT NULL,
	"icon_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" text NOT NULL,
	"issuer" text,
	"issue_date" date,
	"credential_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"sender_name" text NOT NULL,
	"sender_email" text NOT NULL,
	"message" text NOT NULL,
	"is_sent" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_details" ADD CONSTRAINT "experience_details_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skill_categories" ADD CONSTRAINT "skill_categories_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tech_tools" ADD CONSTRAINT "tech_tools_category_id_skill_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."skill_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_category_id_skill_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."skill_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "profiles_slug_idx" ON "profiles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "experiences_profile_id_idx" ON "experiences" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "experiences_profile_id_display_order_deleted_at_idx" ON "experiences" USING btree ("profile_id","display_order","deleted_at") WHERE "experiences"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "experience_details_experience_id_idx" ON "experience_details" USING btree ("experience_id");--> statement-breakpoint
CREATE INDEX "experience_details_experience_id_display_order_deleted_at_idx" ON "experience_details" USING btree ("experience_id","display_order","deleted_at") WHERE "experience_details"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "skill_categories_profile_id_idx" ON "skill_categories" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "skill_categories_profile_id_is_enable_deleted_at_idx" ON "skill_categories" USING btree ("profile_id","is_enable","deleted_at") WHERE "skill_categories"."deleted_at" IS NULL AND "skill_categories"."is_enable" = true;--> statement-breakpoint
CREATE INDEX "skill_categories_profile_id_display_order_deleted_at_idx" ON "skill_categories" USING btree ("profile_id","display_order","deleted_at") WHERE "skill_categories"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "tech_tools_category_id_idx" ON "tech_tools" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "tech_tools_category_id_deleted_at_idx" ON "tech_tools" USING btree ("category_id","deleted_at") WHERE "tech_tools"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "certifications_category_id_idx" ON "certifications" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "certifications_category_id_issue_date_deleted_at_idx" ON "certifications" USING btree ("category_id","issue_date","deleted_at") WHERE "certifications"."deleted_at" IS NULL;--> statement-breakpoint
CREATE INDEX "contact_submissions_profile_id_idx" ON "contact_submissions" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "contact_submissions_profile_id_is_sent_idx" ON "contact_submissions" USING btree ("profile_id","is_sent") WHERE "contact_submissions"."is_sent" = false;--> statement-breakpoint
CREATE INDEX "contact_submissions_profile_id_created_at_idx" ON "contact_submissions" USING btree ("profile_id","created_at");--> statement-breakpoint
CREATE INDEX "documents_profile_id_idx" ON "documents" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "documents_embedding_idx" ON "documents" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "documents_profile_id_created_at_idx" ON "documents" USING btree ("profile_id","created_at");