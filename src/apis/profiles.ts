import { db } from "@/lib/db";
import { Profile, RawProfile } from "@/types/user";

export async function createProfileForUser(
  userId: string,
  name: string,
): Promise<void> {
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

export async function getProfileByUserId(
  userId: string,
): Promise<Profile | null> {
  const query = {
    profiles: {
      $: {
        where: {
          "user.id": userId,
        },
      },
    },
  };

  try {
    const resultRaw = await db.queryOnce(query);
    const rawProfile: RawProfile = resultRaw.data.profiles[0];
    if (!rawProfile) {
      return null;
    }
    return mapProfile(rawProfile);
  } catch (error) {
    throw new Error(`Error fetching profile: ${error}`);
  }
}
