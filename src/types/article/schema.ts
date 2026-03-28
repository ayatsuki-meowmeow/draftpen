import { AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

export type Article = Omit<
  InstaQLEntity<AppSchema, "articles">,
  "publishedAt" | "createdAt" | "updatedAt"
> & {
  publishedAt: Date | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
};

export type PublishedArticle = Article & {
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
