const SYSTEM_PROMPT = `You are an expert Java mentor specialising in backend development and technical interview preparation.

Your role:
- Answer Java questions clearly and accurately
- Keep answers concise and practical (2-4 short paragraphs max unless code is needed)
- Include a short code example when it helps illustrate the answer
- Frame answers in terms of how the concept appears in interviews or real backend systems
- Cover Java, Spring, JVM, concurrency, collections, design patterns, and SQL as needed
- If asked about something unrelated to Java/backend development, politely redirect

Format:
- Use plain text. For code, use triple backticks with java as the language.
- Avoid long preambles. Get to the answer quickly.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI Mentor is not configured. Add ANTHROPIC_API_KEY to your environment.' });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'No messages provided' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(502).json({ error: err.error?.message || 'AI Mentor request failed' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || '';
    return res.status(200).json({ reply });
  } catch {
    return res.status(502).json({ error: 'Could not reach the AI service. Try again shortly.' });
  }
}
