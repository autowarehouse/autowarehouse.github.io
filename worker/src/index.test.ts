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

import { validate } from './index';

const base = {
  name: 'Ada',
  email: 'ada@example.com',
  company: '',
  usecase: '',
  website: '',
  turnstileToken: 'tok',
};

describe('validate', () => {
  // All four fields (name, email, company, usecase) are required.
  const full = { ...base, company: 'Analytical Engines', usecase: 'Unify warehouse data' };

  test('accepts a well-formed payload', () => {
    expect(validate(full)).toEqual({ ok: true, errors: [] });
  });

  test('flags a missing name', () => {
    const r = validate({ ...full, name: '   ' });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('name');
  });

  test('flags a malformed email', () => {
    const r = validate({ ...full, email: 'not-an-email' });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('email');
  });

  test('flags a missing company', () => {
    const r = validate({ ...full, company: '   ' });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('company');
  });

  test('flags a missing usecase', () => {
    const r = validate({ ...full, usecase: '' });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('usecase');
  });

  test('flags an over-long usecase', () => {
    const r = validate({ ...full, usecase: 'x'.repeat(4001) });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('usecase');
  });
});
