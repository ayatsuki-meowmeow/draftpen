"use client";

import { PostCard } from "@/components/main/postCard";
import { DbError } from "@/components/ui/db-error";
import { db } from "@/lib/db";
import { USE_MOCK } from "@/lib/constants";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { convertDateString } from "@/utils";
import { isPublished, sortByPublishedAt } from "@/services/article/actions";

function App() {
  const { isLoading, error, data } = db.useQuery({
    articles: {
      $: { order: { publishedAt: "desc" }, where: { status: "published" } },
    },
  });

  if (!USE_MOCK && isLoading) return <div className="p-4">読み込み中...</div>;
  if (!USE_MOCK && error) return <DbError error={error} />;

  const articles = (
    USE_MOCK
      ? sortByPublishedAt(mockArticles)
      : (data?.articles ?? []).map(toArticle)
  ).filter(isPublished);

  return (
    <div className="font-mono min-h-screen flex flex-col pt-12 px-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((object) => (
          <PostCard
            id={object.id}
            key={object.id}
            title={object.title}
            publishedAt={convertDateString(object.publishedAt)}
            lastUpdatedAt={convertDateString(object.updatedAt)}
          />
        ))}
      </div>
      {/* TODO: デプロイ前にログインリンクは削除する */}
      <div className="text-xs text-center">
        <span>ログインは</span>
        <a className="text-blue-500 underline ml-1" href="/admin/auth">
          こちら
        </a>
      </div>
    </div>
  );
}

export default App;
