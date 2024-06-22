"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
// import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (userId: any) => {
  const user = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.clerkId, userId),
    with: {
      todos: true,
    },
  });
  return user;
};

export const addUser = async (user: any) => {
  await db
    .insert(users)
    .values({
      clerkId: user?.clerkId,
      email: user?.email,
      photo: user?.photo,
      firstName: user?.firstName,
      lastName: user?.lastName,
      name: user?.name!,
    })
    .returning({ clerkClientId: users?.clerkId });

  // revalidatePath("/");
};
