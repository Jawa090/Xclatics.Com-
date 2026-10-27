import { createFileRoute } from "@tanstack/react-router";
import { BusinessSolutions } from "@/components/business-solutions";

export const Route = createFileRoute("/solutions/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Business Solutions — Xclatix" },
      { name: "description", content: "Explore Xclatix solutions for professional services, agencies, BPOs, IT, field services, and multi-location teams." },
      { property: "og:title", content: "Business Solutions — Xclatix" },
      { property: "og:description", content: "Find a connected workflow for your clients, delivery, people, and billing." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: () => <main><BusinessSolutions /></main>,
});