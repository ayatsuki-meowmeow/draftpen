import { RawProfile } from "./schema";

export type userRole = "admin" | "viewer";

export type Profile = Omit<RawProfile, "role"> & {
  role: userRole;
};
