"use client";

import { profileQuery } from "@/apis/auth/profiles";
import { db } from "@/lib/db";
import { getProfile, isAdminProfile } from "@/services/auth/actions";
import { Profile } from "@/types/user";
import { toRawProfile } from "@/repositories/profile";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, error, user } = db.useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ユーザー情報の取得中にエラーが発生しました。</div>;
  }

  if (!user) {
    return <div>ログインが必要です</div>;
  }

  return <AdminGuardInner userId={user.id}>{children}</AdminGuardInner>;
}

function AdminGuardInner({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const {
    isLoading,
    error,
    data: rawProfiles,
  } = db.useQuery(profileQuery.byUserId(userId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ユーザー情報の取得中にエラーが発生しました。</div>;
  }

  if (!rawProfiles) {
    return <div>ユーザー情報の取得に失敗しました。</div>;
  }

  const currentProfile: Profile = getProfile(
    rawProfiles.profiles.map(toRawProfile),
  );

  if (!isAdminProfile(currentProfile)) {
    return <div>管理者権限が必要です</div>;
  }

  return <>{children}</>;
}
