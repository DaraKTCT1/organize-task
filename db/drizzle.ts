import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(
  "postgresql://todos_owner:yEGdCk2Sqo6W@ep-floral-band-a55lmw5y-pooler.us-east-2.aws.neon.tech/todos?sslmode=require"
);

export const db = drizzle(sql, { schema });
