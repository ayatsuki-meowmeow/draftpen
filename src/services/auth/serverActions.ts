"use server";

import {
  createProfileForUser,
  isExistingProfile,
} from "@/apis/auth/serverProfiles";
import { serverDb } from "@/lib/serverDb";
import { UserRole } from "@/types/user";

async function isAdminEmail(userEmail: string): Promise<boolean> {
  const adminEmails = process.env.ADMIN_USER_EMAILS;

  if (!adminEmails) {
    // adminEmailsの存在をユーザーは知ることができないため、エラーメッセージは一般的なものにする
    throw new Error("現在新規ユーザーの作成はできません");
  }

  return adminEmails
    ? adminEmails
        .split(",")
        .map((email) => email.trim())
        .includes(userEmail)
    : false;
}

export async function createProfile(
  userRefreshToken: string,
  name: string,
): Promise<void> {
  const user = await serverDb.auth.getUser({ refresh_token: userRefreshToken });

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

  const isAdminUser: boolean = await isAdminEmail(userEmail);

  const role: UserRole = isAdminUser ? "admin" : "viewer";

  await createProfileForUser(userId, role, name);
}
