import { createFileRoute } from "@tanstack/react-router";
import { DemoForm } from "@/components/demo-form";

export const Route = createFileRoute("/demo")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Request a Demo — Xclatix" },
      { name: "description", content: "Request a Xclatix demo and discuss a connected approach to your company's sales, projects, HR, and invoicing." },
      { property: "og:title", content: "Request a Demo — Xclatix" },
      { property: "og:description", content: "Tell the Xclatix team about your business and operational challenges." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/demo" },
    ],
    links: [{ rel: "canonical", href: "/demo" }],
  }),
  component: () => <main><DemoForm headingLevel="h1" /></main>,
});