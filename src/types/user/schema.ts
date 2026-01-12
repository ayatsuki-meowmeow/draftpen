import { AppSchema } from "@/instant.schema";
import { InstaQLEntity } from "@instantdb/react";

export type User = InstaQLEntity<AppSchema, "$users">;

// NOTE: instantから取得できる値の型は日時はDate型となっている
// 一方で、スキーマから生成される型は日時がstring | number型となっているため、
// ここで型を再定義してDate型に変換している
export type RawProfile = Omit<
  InstaQLEntity<AppSchema, "profiles">,
  "createdAt" | "updatedAt"
> & {
  createdAt: Date;
  updatedAt: Date;
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
