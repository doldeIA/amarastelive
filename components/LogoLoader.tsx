import React, { useEffect, useState } from 'react';
import { checkLogoUrl } from '../lib/logo-checker.js';

interface CheckLogoResult {
  ok: boolean;
  attempt?: number;
  attempts?: number;
  elapsed: number;
  status?: number;
  contentType?: string;
  headers?: Record<string, string>;
  results?: { attempt: number; ok: boolean; status?: number; contentType?: string, error?: string }[];
  error?: string;
}

interface LogoLoaderProps {
  className?: string;
  onReady?: (result: CheckLogoResult) => void;
  onError?: (result: CheckLogoResult) => void;
}

const LogoLoader: React.FC<LogoLoaderProps> = ({ className = '', onReady, onError }) => {
  const [state, setState] = useState<{ status: 'checking' | 'ok' | 'failed'; meta?: CheckLogoResult }>({ status: 'checking' });
  
  useEffect(() => {
    let mounted = true;
    const verifyAndLoad = async () => {
      // Use fewer retries client-side for a faster fallback
      const res = await checkLogoUrl('/logo.webp', { retries: 5, initialDelay: 100, maxDelay: 1000 });
      if (!mounted) return;
      if (res.ok) {
        setState({ status: 'ok', meta: res });
        if (onReady) onReady(res);
      } else {
        setState({ status: 'failed', meta: res });
        if (onError) onError(res);
      }
    };
    verifyAndLoad();
    return () => { mounted = false; };
  }, [onReady, onError]);

  return (
    <div className={`logo-loader-container ${className}`}>
      {state.status === 'ok' ? (
        <img src="/logo.webp" alt="Amarasté logo" loading="eager" decoding="sync" className="logo-loader-image" />
      ) : state.status === 'checking' ? (
        <div className="logo-loader-placeholder" aria-busy="true">
            {/* Minimal SVG placeholder to reserve space */}
            <svg width="100" height="25" viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg" fill="rgba(255,255,255,0.2)"><rect width="100" height="25" rx="3"></rect></svg>
        </div>
      ) : (
        <div className="logo-loader-placeholder failed" role="img" aria-label="Logo indisponível">
            {/* Broken image icon SVG as fallback */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 13.5v-8a2 2 0 0 0-2-2h-14a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h5.5"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21.5 13.5-5.5 5.5m0-5.5 5.5 5.5"/></svg>
        </div>
      )}
    </div>
  );
};

export default LogoLoader;
