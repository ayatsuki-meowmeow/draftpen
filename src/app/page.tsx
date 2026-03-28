"use client";

import { PostCard } from "@/components/main/postCard";
import { mockArticles } from "@/mocks/articles";
import { isPublished } from "@/services/aritcle/actions";
import { convertDateToString } from "@/utils";

function App() {
  return (
    <div className="font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
      <h2 className="tracking-wide text-5xl text-gray-300">todos</h2>
      <div className="border border-gray-300 max-w-xs w-full">
        {mockArticles.filter(isPublished).map((object) => {
          return PostCard({
            id: object.id,
            title: object.title,
            publishedAt: convertDateToString(object.publishedAt),
            lastUpdatedAt: convertDateToString(object.updatedAt),
          });
        })}
      </div>
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
