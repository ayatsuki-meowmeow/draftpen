"use client";

import Link from "next/link";
import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { USE_MOCK } from "@/lib/constants";
import {
  isPublished,
  isUpdated,
  sortByPublishedAt,
} from "@/services/article/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminArticlePage() {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>記事名</TableHead>
            <TableHead>最終編集日</TableHead>
            <TableHead>公開日</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Link
                  href={`/admin/article/${article.id}`}
                  className="hover:underline"
                >
                  {article.draftTitle}
                </Link>
              </TableCell>
              <TableCell>
                {isPublished(article)
                  ? article.publishedAt.toLocaleString("ja-JP")
                  : "非公開"
                }
              </TableCell >
              <TableCell>
                {isUpdated(article)
                  ? article.updatedAt.toLocaleString("ja-JP")
                  : "—"}
              </TableCell>
            </TableRow >
          ))
          }
        </TableBody >
      </Table >
    </div >
  );
}
