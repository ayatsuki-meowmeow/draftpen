// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react";

const rules = {
  profiles: {
    allow: {
      view: "true",
      create: "isOwner",
      update: "isOwner",
      delete: "isOwner",
    },
    bind: ["isOwner", "auth.id != null && auth.id == data.user.id"],
  },
} satisfies InstantRules;

export default rules;
