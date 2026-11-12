import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * TRIPORA RESERVE — Edge Security & Role-Based Access Control Middleware
 * Enforces diplomatic and administrative clearance on executive terminals.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept all administrative paths
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('tripora_access_token')?.value;
    const role = request.cookies.get('tripora_role')?.value;

    // Check authentication token
    if (!token) {
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('next', pathname);
      loginUrl.searchParams.set('reason', 'admin_required');
      return NextResponse.redirect(loginUrl);
    }

    // Check administrative role authority
    if (role !== 'ADMIN') {
      const forbiddenUrl = new URL('/auth', request.url);
      forbiddenUrl.searchParams.set('next', pathname);
      forbiddenUrl.searchParams.set('reason', 'insufficient_clearance');
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
