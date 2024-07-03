import { relations } from "drizzle-orm";
import {
  integer,
  text,
  boolean,
  pgTable,
  serial,
  timestamp,
  bigint,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull(),
  clerkId: text("clerkId").notNull(),
  firstName: varchar("firstName", { length: 256 }),
  lastName: varchar("lastName", { length: 256 }),
  photo: text("photo").notNull(),
  createAt: timestamp("create_at").notNull().defaultNow(),
  updateAt: timestamp("update_at").notNull().defaultNow(),
});

export const todos = pgTable("todos", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  createAt: timestamp("create_at").notNull().defaultNow(),
  updateAt: timestamp("update_at").notNull().defaultNow(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const todosRelation = relations(todos, ({ one }) => ({
  users: one(users, { fields: [todos.userId], references: [users.id] }),
}));

export const usersRelation = relations(users, ({ many }) => ({
  todos: many(todos),
}));
