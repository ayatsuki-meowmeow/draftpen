import { IS_DEVELOPMENT } from "@/lib/constants";

export function DbError({ error }: { error: { message: string } }) {
  if (IS_DEVELOPMENT) {
    return <div className="p-4">エラー: {error.message}</div>;
  }
  return (
    <div className="p-4">
      エラーが発生しました。時間を置いてからアクセスしてください。
    </div>
  );
}
