// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
  profiles: {
    allow: {
      view: "true",
      create: "false", // サーバーサイドでのみ作成可能とするため、クライアントサイドではfalseに設定
      update: "isOwner",
      delete: "isOwner",
    },
    bind: ["isOwner", "auth.id != null && auth.id == data.user.id"],
  },
} satisfies InstantRules;

export default rules;
