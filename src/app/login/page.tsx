'use client';

import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { db } from '@/lib/db';


// e.g. 89602129-cuf0j.apps.googleusercontent.com
const GOOGLE_CLIENT_ID = '548096054278-08kj1tc4k2e7ob3id2fsoek8vp3ngh5o.apps.googleusercontent.com';

// Use the google client name in the Instant dashboard auth tab
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
