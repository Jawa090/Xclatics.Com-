import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { replyInput, settingsInput } from './rules';

interface MockConversation {
  id: string;
  name: string;
  subject: string;
  address: string;
  channel: string;
  status: 'open' | 'resolved';
  ai_enabled: boolean;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

interface MockMessage {
  id: string;
  conversation_id: string;
  direction: 'inbound' | 'outbound' | 'note';
  sender: string;
  body: string;
  created_at: string;
}

let conversations: MockConversation[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    name: 'Sarah Jenkins',
    subject: 'Operational alignment for 40-person agency',
    address: 'sarah@apexconsulting.com',
    channel: 'chat',
    status: 'open',
    ai_enabled: true,
    assigned_to: null,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    name: 'David Lee',
    subject: 'Connecting CRM pipeline with billing',
    address: 'david@vanguardtech.io',
    channel: 'email',
    status: 'open',
    ai_enabled: false,
    assigned_to: null,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

let messages: MockMessage[] = [
  {
    id: 'm1111111-1111-1111-1111-111111111111',
    conversation_id: 'c1111111-1111-1111-1111-111111111111',
    direction: 'inbound',
    sender: 'Sarah Jenkins',
    body: 'Hi! We are an agency switching from multiple disjoint tools. Can Xclatix connect our project delivery directly to billing?',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'm1111111-1111-1111-1111-111111111112',
    conversation_id: 'c1111111-1111-1111-1111-111111111111',
    direction: 'outbound',
    sender: 'Xclatix AI',
    body: 'Hello Sarah! Yes, Xclatix unifies CRM, project milestones, and invoicing in a single workflow so milestones automatically feed your billing cycle.',
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'm2222222-2222-2222-2222-222222222221',
    conversation_id: 'c2222222-2222-2222-2222-222222222222',
    direction: 'inbound',
    sender: 'David Lee',
    body: 'Can we schedule a live walkthrough with our operations team next Tuesday?',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

let settings = {
  id: true,
  knowledge: 'Xclatix connects CRM, projects, HR, invoicing, and team collaboration into a single business operating system.',
  auto_reply: true,
  gmail_enabled: false,
  gmail_query: 'in:inbox label:xclatix',
  last_sync: null as string | null,
  sync_error: null as string | null,
  pause_reason: null as string | null,
};

export const loadInbox = createServerFn({ method: 'GET' }).handler(async () => {
  return {
    authorized: true as const,
    conversations,
    messages,
    settings,
    userId: 'team-user',
    owner: true,
  };
});

export const updateConversation = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(['open', 'resolved']),
        ai_enabled: z.boolean(),
        assigned_to: z.string().uuid().nullable(),
      })
      .parse(input)
  )
  .handler(async ({ data }) => {
    conversations = conversations.map((c) =>
      c.id === data.id
        ? {
            ...c,
            status: data.status,
            ai_enabled: data.ai_enabled,
            assigned_to: data.assigned_to,
            updated_at: new Date().toISOString(),
          }
        : c
    );
    return { ok: true };
  });

export const sendInboxReply = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => replyInput.parse(input))
  .handler(async ({ data }) => {
    messages.push({
      id: data.requestId,
      conversation_id: data.conversationId,
      direction: data.note ? 'note' : 'outbound',
      sender: data.note ? 'Team note' : 'Xclatix team',
      body: data.body,
      created_at: new Date().toISOString(),
    });
    return { ok: true };
  });

export const saveInboxSettings = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => settingsInput.parse(input))
  .handler(async ({ data }) => {
    settings = {
      ...settings,
      ...data,
    };
    return { ok: true };
  });

export const syncInbox = createServerFn({ method: 'POST' }).handler(async () => {
  return { ok: true };
});