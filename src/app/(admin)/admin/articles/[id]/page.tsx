"use client";

import { Button } from "@/components/ui/button";
import { DbError } from "@/components/ui/db-error";
import { USE_MOCK } from "@/lib/constants";
import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { Article } from "@/types/article";
import { convertDateString } from "@/utils";
import { useParams } from "next/navigation";

export default function AdminArticleEditPage() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = db.useQuery({
    articles: { $: { where: { id } } },
  });

  if (!USE_MOCK && isLoading)
    return <div className="p-4">読み込み中です...</div>;

  if (!USE_MOCK && error) return <DbError error={error} />;

  const rawArticle: Article | undefined = USE_MOCK
    ? mockArticles.find((obj) => obj.id === id)
    : (data?.articles ?? []).map(toArticle)[0];

  if (!rawArticle) return <div className="flex flex-col items-center m-4"><Button>新規記事の作成</Button></div>

  return (
    <div className="flex flex-col items-center justify-start m-4">
      <div>
        <p>タイトル</p>
        <p>{rawArticle?.title}</p>
      </div>
      <div>
        公開日: {!rawArticle.publishedAt ? "非公開" : convertDateString(rawArticle?.publishedAt)}
      </div>
      <div>
        <p>本文</p>
        {rawArticle.content}
      </div>
    </div >
  );
};

