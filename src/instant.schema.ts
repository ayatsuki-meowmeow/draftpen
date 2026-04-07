// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique(),
    }),
    profiles: i.entity({
      name: i.string(),
      bio: i.string().optional(),
      role: i.string(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    articles: i.entity({
      draftTitle: i.string().indexed(),
      title: i.string().indexed(),
      content: i.string(),
      draftContent: i.string(),
      status: i.string().indexed(),
      publishedAt: i.date().optional().indexed(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
  },
  links: {
    userProfiles: {
      forward: {
        on: "profiles",
        has: "one",
        label: "user",
        onDelete: "cascade",
      },
      reverse: {
        on: "$users",
        has: "one",
        label: "profile",
      },
    },
    authorArticles: {
      forward: {
        on: "articles",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "profiles",
        has: "many",
        label: "articles",
      },
    },
  },
});

// This helps Typescript display nicer intellisense
type AppSchema = typeof _schema;
// NOTE: 拡張が必要そうなら下記を使う
// interface AppSchema extends _AppSchema { }
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
