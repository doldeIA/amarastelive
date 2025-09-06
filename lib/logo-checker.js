// lib/logo-checker.js
export async function checkLogoUrl(url = './logo.webp', { retries = 20, initialDelay = 100, maxDelay = 5000 } = {}) {
  const results = [];
  const start = Date.now();
  for (let attempt = 1; attempt <= retries; attempt++) {
    const jitter = Math.round(Math.random() * 50);
    const delay = Math.min(initialDelay * Math.pow(2, attempt - 1), maxDelay) + jitter;
    try {
      const resp = await fetch(url, { method: 'GET', cache: 'no-store' });
      const status = resp.status;
      const contentType = resp.headers.get('content-type') || '';
      
      if (resp.ok && /image/i.test(contentType)) {
         return { 
           ok: true, 
           attempt, 
           elapsed: Date.now() - start, 
           status, 
           contentType, 
           headers: Object.fromEntries(resp.headers.entries()) 
         };
      }
      results.push({ attempt, ok: false, status, contentType });
    } catch (err) {
      results.push({ attempt, ok: false, error: err.message });
    }
    if (attempt < retries) {
      await new Promise(r => setTimeout(r, delay));
    }
  }
  return { ok: false, attempts: results.length, elapsed: Date.now() - start, results };
}