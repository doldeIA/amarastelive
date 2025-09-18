export const config = { runtime: 'edge' };

export default async function handler() {
  const hasKey = !!process.env.GEMINI_API_KEY;
  return new Response(JSON.stringify({ 
    ok: hasKey, 
    env: hasKey ? 'key: ok' : 'key: missing',
    timestamp: new Date().toISOString()
  }), {
    status: hasKey ? 200 : 500, 
    headers: { 
      'content-type': 'application/json', 
      'cache-control': 'no-store' 
    }
  });
}
