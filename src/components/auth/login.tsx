"use client";

import { signIn } from "@/apis/auth/users";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_NAME } from "@/lib/constants";
import { createProfile } from "@/services/auth/profiles";
import { GoogleJwtPayload } from "@/types/user";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

// NOTE: ログイン時にコンソール上でCOOPエラーの警告が出るが、ログイン自体は成功する。
// この問題はポップアップを使ってGoogleOAuth認証をする際に発生する既知の事象。
// 報告例: https://github.com/firebase/firebase-js-sdk/issues/6199
export default function Login() {
  const [nonce] = useState(() => crypto.randomUUID());

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_NAME) {
    return <div>現在ログインは利用できません</div>;
  }

  async function handleLoginSuccess({
    credential,
    clientName,
    nonce,
  }: {
    credential?: string;
    clientName: string;
    nonce: string;
  }) {
    if (!credential) {
      // TODO: エラーハンドリングの改善
      alert("認証情報の取得に失敗しました");
      return;
    }

    const user = await signIn(clientName, credential, nonce);

    const currentUserId = user.id;
    const currentUserEmail: string | null | undefined = user.email;
    if (!currentUserEmail) {
      console.error("User email is not available");
      return;
    }

    const decoded: GoogleJwtPayload = jwtDecode(credential);
    const currentUserName = decoded.name;
    await createProfile(currentUserId, currentUserEmail, currentUserName);
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        nonce={nonce}
        // TODO: エラーハンドリングの改善
        onError={() => alert("Login failed")}
        onSuccess={async ({ credential }) => {
          if (!GOOGLE_CLIENT_NAME) {
            console.error("GOOGLE_CLIENT_NAME is not defined");
            return;
          }

          await handleLoginSuccess({
            credential,
            clientName: GOOGLE_CLIENT_NAME,
            nonce,
          });
        }}
      />
    </GoogleOAuthProvider>
  );
}
