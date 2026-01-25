"use client";

import { profileQuery } from "@/apis/auth/profiles";
import { db } from "@/lib/db";
import { getProfile, isAdminProfile } from "@/services/auth/actions";
import { Profile } from "@/types/user";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading: isLoadingUser, error: errorUser, user } = db.useAuth();

  const {
    isLoading: isLoadingRawProfiles,
    error: errorRawProfiles,
    data: rawProfiles,
  } = db.useQuery(user ? profileQuery.byUserId(user.id) : null);

  if (isLoadingUser || isLoadingRawProfiles) {
    return <div>Loading...</div>;
  }

  if (errorUser || errorRawProfiles) {
    return <div>ユーザー情報の取得中にエラーが発生しました。</div>;
  }

  if (!user) {
    return <div>ログインが必要です</div>;
  }

  if (!rawProfiles) {
    return <div>ユーザー情報の取得に失敗しました。</div>;
  }

  const currentProfile: Profile = getProfile(rawProfiles.profiles);
  const isAdmin: boolean = isAdminProfile(currentProfile);

  if (!isAdmin) {
    return <div>管理者権限が必要です</div>;
  }

  return <>{children}</>;
}
