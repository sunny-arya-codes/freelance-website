
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }

  return NextResponse.next();
}
