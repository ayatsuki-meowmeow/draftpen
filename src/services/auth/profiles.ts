import { createProfileForUser, isExistingProfile } from "@/apis/auth/profiles";
import { Profile, RawProfile, userRole } from "@/types/user";
import { isAdmin } from "./serverActions";

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

export async function createProfile(
  userId: string,
  userEmail: string,
  name: string,
): Promise<void> {
  const isExist: boolean = await isExistingProfile(userId);
  if (isExist) {
    return;
  }

  const isAdminUser: boolean = await isAdmin(userEmail);

  console.log("Creating profile for user:", {
    userId,
    userEmail,
    name,
    isAdminUser,
  });

  const role: userRole = isAdminUser ? "admin" : "viewer";

  await createProfileForUser(userId, role, name);
}
