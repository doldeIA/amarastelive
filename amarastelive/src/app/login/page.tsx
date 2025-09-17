'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Registro bem-sucedido! Por favor, faça o login.');
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      // Clear the query param from URL without reloading
      window.history.replaceState(null, '', '/login');
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to login.');
      }

      router.push('/pageX');
      router.refresh(); // Important to re-fetch server component data
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
          Login
        </h1>
        {successMessage && <p role="status" className="bg-green-500/20 border border-green-500 text-green-300 text-center text-sm p-3 rounded-md mb-6">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email-login" className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input
              id="email-login"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-white/80 mb-1">Senha</label>
            <input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="block w-full bg-transparent border-0 border-b border-white/40 p-2 text-white placeholder-white/60 focus:outline-none focus:ring-0 focus:border-white transition"
            />
          </div>
          {error && <p role="alert" className="text-red-400 text-center text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 py-3 px-4 bg-soft-beige text-primary font-bold rounded-lg shadow-lg transition-transform hover:scale-105 soft-neon disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/70">
          Não tem uma conta?{' '}
          <Link href="/register" className="font-semibold text-white hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}
