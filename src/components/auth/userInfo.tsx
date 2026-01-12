import { getProfileByUserId } from "@/apis/profiles";
import { db } from "@/lib/db";
import { Profile } from "@/types/user";

export default async function userInfo() {
  const user = db.useUser();
  const profile: Profile | null = await getProfileByUserId(user.id);

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
