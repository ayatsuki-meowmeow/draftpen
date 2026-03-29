import { AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

export type Article = Omit<
  InstaQLEntity<AppSchema, "articles">,
  "publishedAt" | "createdAt" | "updatedAt"
> & {
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type PublishedArticle = Article & {
  publishedAt: Date;
};
