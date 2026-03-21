"use client";

import { db } from "@/lib/db";
import UserInfo from "@/components/admin/auth/userInfo";
import Login from "@/components/admin/auth/login";

function AdminAuthPage() {
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

export default AdminAuthPage;
