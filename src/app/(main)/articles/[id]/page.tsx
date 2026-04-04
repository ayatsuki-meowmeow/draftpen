"use client";

import { USE_MOCK } from "@/lib/constants";
import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { isPublished } from "@/services/article/actions";
import { Article, PublishedArticle } from "@/types/article";
import { convertDateString } from "@/utils";
import { useParams } from "next/navigation";

function App() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = db.useQuery({
    articles: { $: { where: { id } } },
  });

  if (!USE_MOCK && isLoading)
    return <div className="p-4">読み込み中です...</div>;

  if (!USE_MOCK && error)
    return (
      <div className="p-4">
        エラーが発生しました。
        <br />
        再読み込みしてください。
      </div>
    );

  // const article: PublishedArticle | undefined = USE_MOCK ? mockArticles.filter(isPublished)[0] : (data?.articles ?? []).map(toArticle).filter(isPublished)[0];

  const rawArticle: Article[] | undefined = USE_MOCK
    ? mockArticles
    : (data?.articles ?? []).map(toArticle);

  if (!rawArticle) return <div className="p-4">記事が見つかりません。</div>;

  const article: PublishedArticle | undefined =
    rawArticle.filter(isPublished)[0];

  if (!article) return <div className="p-4">記事が見つかりません。</div>;

  return (
    <div className="flex flex-col items-center justify-start m-6">
      <h2 className="font-bold mb-2 text-4xl">{article.title}</h2>
      <span className="mb-4">
        <p>公開日: {convertDateString(article.publishedAt)}</p>
        <p>最終更新日: {convertDateString(article.updatedAt)}</p>
      </span>
      <p className="text-xl">{article.content}</p>
    </div>
  );
}

export default App;
