"use server";

import { createProfileForUser, isExistingProfile } from "@/apis/auth/serverProfiles";
import { serverDb } from "@/lib/serverDb";
import { userRole } from "@/types/user";

async function isAdmin(userEmail: string): Promise<boolean> {
  return process.env.ADMIN_USER_EMAILS
    ? process.env.ADMIN_USER_EMAILS.split(",")
        .map((email) => email.trim())
        .includes(userEmail)
    : false;
}

export async function createProfile(
  userRefreshToken: string,
  name: string,
): Promise<void> {
  const user = await serverDb.auth.getUser({refresh_token: userRefreshToken});

  if (!user) {
    throw new Error("ユーザー情報の取得に失敗しました");
  }

  const userId: string = user.id;
  const userEmail: string = user.email || "";

  if (!userEmail) {
    throw new Error("ユーザーのメールアドレスが取得できませんでした");
  }

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
