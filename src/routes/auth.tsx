import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/site-content';

export const Route = createFileRoute('/auth')({
  staticData: { sitemap: false },
  head: () => ({
    ...pageHead('Team sign in', 'Secure access to the Xclatix shared customer inbox.'),
    meta: [
      ...pageHead('Team sign in', 'Secure access to the Xclatix shared customer inbox.').meta,
      { name: 'robots', content: 'noindex,nofollow' },
    ],
  }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex min-h-[65dvh] max-w-md flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold text-primary">XCLATIX · TEAM WORKSPACE</p>
      <h1 className="mt-4 text-4xl font-bold">Your conversations,<br />connected.</h1>
      <p className="mt-4 text-muted-foreground">Sign in to the shared inbox. Team members can view and manage connected customer conversations.</p>
      <div className="mt-8 grid gap-3">
        <Button onClick={() => void navigate({ to: '/inbox' })}>
          Open shared inbox
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Back to website</Link>
        </Button>
      </div>
    </main>
  );
}