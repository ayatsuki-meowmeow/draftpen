import { db } from "@/lib/db";
import { RawProfile } from "@/types/user";

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

export async function getCurrentUserProfile(userId: string): Promise<RawProfile[]> {
  const query = profileQuery.byUserId(userId);
  return (await db.queryOnce(query)).data.profiles;
}
