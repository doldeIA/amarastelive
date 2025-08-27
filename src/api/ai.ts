import { openai } from 'ai';
import { StreamingTextResponse, Message } from 'ai';

const config = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  baseURL: import.meta.env.VITE_GOOGLE_AI_BASE_URL || '',
};

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // Convert OpenAI format to Gemini format
  const geminiMessages = messages.map(message => ({
    role: message.role === 'user' ? 'user' : 'model',
    parts: [{ text: message.content }]
  }));

  const response = await fetch(`${config.baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': config.apiKey,
    },
    body: JSON.stringify({
      contents: geminiMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(error, { status: 500 });
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  return new StreamingTextResponse(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(new TextEncoder().encode(text));
        controller.close();
      },
    })
  );
}
