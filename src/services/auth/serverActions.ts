"use server";

import { createProfileForUser, isExistingProfile } from "@/apis/auth/serverProfiles";
import { userRole } from "@/types/user";

async function isAdmin(userEmail: string): Promise<boolean> {
  return process.env.ADMIN_USER_EMAILS
    ? process.env.ADMIN_USER_EMAILS.split(",")
        .map((email) => email.trim())
        .includes(userEmail)
    : false;
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
