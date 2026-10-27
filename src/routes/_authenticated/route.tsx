import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  ssr: false,
  staticData: { sitemap: false },
  component: () => <Outlet />,
});