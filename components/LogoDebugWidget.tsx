import React, { useState, useEffect } from 'react';
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

const LogoDebugWidget: React.FC = () => {
    const [result, setResult] = useState<CheckLogoResult | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const runCheck = async () => {
        setIsChecking(true);
        const res = await checkLogoUrl('/logo.webp', { retries: 3 });
        setResult(res);
        setIsChecking(false);
    };

    useEffect(() => {
        runCheck();
    }, []);

    const renderResult = () => {
        if (!result) return <p>Aguardando...</p>;

        return (
            <div className="text-xs font-mono break-all">
                <p><strong>OK:</strong> <span style={{ color: result.ok ? 'lime' : 'red' }}>{String(result.ok)}</span></p>
                <p><strong>Status:</strong> {result.status || 'N/A'}</p>
                <p><strong>Content-Type:</strong> {result.contentType || 'N/A'}</p>
                <p><strong>Tentativas:</strong> {result.attempt || result.attempts}</p>
                <p><strong>Tempo:</strong> {result.elapsed}ms</p>
                <details className="mt-2">
                    <summary className="cursor-pointer">Headers</summary>
                    <pre className="mt-1 p-1 bg-black/50 rounded text-white/80 max-h-24 overflow-y-auto">
                        {JSON.stringify(result.headers || {}, null, 2)}
                    </pre>
                </details>
            </div>
        );
    };

    return (
        <div className="fixed bottom-4 left-4 z-[9999] bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg border border-white/30 shadow-lg max-w-xs w-[90vw]">
            <h4 className="font-bold text-sm mb-2 border-b border-white/20 pb-1">Logo.webp Status</h4>
            {isChecking ? <p>Verificando...</p> : renderResult()}
            <button
                onClick={runCheck}
                disabled={isChecking}
                className="mt-3 w-full text-xs bg-white/20 hover:bg-white/30 rounded py-1 px-2 disabled:opacity-50"
            >
                {isChecking ? '...' : 'Verificar Novamente'}
            </button>
        </div>
    );
};

export default LogoDebugWidget;
