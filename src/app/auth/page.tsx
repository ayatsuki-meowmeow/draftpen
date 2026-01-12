import React from "react";
import { db } from "@/lib/db";
import UserInfo from "@/components/auth/userInfo";
import Login from "@/components/auth/login";

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

export default App;
