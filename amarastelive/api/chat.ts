export const config = { runtime: 'edge' };
type Msg = { role: 'user' | 'model'; content: string };
const SYSTEM_PROMPT = `Você é iAmarasté, o agente oficial do AmarastéLive.
Seja claro, direto e gentil. Nunca quebre a UI. Quando necessário, pergunte em 1 linha.`;
export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    const key = process.env.GEMINI_API_KEY;
    if (!key) return new Response('Missing GEMINI_API_KEY', { status: 500 });
    const { messages = [] } = (await req.json()) as { messages: Msg[] };
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
    ];
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + key;
    const r = await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ contents })});
    if (!r.ok) return new Response('Upstream error: ' + (await r.text().catch(()=>'')), { status: 502 });
    const data = await r.json().catch(()=>null) as any;
    const text = (data?.candidates?.[0]?.content?.parts ?? []).map((p:any)=>p?.text||'').join('') || '⚠️ No answer';
    return new Response(text, { status:200, headers:{'content-type':'text/plain; charset=utf-8','cache-control':'no-store'}});
  } catch (e:any) { return new Response('Chat route error: '+(e?.message??'unknown'),{status:500}); }
}
