import { AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

export type User = InstaQLEntity<AppSchema, "$users">;

export type RawProfile = Omit<
  InstaQLEntity<AppSchema, "profiles">,
  "createdAt" | "updatedAt"
> & {
  createdAt: number;
  updatedAt: number;
};

export type GoogleJwtPayload = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
};
