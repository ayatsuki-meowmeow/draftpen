import { ValueOf } from "@/utils";
import { RawProfile } from "./schema";

export const UserRole = {
  ADMIN: "admin",
  VIEWER: "viewer",
} as const;

export type UserRole = ValueOf<typeof UserRole>;

export type Profile = Omit<RawProfile, "role"> & {
  role: UserRole;
};
