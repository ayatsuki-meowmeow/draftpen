// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique(),
    }),
    profiles: i.entity({
      name: i.string(),
      userId: i.string().indexed(),
      bio: i.string().optional(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    posts: i.entity({
      slug: i.string().unique().indexed(),
      title: i.string().indexed(),
      content: i.string(),
      authorId: i.string().indexed(),
      status: i.string().indexed(),
      publishedAt: i.date().optional(),
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
    authorPosts: {
      forward: {
        on: "posts",
        has: "one",
        label: "author",
        onDelete: "cascade",
      },
      reverse: {
        on: "profiles",
        has: "many",
        label: "posts",
      },
    },
  },
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
// TODO: AppSchemaが必要かどうか確認する
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
