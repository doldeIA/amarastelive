export const config = { runtime: 'edge' };

type Msg = { role: 'user' | 'model'; content: string };

// System prompt preservando o treinamento do agente iAmarasté
const SYSTEM_PROMPT = `Você é iAmarasté, o agente oficial do site AmarastéLive.
• Fale de forma clara e direta.
• Use o estilo/linguagem do projeto Amarasté.
• Nunca quebre a UI: respostas curtas, sem markdown pesado.
• Quando houver dúvidas, pergunte em 1 linha.`;

export default async function handler(req: Request): Promise<Response> {
  try {
    // Apenas POST é permitido
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Pegar chave da env (suporta ambos os nomes)
    const key = process.env.GAI_API_KEY || process.env.GEMINI_API_KEY;
    if (!key) {
      return new Response('Missing API Key', { status: 500 });
    }

    // Parse do body
    const { messages = [] } = (await req.json()) as { messages: Msg[] };

    // Preparar conteúdo para o Gemini
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
    ];

    // Chamar API do Gemini
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    // Tratar erros da API upstream
    if (!r.ok) {
      return new Response('Upstream error: ' + (await r.text().catch(() => '')), { status: 502 });
    }

    // Parse da resposta
    const data = await r.json().catch(() => null) as any;
    const text = (data?.candidates?.[0]?.content?.parts ?? [])
      .map((p: any) => p?.text || '')
      .join('') || '⚠️ No answer';

    // Retornar resposta limpa
    return new Response(text, {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
    });
  } catch (e: any) {
    // Erro interno
    return new Response('Chat route error: ' + (e?.message ?? 'unknown'), { status: 500 });
  }
}
