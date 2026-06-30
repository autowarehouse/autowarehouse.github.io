export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  usecase: string;
  website: string; // honeypot — must stay empty
  turnstileToken: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

interface EmailSendOptions {
  to: string | string[];
  from: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
}

interface EmailBinding {
  send(options: EmailSendOptions): Promise<{ messageId?: string }>;
}

interface Env {
  EMAIL: EmailBinding;
  TURNSTILE_SECRET: string;
  CONTACT_TO: string;
  CONTACT_FROM: string;
}

export async function parsePayload(request: Request): Promise<ContactPayload> {
  const form = await request.formData();
  const get = (k: string): string => (form.get(k) ?? '').toString();
  return {
    name: get('name'),
    email: get('email'),
    company: get('company'),
    usecase: get('usecase'),
    website: get('website'),
    turnstileToken: get('cf-turnstile-response'),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(p: ContactPayload): ValidationResult {
  const errors: string[] = [];
  const name = p.name.trim();
  if (name.length === 0 || name.length > 120) errors.push('name');
  if (!EMAIL_RE.test(p.email) || p.email.length > 200) errors.push('email');
  const company = p.company.trim();
  if (company.length === 0 || company.length > 160) errors.push('company');
  const usecase = p.usecase.trim();
  if (usecase.length === 0 || usecase.length > 4000) errors.push('usecase');
  return { ok: errors.length === 0, errors };
}

export function isSpam(p: ContactPayload): boolean {
  return p.website.trim().length > 0;
}

export function buildEmail(p: ContactPayload): { subject: string; html: string; text: string } {
  const who = p.company ? `${p.name} (${p.company})` : p.name;
  const subject = `Demo Request — ${who}`;
  const text = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Company: ${p.company || '—'}`,
    '',
    'Use case:',
    p.usecase || '—',
  ].join('\n');
  const esc = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = [
    '<h2>Demo Request</h2>',
    `<p><strong>Name:</strong> ${esc(p.name)}</p>`,
    `<p><strong>Email:</strong> ${esc(p.email)}</p>`,
    `<p><strong>Company:</strong> ${esc(p.company) || '—'}</p>`,
    '<p><strong>Use case:</strong></p>',
    `<p>${esc(p.usecase).replace(/\n/g, '<br>') || '—'}</p>`,
  ].join('\n');
  return { subject, html, text };
}

export async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export default {
  async fetch(_request: Request, _env: Env): Promise<Response> {
    return new Response(JSON.stringify({ ok: false, error: 'not-implemented' }), {
      status: 501,
      headers: { 'content-type': 'application/json' },
    });
  },
} satisfies ExportedHandler<Env>;
