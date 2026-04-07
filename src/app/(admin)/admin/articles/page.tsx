"use client";

import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { USE_MOCK } from "@/lib/constants";
import {
  createArticle,
  isPublished,
  sortByPublishedAt,
} from "@/services/article/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function AdminArticlePage() {
  const router = useRouter();

  const handleCreateArticle = async () => {
    const newId = await createArticle();
    router.push(`/admin/articles/${newId}`);
  };
  const { isLoading, error, data } = db.useQuery({
    articles: {
      $: { order: { publishedAt: "desc" } },
    },
  });

  if (!USE_MOCK && isLoading) return <div className="p-4">読み込み中...</div>;
  if (!USE_MOCK && error)
    return <div className="p-4">エラー: {error.message}</div>;

  const articles = USE_MOCK
    ? sortByPublishedAt(mockArticles)
    : (data?.articles ?? []).map(toArticle);

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button onClick={handleCreateArticle}>新規作成</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>記事名</TableHead>
            <TableHead>公開日</TableHead>
            <TableHead>最終編集日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow
              key={article.id}
              onClick={() => router.push(`/admin/articles/${article.id}`)}
            >
              <TableCell>{article.draftTitle}</TableCell>
              <TableCell>
                {isPublished(article)
                  ? new Date(article.publishedAt).toLocaleString("ja-JP")
                  : "非公開"}
              </TableCell>
              <TableCell>
                {new Date(article.updatedAt).toLocaleString("ja-JP")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
