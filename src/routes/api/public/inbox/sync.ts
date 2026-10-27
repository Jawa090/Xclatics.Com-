import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/inbox/sync')({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async () => {
        return Response.json({ ok: true, synced: 0 });
      },
    },
  },
});