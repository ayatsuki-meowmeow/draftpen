import { Article, PublishedArticle } from "@/types/article";

export function getPublishedMock(mockList: Article[]): Article[] {
  return mockList.filter((mock) => {
    return mock.publishedAt && mock.updatedAt;
  });
}

export function isPublished(article: Article): article is PublishedArticle {
  return (
    article.publishedAt != null &&
    article.createdAt != null &&
    article.updatedAt != null
  );
}
