// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   if (!token && url.pathname !== "/") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (
//     token &&
//     url.pathname.startsWith("/") &&
//     !url.pathname.startsWith("/dashboard")
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

export { default } from "next-auth/middleware";

export const config = { matcher: ["/client"] };
