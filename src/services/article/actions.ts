import { Article, PublishedArticle } from "@/types/article";

export function isPublished(article: Article): article is PublishedArticle {
  return article.publishedAt != null;
}

export function isUpdated(article: Article): boolean {
  return article.updatedAt instanceof Date;
}

export function sortByPublishedAt(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const aTime = a.publishedAt instanceof Date ? a.publishedAt.getTime() : 0;
    const bTime = b.publishedAt instanceof Date ? b.publishedAt.getTime() : 0;
    return bTime - aTime;
  });
}
