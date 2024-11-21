import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt"; // Import token verification

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value || localStorage.getItem("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login if no token
  }

  const user = verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect if token is expired or invalid
  }

  const { role, username } = user;

  // Allow access only to specific routes
  if (!role || !username) {
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect if role or username is missing
  }

  // Proceed with the request if token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"], // Protect these routes based on role
};
