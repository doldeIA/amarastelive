// scripts/check-logo.ci.js
// To run: node scripts/check-logo.ci.js
// Ensure you have a server running. If not, set PUBLIC_BASE_URL.
// Example: PUBLIC_BASE_URL=https://your-deployed-site.com node scripts/check-logo.ci.js

// This script needs to be run in a Node.js environment with fetch support (Node 18+).
// It's designed to be ESM-compatible.

import fs from 'fs';
import path from 'path';

// --- Re-implementing checker to avoid import issues in a simple Node script ---
async function checkLogoUrlNode(url, { retries = 20, initialDelay = 100, maxDelay = 5000 } = {}) {
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
                return { ok: true, attempt, elapsed: Date.now() - start, status, contentType, headers: Object.fromEntries(resp.headers.entries()) };
            }
            results.push({ attempt, ok: false, status, contentType });
        } catch (err) {
            results.push({ attempt, ok: false, error: err.message });
        }
        if (attempt < retries) await new Promise(r => setTimeout(r, delay));
    }
    return { ok: false, attempts: results.length, elapsed: Date.now() - start, results };
}


(async () => {
  // Create a 'build' directory if it doesn't exist to store the report.
  const reportDir = path.resolve(process.cwd(), 'build');
  const reportPath = path.join(reportDir, 'logo-check-report.json');

  // Use deployed URL from env var, otherwise fallback to local dev server.
  const baseUrl = process.env.PUBLIC_BASE_URL || 'http://localhost:8000'; // Adjust port if needed
  const url = `${baseUrl}/logo.webp`;
  
  console.log(`[CI] Checking logo asset at: ${url}`);
  
  const res = await checkLogoUrlNode(url, { retries: 10, initialDelay: 200, maxDelay: 3000 });
  
  const output = { timestamp: new Date().toISOString(), url, result: res };

  try {
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(reportPath, JSON.stringify(output, null, 2));
    console.log(`[CI] Report saved to ${reportPath}`);
  } catch(e) {
    console.error(`[CI] Failed to write report file: ${e.message}`);
  }

  if (!res.ok) {
    console.error('\n[CI] ❌ Logo asset check FAILED.');
    console.error('Diagnostic Info:', JSON.stringify(res, null, 2));
    console.error('\n--- Remediation Steps ---');
    if (res.results && res.results.some(r => r.status === 404)) {
        console.error('-> Error: 404 Not Found. The file is missing or the path is incorrect.');
        console.error('   1. Verify `public/logo.webp` exists and is committed to your repository.');
        console.error('      Run: `ls -la public/logo.webp`');
        console.error('   2. Check for case sensitivity issues in the filename.');
        console.error('   3. Ensure your build process includes the `public` directory.');
    } else if (res.results && res.results.some(r => r.status === 403)) {
        console.error('-> Error: 403 Forbidden. Server permissions are blocking access.');
        console.error('   1. Check file permissions on your deployment server/host.');
        console.error('   2. Review any rewrite rules or security policies (e.g., .htaccess, netlify.toml) that might block image access.');
    } else if (res.results && res.results.some(r => r.contentType && !/image/i.test(r.contentType))) {
        console.error(`-> Error: Incorrect Content-Type detected ('${res.results.find(r => r.contentType)?.contentType}').`);
        console.error('   1. Ensure your web server is configured to serve `.webp` files with the `image/webp` MIME type.');
    } else {
        console.error('-> Error: Could not connect or received an unexpected error.');
        console.error('   1. Ensure your development or deployment server is running and accessible at the target URL.');
        console.error(`      Run: \`curl -I ${url}\``);
        console.error('   2. Check for CDN caching issues or network problems.');
    }
    console.error('-------------------------\n');
    process.exit(1);
  }

  console.log('\n[CI] ✅ Logo asset check PASSED.');
  console.log('Details:', JSON.stringify(res, null, 2));
  process.exit(0);
})();
