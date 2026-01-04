'use client';

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { db } from '@/lib/db';


const GOOGLE_CLIENT_ID = '548096054278-08kj1tc4k2e7ob3id2fsoek8vp3ngh5o.apps.googleusercontent.com';

const GOOGLE_CLIENT_NAME = 'google-web';

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
// 現状のところ特に問題はないので放置する。
// 報告例: https://github.com/firebase/firebase-js-sdk/issues/6199
function Login() {
  const [nonce] = useState(crypto.randomUUID());

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        nonce={nonce}
        onError={() => alert('Login failed')}
        onSuccess={({ credential }) => {
          if (!credential) {
            alert('認証情報の取得に失敗しました');
            return;
          }

          db.auth
            .signInWithIdToken({
              clientName: GOOGLE_CLIENT_NAME,
              idToken: credential,
              // GoogleOAuthに渡したnonceと同じ値を渡す必要がある
              // nonceが同一かどうかをInstant側で検証している
              nonce,
            })
            .catch((err) => {
              alert('Uh oh: ' + err.body?.message);
            });
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default App;
