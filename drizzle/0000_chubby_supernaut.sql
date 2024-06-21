CREATE TABLE IF NOT EXISTS "todos" (
	"id" bigint PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"clerkId" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"photo" text NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"update_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;