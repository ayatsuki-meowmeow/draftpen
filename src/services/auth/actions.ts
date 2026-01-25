import { getCurrentUserProfile } from "@/apis/auth/profiles";
import { Profile, RawProfile, userRole } from "@/types/user";

function mapProfile(raw: RawProfile): Profile {
  return {
    ...raw,
    role: raw.role as userRole,
  };
}

export function getFirstProfile(profiles: RawProfile[]): Profile | null {
  if (profiles.length === 0) {
    return null;
  }

  return mapProfile(profiles[0]);
}

export async function getProfile(userId: string): Promise<Profile> {
  const RawProfile = await getCurrentUserProfile(userId);
  const profile = getFirstProfile(RawProfile);

  if (!profile) {
    throw new Error("プロフィール情報の取得に失敗しました");
  }

  return profile;
}
