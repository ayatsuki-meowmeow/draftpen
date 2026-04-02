import { InstaQLEntity } from "@instantdb/react";
import { AppSchema } from "@/instant.schema";
import { RawProfile } from "@/types/user";

export function toRawProfile(
  raw: InstaQLEntity<AppSchema, "profiles">,
): RawProfile {
  return {
    ...raw,
    createdAt: Number(raw.createdAt),
    updatedAt: Number(raw.updatedAt),
  };
}
