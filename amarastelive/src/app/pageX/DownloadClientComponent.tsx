'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadClientComponent() {
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch('/api/downloads/list');
        if (!res.ok) {
          if (res.status === 401) {
             router.push('/login');
             return;
          }
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch file list.');
        }
        const data = await res.json();
        setFiles(data.files);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFiles();
  }, [router]);

  const handleDownload = (filename: string) => {
    // Link to the API endpoint which will trigger a download
    window.location.href = `/api/downloads/${filename}`;
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="text-center w-full max-w-md">
      <h1 className="text-3xl md:text-4xl font-bold text-white welcome-text-glow mb-12">
        Conteúdo Exclusivo
      </h1>
      
      {isLoading && <p className="text-white animate-pulse">Carregando arquivos...</p>}
      
      {error && <p className="text-red-400">{error}</p>}
      
      {!isLoading && !error && (
        <div className="space-y-4">
          {files.length > 0 ? (
            files.map(filename => (
              <button
                key={filename}
                onClick={() => handleDownload(filename)}
                className="cadastre-btn w-full"
                aria-label={`Download ${filename}`}
              >
                DOWNLOAD FREE {filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").toUpperCase()}
              </button>
            ))
          ) : (
            <p className="text-white/70">Nenhum arquivo exclusivo disponível no momento.</p>
          )}
        </div>
      )}
      
      <button 
        onClick={handleLogout}
        className="mt-12 text-sm font-semibold text-white/70 hover:text-white hover:underline transition-colors"
      >
        Sair (Logout)
      </button>
    </div>
  );
}
