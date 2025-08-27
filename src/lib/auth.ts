// IMPORTANT: set JWT_SECRET in .env / Vercel environment variables.
// Storing user data in a repository JSON file is insecure and not suitable for production.
// Use a proper database (e.g., PostgreSQL, MongoDB) for a real application.

import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

const usersFilePath = path.join((process as any).cwd(), 'data', 'users.json');

// --- User Data Functions ---

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty array
      return [];
    }
    throw error;
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  // Ensure the directory exists
  await fs.mkdir(path.dirname(usersFilePath), { recursive: true });
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

// --- Password Functions ---

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// --- JWT and Session Functions ---

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('JWT_SECRET is not set in environment variables. Using a default insecure secret for development.');
}

export function signJwt(payload: object): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set.');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt<T>(token: string): T | null {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set.');
  }
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const token = cookies().get('iam_token')?.value;
  if (!token) return null;

  return verifyJwt<{ userId: string; email: string }>(token);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}