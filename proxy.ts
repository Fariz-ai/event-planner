/** @format */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";

const authMiddleware = auth.middleware({ loginUrl: "/auth/sign-in" });

function isServerActionPost(req: NextRequest) {
  if (req.method !== "POST") return false;
  const h = req.headers;
  return Boolean(h.get("Next-Action") ?? h.get("next-action"));
}

export default function proxy(req: NextRequest) {
  if (isServerActionPost(req)) {
    return NextResponse.next();
  }
  return authMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|auth/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf)$).*)",
    "/dashboard/:path*",
    "/events/:path*",
  ],
};
