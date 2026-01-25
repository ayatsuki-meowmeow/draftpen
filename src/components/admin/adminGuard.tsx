import { profileQuery } from "@/apis/auth/profiles";
import { db } from "@/lib/db";
import { getProfile, isAdminProfile } from "@/services/auth/actions";
import { Profile } from "@/types/user";
import { User } from "@instantdb/react";

export async function adminGuard({ children }: { children: React.ReactNode }) {
  const currentUser: User = db.useUser();
  const {
    isLoading: isLoadingRawProfiles,
    error: errorRawProfiles,
    data: rawProfiles,
  } = db.useQuery(profileQuery.byUserId(currentUser.id));

  if (isLoadingRawProfiles) {
    return <div>Loading...</div>;
  }

  if (errorRawProfiles) {
    return <div>プロフィール情報の取得中にエラーが発生しました。</div>;
  }

  if (!rawProfiles) {
    return <div>プロフィール情報の取得に失敗しました。</div>;
  }

  const currentProfile: Profile = getProfile(rawProfiles.profiles);
  const isAdmin: boolean = isAdminProfile(currentProfile);

  if (!isAdmin) {
    return <div>管理者権限が必要です</div>;
  }

  return <>{children}</>;
}
