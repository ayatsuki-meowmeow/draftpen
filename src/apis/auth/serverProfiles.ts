"use server";

import { serverDb } from "@/lib/serverDb";
import { profileQuery } from "./profiles";
import { id } from "@instantdb/react";
import { UserRole } from "@/types/user";

export async function isExistingProfile(userId: string): Promise<boolean> {
  const result = await serverDb.query(profileQuery.byUserId(userId));
  return result.profiles.length > 0;
}

export async function createProfileForUser(
  userId: string,
  role: UserRole,
  name: string,
): Promise<void> {
  await serverDb.transact(
    serverDb.tx.profiles[id()]
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
