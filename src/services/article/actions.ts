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
