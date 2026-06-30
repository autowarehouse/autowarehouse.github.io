import { describe, test, expect } from 'bun:test';
import { parsePayload } from './index';

function formRequest(fields: Record<string, string>): Request {
  const body = new FormData();
  for (const [k, v] of Object.entries(fields)) body.append(k, v);
  return new Request('https://autowarehouse.ai/api/contact', { method: 'POST', body });
}

describe('parsePayload', () => {
  test('maps form fields and the turnstile token', async () => {
    const req = formRequest({
      name: 'Ada',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      usecase: 'Unify warehouse data',
      website: '',
      'cf-turnstile-response': 'tok123',
    });
    const p = await parsePayload(req);
    expect(p).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      company: 'Analytical Engines',
      usecase: 'Unify warehouse data',
      website: '',
      turnstileToken: 'tok123',
    });
  });

  test('missing fields default to empty strings', async () => {
    const p = await parsePayload(formRequest({ name: 'Ada', email: 'ada@example.com' }));
    expect(p.company).toBe('');
    expect(p.usecase).toBe('');
    expect(p.website).toBe('');
    expect(p.turnstileToken).toBe('');
  });
});
