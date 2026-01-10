"use client";

import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { db } from "@/lib/db";
import { signIn } from "@/apis/users";
import { GoogleJwtPayload, Profile } from "@/types/user";
import { createProfileForUser, getProfileByUserId } from "@/apis/profiles";
import { jwtDecode } from "jwt-decode";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_NAME = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_NAME;

function App() {
  return (
    <>
      <db.SignedIn>
        <UserInfo />
      </db.SignedIn>
      <db.SignedOut>
        <Login />
      </db.SignedOut>
    </>
  );
}

function UserInfo() {
  const user = db.useUser();
  return <h1>Hello {user.email}!</h1>;
}

// NOTE: ログイン時にコンソール上でCOOPエラーの警告が出るが、ログイン自体は成功する。
// この問題はポップアップを使ってGoogleOAuth認証をする際に発生する既知の事象。
// 報告例: https://github.com/firebase/firebase-js-sdk/issues/6199
function Login() {
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
    const decoded: GoogleJwtPayload = jwtDecode(credential);
    const currentUserName = decoded.name;
    const profile: Profile | null = await getProfileByUserId(currentUserId);
    if (!profile) {
      await createProfileForUser(currentUserId, currentUserName);
    }
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        nonce={nonce}
        // TODO: エラーハンドリングの改善
        onError={() => alert("Login failed")}
        onSuccess={async ({ credential }) => {
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

export default App;
