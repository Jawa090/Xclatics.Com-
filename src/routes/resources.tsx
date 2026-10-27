import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/resources")({ staticData: { sitemap: false }, component: () => <Outlet /> });