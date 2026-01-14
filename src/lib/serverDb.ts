import schema from "@/instant.schema";
import { init } from "@instantdb/admin";

export const serverDb = init({
  appId: process.env.INSTANT_APP_ID!,
  adminToken: process.env.INSTANT_ADMIN_API_KEY!,
  schema: schema,
  useDateObjects: true,
});
