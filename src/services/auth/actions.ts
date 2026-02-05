import { Profile, RawProfile, UserRole } from "@/types/user";

function mapProfile(raw: RawProfile): Profile {
  return {
    ...raw,
    role: raw.role as UserRole,
  };
}

export function getFirstProfile(profiles: RawProfile[]): Profile | null {
  if (profiles.length === 0) {
    return null;
  }

  const firstProfile = profiles[0];
  if (!firstProfile) {
    throw new Error("profile is not found");
  }

  return mapProfile(firstProfile);
}

export function getProfile(rawProfiles: RawProfile[]): Profile {
  const profile = getFirstProfile(rawProfiles);

  if (!profile) {
    throw new Error("プロフィール情報の取得に失敗しました");
  }

  return profile;
}

export function isAdminProfile(profile: Profile): boolean {
  return profile.role === UserRole.ADMIN;
}
