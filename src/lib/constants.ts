export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_NAME = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_NAME;

export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export const USE_MOCK =
  IS_DEVELOPMENT && process.env.NEXT_PUBLIC_USE_MOCK === "true";
