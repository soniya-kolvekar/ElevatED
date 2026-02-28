import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Paths requiring authentication
    const isStudentRoute = pathname.startsWith('/student');
    const isRecruiterRoute = pathname.startsWith('/recruiter');
    const isAdminRoute = pathname.startsWith('/admin');

    if (!isStudentRoute && !isRecruiterRoute && !isAdminRoute) {
        return NextResponse.next();
    }



    // Get the role from our simple cookie set during login
    const authRole = request.cookies.get('auth-role')?.value;

    if (!authRole) {
        return NextResponse.redirect(new URL('/auth?type=login', request.url));
    }

    // Strict role checking
    if (isStudentRoute && authRole !== 'student') {
        return NextResponse.redirect(new URL(`/${authRole}/dashboard`, request.url));
    }

    if (isRecruiterRoute && authRole !== 'recruiter') {
        return NextResponse.redirect(new URL(`/${authRole}/dashboard`, request.url));
    }

    if (isAdminRoute && authRole !== 'admin') {
        return NextResponse.redirect(new URL(`/${authRole}/dashboard`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/student/:path*',
        '/recruiter/:path*',
        '/admin/:path*'
    ],
};
