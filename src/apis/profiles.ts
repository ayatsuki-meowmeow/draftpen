import { db } from "@/lib/db";
import { Profile, RawProfile } from "@/types/user";

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

async function isExistingProfile(userId: string): Promise<boolean> {
  const result = await db.queryOnce(profileQuery.byUserId(userId));
  return result.data.profiles.length > 0;
}

export async function createProfileForUser(
  userId: string,
  name: string,
): Promise<void> {
  const isExist: boolean = await isExistingProfile(userId);
  if (isExist) {
    return;
  }

  await db.transact(
    db.tx.profiles[userId]
      .create({
        name,
        role: "viewer",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .link({
        user: userId,
      }),
  );
}

function mapProfile(raw: RawProfile): Profile {
  return {
    ...raw,
    role: raw.role as "admin" | "editor" | "viewer",
  };
}

export function getFirstProfile(profiles: RawProfile[]): Profile | null {
  if (profiles.length === 0) {
    return null;
  }

  return mapProfile(profiles[0]);
}
