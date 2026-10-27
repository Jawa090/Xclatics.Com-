import { z } from 'zod';

export const chatInput = z.object({ token: z.string().uuid(), name: z.string().trim().min(2).max(100), body: z.string().trim().min(1).max(3000), requestId: z.string().uuid() });
export const replyInput = z.object({ conversationId: z.string().uuid(), body: z.string().trim().min(1).max(5000), note: z.boolean(), requestId: z.string().uuid() });
export const settingsInput = z.object({ knowledge: z.string().trim().min(20).max(12000), auto_reply: z.boolean(), gmail_enabled: z.boolean(), gmail_query: z.string().trim().min(1).max(300) });
export function canAutoReply(globalEnabled: boolean, conversationEnabled: boolean, paused: boolean, direction: string, state: string) {
  return globalEnabled && conversationEnabled && !paused && direction === 'inbound' && state === 'pending';
}
export function safeEmailAddress(value: string) {
  if (/[\r\n]/.test(value)) throw new Error('Invalid email address');
  const address = value.match(/<([^<>]+)>/)?.[1] ?? value.trim();
  return z.string().email().max(254).parse(address);
}
export function encodeEmail(to: string, subject: string, body: string, messageId: string) {
  safeEmailAddress(to);
  const b64 = (value: string) => btoa(Array.from(new TextEncoder().encode(value), b => String.fromCharCode(b)).join(''));
  const cleanSubject = subject.replace(/[\r\n]/g, ' ').slice(0, 200);
  const mail = [`To: ${to}`, `Subject: =?UTF-8?B?${b64(cleanSubject)}?=`, `Message-ID: <${messageId}@xclatix.com>`, 'Auto-Submitted: auto-replied', 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', '', body].join('\r\n');
  return b64(mail).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}