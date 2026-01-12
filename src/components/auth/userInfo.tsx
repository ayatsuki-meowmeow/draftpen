"use client";

import { profileQuery, getFirstProfile } from "@/apis/profiles";
import { db } from "@/lib/db";
import { Profile } from "@/types/user";

export default function UserInfo() {
  const userId: string = db.useUser().id;

  const { data, isLoading, error } = db.useQuery(profileQuery.byUserId(userId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>プロフィール情報の取得中にエラーが発生しました。</div>;
  }

  if (!data) {
    return <div>プロフィール情報の取得に失敗しました。</div>;
  }

  const profile: Profile | null = getFirstProfile(data.profiles);

  if (!profile) {
    return <div>プロフィール情報の取得に失敗しました。</div>;
  }

  return (
    <div>
      <h1>Hello {profile.name}!</h1>
      <span>Your Role is {profile.role}</span>
    </div>
  );
}
