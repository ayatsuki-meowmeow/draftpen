import { InstaQLEntity } from "@instantdb/react";
import { AppSchema } from "@/instant.schema";
import { Article } from "@/types/article";

export function toArticle(
  raw: InstaQLEntity<AppSchema, "articles">,
): Article {
  return {
    ...raw,
    publishedAt: raw.publishedAt != null ? Number(raw.publishedAt) : undefined,
    createdAt: Number(raw.createdAt),
    updatedAt: Number(raw.updatedAt),
  };
}
