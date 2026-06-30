import { describe, test, expect, afterEach, mock } from 'bun:test';
import worker, { parsePayload, validate, isSpam, buildEmail, verifyTurnstile } from './index';

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

  test('flags an over-long name', () => {
    const r = validate({ ...full, name: 'x'.repeat(121) });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('name');
  });

  test('flags an over-long company', () => {
    const r = validate({ ...full, company: 'x'.repeat(161) });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('company');
  });

  test('flags an over-long email', () => {
    const r = validate({ ...full, email: `${'x'.repeat(196)}@x.io` });
    expect(r.ok).toBe(false);
    expect(r.errors).toContain('email');
  });
});

describe('isSpam', () => {
  test('clean when honeypot is empty', () => {
    expect(isSpam({ ...base, website: '' })).toBe(false);
  });
  test('clean when honeypot is whitespace', () => {
    expect(isSpam({ ...base, website: '   ' })).toBe(false);
  });
  test('spam when honeypot is filled', () => {
    expect(isSpam({ ...base, website: 'http://spam.example' })).toBe(true);
  });
});

describe('buildEmail', () => {
  test('subject includes company when present', () => {
    const { subject } = buildEmail({ ...base, name: 'Ada', company: 'Engines' });
    expect(subject).toBe('Demo Request — Ada (Engines)');
  });

  test('subject is just the name when no company', () => {
    expect(buildEmail({ ...base, name: 'Ada' }).subject).toBe('Demo Request — Ada');
  });

  test('text body carries email and usecase', () => {
    const { text } = buildEmail({ ...base, email: 'ada@x.io', usecase: 'Unify data' });
    expect(text).toContain('ada@x.io');
    expect(text).toContain('Unify data');
  });

  test('html escapes angle brackets', () => {
    const { html } = buildEmail({ ...base, name: '<script>' });
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

describe('verifyTurnstile', () => {
  test('returns false for an empty token without calling fetch', async () => {
    const spy = mock(async () => new Response('{}'));
    globalThis.fetch = spy as unknown as typeof fetch;
    expect(await verifyTurnstile('', 'secret', null)).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });

  test('returns true when siteverify succeeds', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch;
    expect(await verifyTurnstile('tok', 'secret', '1.2.3.4')).toBe(true);
  });

  test('returns false when siteverify rejects', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: false }))) as unknown as typeof fetch;
    expect(await verifyTurnstile('tok', 'secret', null)).toBe(false);
  });

  test('returns false (does not throw) when siteverify returns a non-JSON body', async () => {
    globalThis.fetch = (async () => new Response('<html>503</html>', { status: 503 })) as unknown as typeof fetch;
    expect(await verifyTurnstile('tok', 'secret', null)).toBe(false);
  });
});

function fakeEnv(send: (o: unknown) => Promise<{ messageId?: string }>) {
  return {
    EMAIL: { send },
    TURNSTILE_SECRET: 'secret',
    CONTACT_TO: 'info@intellica.net',
    CONTACT_FROM: 'noreply@autowarehouse.ai',
  };
}

const okFields = {
  name: 'Ada',
  email: 'ada@example.com',
  company: 'Engines',
  usecase: 'Unify data',
  website: '',
  'cf-turnstile-response': 'tok',
};

describe('fetch handler', () => {
  test('rejects non-POST with 405', async () => {
    const res = await worker.fetch(
      new Request('https://autowarehouse.ai/api/contact'),
      fakeEnv(async () => ({})) as never,
    );
    expect(res.status).toBe(405);
  });

  test('rejects a filled honeypot with 400 before sending', async () => {
    const send = mock(async () => ({}));
    const res = await worker.fetch(formRequest({ ...okFields, website: 'bot' }), fakeEnv(send) as never);
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  test('sends and returns 200 on a valid human submission', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch;
    const send = mock(async () => ({ messageId: 'm1' }));
    const res = await worker.fetch(formRequest(okFields), fakeEnv(send) as never);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const arg = send.mock.calls[0][0] as { to: string; replyTo: string; from: { email: string; name?: string } };
    expect(arg.to).toBe('info@intellica.net');
    expect(arg.replyTo).toBe('ada@example.com');
    expect(arg.from).toEqual({ email: 'noreply@autowarehouse.ai', name: 'AutoWarehouse' });
  });

  test('returns 502 when send throws', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch;
    const res = await worker.fetch(
      formRequest(okFields),
      fakeEnv(async () => {
        throw new Error('boom');
      }) as never,
    );
    expect(res.status).toBe(502);
  });

  test('rejects invalid fields with 400 validation error before sending', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: true }))) as unknown as typeof fetch;
    const send = mock(async () => ({}));
    const res = await worker.fetch(formRequest({ ...okFields, email: 'not-an-email' }), fakeEnv(send) as never);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'validation', fields: ['email'] });
    expect(send).not.toHaveBeenCalled();
  });

  test('rejects a failed turnstile verification with 400 before sending', async () => {
    globalThis.fetch = (async () => new Response(JSON.stringify({ success: false }))) as unknown as typeof fetch;
    const send = mock(async () => ({}));
    const res = await worker.fetch(formRequest(okFields), fakeEnv(send) as never);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: 'verification' });
    expect(send).not.toHaveBeenCalled();
  });

  test('forwards CF-Connecting-IP to siteverify as remoteip', async () => {
    let capturedBody: BodyInit | null | undefined;
    globalThis.fetch = (async (_url: string, opts: RequestInit) => {
      capturedBody = opts.body;
      return new Response(JSON.stringify({ success: true }));
    }) as unknown as typeof fetch;
    const send = mock(async () => ({ messageId: 'm1' }));
    const req = formRequest(okFields);
    req.headers.set('CF-Connecting-IP', '203.0.113.7');
    const res = await worker.fetch(req, fakeEnv(send) as never);
    expect(res.status).toBe(200);
    const form = await new Response(capturedBody).formData();
    expect(form.get('remoteip')).toBe('203.0.113.7');
  });
});
