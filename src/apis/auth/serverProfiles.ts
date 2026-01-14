"use server";

import { serverDb } from "@/lib/serverDb";
import { userRole } from "@/types/user";
import { profileQuery } from "./profiles";

export async function isExistingProfile(userId: string): Promise<boolean> {
  const result = await serverDb.query(profileQuery.byUserId(userId));
  return result.profiles.length > 0;
}

export async function createProfileForUser(
  userId: string,
  role: userRole,
  name: string,
): Promise<void> {
  await serverDb.transact(
    serverDb.tx.profiles[userId]
      .create({
        name,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .link({
        user: userId,
      }),
  );
}
