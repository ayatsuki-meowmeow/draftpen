"use client";

import { profileQuery } from "@/apis/auth/profiles";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getFirstProfile } from "@/services/auth/actions";
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
    <div className="flex flex-col p-4 gap-2 justify-center items-center">
      <h1>
        Hello {profile.name}! Your Role is {profile.role}
      </h1>
      <Button
        onClick={() => {
          db.auth.signOut();
        }}
        className="w-40"
      >
        ログアウト
      </Button>
    </div>
  );
}
