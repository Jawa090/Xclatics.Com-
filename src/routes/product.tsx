import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/product")({ staticData: { sitemap: false }, component: () => <Outlet /> });