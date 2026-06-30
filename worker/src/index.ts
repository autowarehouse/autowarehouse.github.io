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

export function validate(_p: ContactPayload): ValidationResult {
  throw new Error('not implemented');
}

export function isSpam(_p: ContactPayload): boolean {
  throw new Error('not implemented');
}

export function buildEmail(_p: ContactPayload): { subject: string; html: string; text: string } {
  throw new Error('not implemented');
}

export async function verifyTurnstile(_token: string, _secret: string, _ip: string | null): Promise<boolean> {
  throw new Error('not implemented');
}

export default {
  async fetch(_request: Request, _env: Env): Promise<Response> {
    return new Response(JSON.stringify({ ok: false, error: 'not-implemented' }), {
      status: 501,
      headers: { 'content-type': 'application/json' },
    });
  },
} satisfies ExportedHandler<Env>;
