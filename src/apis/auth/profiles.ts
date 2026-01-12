import { db } from "@/lib/db";
import { userRole } from "@/types/user";

export const profileQuery = {
  byUserId: (userId: string) => ({
    profiles: {
      $: {
        where: {
          "user.id": userId,
        },
      },
    },
  }),
};

export async function isExistingProfile(userId: string): Promise<boolean> {
  const result = await db.queryOnce(profileQuery.byUserId(userId));
  return result.data.profiles.length > 0;
}

export async function createProfileForUser(
  userId: string,
  role: userRole,
  name: string,
): Promise<void> {
  await db.transact(
    db.tx.profiles[userId]
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
