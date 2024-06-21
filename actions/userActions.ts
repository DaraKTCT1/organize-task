"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (userId: number) => {
  const user = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      todos: true,
    },
  });
  return user;
};

export const addUser = async () => {
  await db.insert(users).values({
    name: "dara",
    email: "daraopenai31@gmail.com",
  });
  revalidatePath("/");
};
