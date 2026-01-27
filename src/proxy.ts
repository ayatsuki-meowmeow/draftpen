import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    console.log("Found Authorization header");
    const authValue = basicAuth.split(" ")[1];
    const [username, password] = atob(authValue).split(":");

    if (
      username === process.env.BASIC_AUTH_USERNAME &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Auth Required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
