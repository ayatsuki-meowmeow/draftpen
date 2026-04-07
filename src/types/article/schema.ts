import { AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

export type Article = Omit<
  InstaQLEntity<AppSchema, "articles">,
  "publishedAt" | "createdAt" | "updatedAt"
> & {
  publishedAt?: number;
  createdAt: number;
  updatedAt: number;
};

export type PublishedArticle = Article & { publishedAt: number };
