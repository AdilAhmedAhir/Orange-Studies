import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        // RBAC: Admin/Manager-only routes
        if (
            (pathname.startsWith("/dashboard/admin") || (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login"))) &&
            token?.role !== "ADMIN" &&
            token?.role !== "MANAGER"
        ) {
            return NextResponse.redirect(new URL("/dashboard/student", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/apply/:path*"],
};
