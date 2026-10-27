import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({ inputValidator: () => ({ handler: (fn: unknown) => fn }) }),
}));
vi.mock('@tanstack/react-start/server', () => ({
  getRequest: () => new Request('https://www.xclatix.com/demo', { headers: { origin: 'https://www.xclatix.com' } }),
}));

import { requestDemo } from '@/lib/demo.functions';

const input = {
  name: 'Test prospect',
  email: 'prospect@example.com',
  company: 'Example',
  businessType: 'services',
  challenges: 'Sales handoffs',
  website: '',
};

const handler = requestDemo as unknown as (arg: { data: typeof input }) => Promise<{ ok: boolean; error: string | null }>;

describe('demo requests', () => {
  it('successfully receives and processes a demo request', async () => {
    const res = await handler({ data: input });
    expect(res.ok).toBe(true);
    expect(res.error).toBe(null);
  });

  it('rejects submissions with honeypot website filled', async () => {
    const res = await handler({ data: { ...input, website: 'http://spam.com' } });
    expect(res.ok).toBe(false);
  });
});