"use client";

import { Button } from "../ui/button";
import Link from "next/link";

export default function HeaderAvatar() {

  return (
    <Button variant="outline" className="rounded-full" asChild>
      <Link href="/admin/auth">
        ログイン/ログアウト
      </Link>
    </Button>
  );
}
