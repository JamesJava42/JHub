export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'No code provided' });
  }

  const needsWrapper = !code.includes('class ') || !code.includes('public static void main');
  const source = needsWrapper
    ? `public class Main {\n  public static void main(String[] args) {\n${code
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n')}\n  }\n}`
    : code;

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'java',
        version: '*',
        files: [{ name: 'Main.java', content: source }],
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Code runner unavailable. Try again shortly.' });
    }

    const data = await response.json();
    const stdout = data.run?.stdout || '';
    const stderr = data.run?.stderr || '';
    const exitCode = data.run?.code ?? 0;

    return res.status(200).json({ stdout, stderr, exitCode });
  } catch {
    return res.status(502).json({ error: 'Could not reach the code runner. Check your connection.' });
  }
}
