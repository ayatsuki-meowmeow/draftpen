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
