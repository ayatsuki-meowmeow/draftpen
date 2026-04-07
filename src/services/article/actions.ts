import { db } from "@/lib/db";
import { Article, PublishedArticle } from "@/types/article";

export function isPublished(article: Article): article is PublishedArticle {
  return article.publishedAt != null;
}

export function sortByPublishedAt(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const aTime = a.publishedAt ?? 0;
    const bTime = b.publishedAt ?? 0;
    return bTime - aTime;
  });
}

export async function publishArticle(
  articleId: string,
  draftTitle: string,
  draftContent: string,
): Promise<void> {
  await db.transact(
    db.tx.articles[articleId]!.update({
      title: draftTitle,
      content: draftContent,
      status: "published",
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    }),
  );
}
