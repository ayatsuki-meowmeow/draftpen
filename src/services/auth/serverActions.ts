"use server";

export async function isAdmin(userEmail: string): Promise<boolean> {
  return process.env.ADMIN_USER_EMAILS
    ? process.env.ADMIN_USER_EMAILS.split(",")
        .map((email) => email.trim())
        .includes(userEmail)
    : false;
}
