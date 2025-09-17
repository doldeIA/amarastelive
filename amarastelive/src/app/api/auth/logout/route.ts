import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful.' }, { status: 200 });
  
  response.cookies.set('iam_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set to a past date to expire immediately
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
