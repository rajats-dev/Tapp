import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  console.log(token);

  if (!token && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/client", request.url));
  }
  return NextResponse.next();
}

// export { default } from "next-auth/middleware";

export const config = { matcher: ["/"] };
