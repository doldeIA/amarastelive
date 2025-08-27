// IMPORTANT: Storing user data in a repository JSON file is insecure. Use a database for production.
import { NextResponse } from 'next/server';
import { getUsers, saveUsers, hashPassword, User } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const users = await getUsers();

    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json({ message: 'Email is already registered.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const newUser: User = {
      id: new Date().getTime().toString(), // Simple unique ID
      name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
