"use client";

import { PostCard } from "@/components/main/postCard";
import { mockArticles } from "@/mocks/articles";
import { isPublished } from "@/services/aritcle/actions";
import { convertDateToString } from "@/utils";

function App() {
  return (
    <div className="font-mono min-h-screen flex flex-col pt-12 px-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockArticles.filter(isPublished).map((object) => (
          <PostCard
            id={object.id}
            key={object.id}
            title={object.title}
            publishedAt={convertDateToString(object.publishedAt)}
            lastUpdatedAt={convertDateToString(object.updatedAt)}
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
