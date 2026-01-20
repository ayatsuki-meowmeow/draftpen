import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin" ,"/admin/:path*"],
}

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [username, password] = atob(authValue).split(":");

    if (
      username === process.env.BASIC_AUTH_USERNAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }
  url.pathname = "/admin/basic-auth";
  return NextResponse.rewrite(url);
}
