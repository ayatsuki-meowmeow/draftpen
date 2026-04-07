"use client";

import { Button } from "@/components/ui/button";
import { DbError } from "@/components/ui/db-error";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { USE_MOCK } from "@/lib/constants";
import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { isPublished } from "@/services/article/actions";
import { Article, PublishedArticle } from "@/types/article";
import { convertDateString } from "@/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = db.useQuery({
    articles: { $: { where: { id, status: "published" } } },
  });

  if (!USE_MOCK && isLoading)
    return <div className="p-4">読み込み中です...</div>;

  if (!USE_MOCK && error) return <DbError error={error} />;

  const rawArticle: Article | undefined = USE_MOCK
    ? mockArticles.find((obj) => obj.id === id)
    : (data?.articles ?? []).map(toArticle)[0];

  const article: PublishedArticle | undefined =
    rawArticle != null && isPublished(rawArticle) ? rawArticle : undefined;

  if (!article) return <div className="p-4">記事が見つかりません。</div>;

  return (
    <div className="flex flex-col items-center justify-start m-6">
      <div className="w-full max-w-prose mb-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft /> ホームに戻る
          </Link>
        </Button>
      </div>
      <h2 className="font-bold mb-2 text-4xl">{article.title}</h2>
      <div className="mb-4">
        <p>公開日: {convertDateString(article.publishedAt)}</p>
        <p>最終更新日: {convertDateString(article.updatedAt)}</p>
      </div>
      <MarkdownRenderer content={article.content} />
    </div>
  );
}

export default ArticleDetailPage;
