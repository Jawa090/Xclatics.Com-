import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { chatInput } from '@/lib/inbox/rules';

interface ChatMessage {
  id: string;
  sender: string;
  body: string;
  direction: 'inbound' | 'outbound';
  created_at: string;
}

const chatSessions = new Map<string, ChatMessage[]>();

function getAutoResponse(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('demo') || lower.includes('try') || lower.includes('walkthrough')) {
    return 'We would love to show you Xclatix in action! You can request a guided demo directly from our /demo page, or leave your details here.';
  }
  if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
    return 'Xclatix offers predictable, transparent modular pricing. Check out our /pricing page or contact our team for enterprise packages.';
  }
  if (lower.includes('crm') || lower.includes('sales')) {
    return 'Xclatix CRM connects leads and customer relationships directly into delivery workflows and project timelines without disjoint tools.';
  }
  if (lower.includes('project') || lower.includes('task')) {
    return 'Our Projects module connects team tasks, milestones, and deliverables directly with client approvals and billing.';
  }
  if (lower.includes('hr') || lower.includes('people') || lower.includes('employee')) {
    return 'With Xclatix HR, team members, time-off, and organizational context stay seamlessly aligned with active project work.';
  }
  return 'Thank you for reaching out! Xclatix unifies CRM, project management, HR, and invoicing into one connected OS for your business. How can we help your team today?';
}

export const Route = createFileRoute('/api/public/inbox/chat')({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        let input;
        try {
          const body = await request.json();
          input = chatInput.parse(body);
        } catch {
          return Response.json({ error: 'Enter your name and a message.' }, { status: 400 });
        }

        const session = chatSessions.get(input.token) ?? [];
        session.push({
          id: input.requestId,
          sender: input.name,
          body: input.body,
          direction: 'inbound',
          created_at: new Date().toISOString(),
        });

        const replyText = getAutoResponse(input.body);
        session.push({
          id: crypto.randomUUID(),
          sender: 'Xclatix Assistant',
          body: replyText,
          direction: 'outbound',
          created_at: new Date().toISOString(),
        });
        chatSessions.set(input.token, session);

        const encoder = new TextEncoder();
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(JSON.stringify({ saved: true }) + '\n'));
              controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + '\n'));
              controller.close();
            },
          }),
          { headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store' } }
        );
      },
      GET: async ({ request }) => {
        const token = z.string().uuid().safeParse(request.headers.get('x-chat-token'));
        if (!token.success) return Response.json({ error: 'Invalid chat session.' }, { status: 400 });

        const messages = chatSessions.get(token.data) ?? [];
        return Response.json({ messages }, { headers: { 'Cache-Control': 'no-store' } });
      },
    },
  },
});