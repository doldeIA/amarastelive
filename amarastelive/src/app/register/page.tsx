'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register.');
      }

      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-deep-brown z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg p-8 text-white">
        <h1 className="text-center text-3xl font-bold text-white neon-heading-glow mb-8">
          Criar Conta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
            />
          </div>
          <div>
            <label htmlFor="password-reg" className="block text-sm font-medium text-white/80 mb-1">Senha</label>
            <input
              id="password-reg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
              aria-describedby="password-hint"
            />
             <p id="password-hint" className="mt-2 text-xs text-white/60">Mínimo 8 caracteres.</p>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1">Confirmar Senha</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
            />
          </div>
          {error && <p role="alert" className="text-red-400 text-center text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 px-4 bg-soft-beige text-primary font-bold rounded-lg shadow-lg transition-transform hover:scale-105 soft-neon disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/70">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-semibold text-white hover:underline">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}
