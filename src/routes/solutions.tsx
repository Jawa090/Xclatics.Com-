import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions")({ staticData: { sitemap: false }, component: () => <Outlet /> });