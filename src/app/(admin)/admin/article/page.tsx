"use client";

import Link from "next/link";
import { db } from "@/lib/db";
import { mockArticles } from "@/mocks/articles";
import { Article } from "@/types/article";
import { USE_MOCK } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminArticlePage() {
  const { isLoading, error, data } = db.useQuery({ articles: {} });

  if (!USE_MOCK && isLoading) return <div className="p-4">読み込み中...</div>;
  if (!USE_MOCK && error)
    return <div className="p-4">エラー: {error.message}</div>;

  const rawArticles = USE_MOCK
    ? mockArticles
    : ((data?.articles ?? []) as Article[]);

  const articles = [...rawArticles].sort((a, b) => {
    return b.updatedAt - a.updatedAt;
  });

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
                {new Date(article.updatedAt).toLocaleDateString("ja-JP")}
              </TableCell>
              <TableCell>
                {article.publishedAt != null
                  ? new Date(article.publishedAt).toLocaleDateString("ja-JP")
                  : "非公開"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
