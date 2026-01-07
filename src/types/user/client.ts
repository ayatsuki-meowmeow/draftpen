import { RawProfile } from "./schema";

type userRole = "admin" | "editor" | "viewer";

export type Profile = Omit<RawProfile, "role"> & {
  role: userRole;
};
