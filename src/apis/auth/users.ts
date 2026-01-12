import { db } from "@/lib/db";
import { User } from "@instantdb/react";

export async function signIn(clientName: string, idToken: string, nonce: string): Promise<User> {
  const res = await db.auth
    .signInWithIdToken({
      clientName,
      idToken,
      // GoogleOAuthに渡したnonceと同じ値を渡す必要がある
      // nonceが同一かどうかをInstant側で検証している
      nonce,
    })
    .catch((err) => {
      throw new Error(err.body?.message);
    });
  return res.user;
}
