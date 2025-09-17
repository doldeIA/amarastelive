// IMPORTANT: Storing user data in a repository JSON file is insecure. Use a database for production.
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyJwt } from '../../../../lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const token = cookies().get('iam_token')?.value;
  if (!token || !verifyJwt(token)) {
    return NextResponse.json({ message: 'Authentication required.' }, { status: 401 });
  }
  
  try {
    const exclusiveFolderPath = path.join((process as any).cwd(), 'public', 'assets', 'exclusive');
    // IMPORTANT: In a real app, ensure this directory exists.
    // The user is responsible for creating it and adding files.
    const files = await fs.readdir(exclusiveFolderPath);
    
    // Filter out any system files like .DS_Store
    const allowedFiles = files.filter(file => !file.startsWith('.'));
    
    return NextResponse.json({ files: allowedFiles });
  } catch (error: any) {
    // If the directory doesn't exist, return an empty list gracefully.
    if (error.code === 'ENOENT') {
        console.warn("Exclusive assets directory not found at /public/assets/exclusive");
        return NextResponse.json({ files: [] });
    }
    console.error('Failed to list exclusive files:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}