import { createFileRoute, notFound } from "@tanstack/react-router";
import { solutions } from "@/lib/business-solutions";
import { SolutionPage } from "@/components/solution-page";

export const Route = createFileRoute("/solutions/$business")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    if (!solutions.some((solution) => solution.id === params.business)) throw notFound();
  },
  head: ({ params }) => {
    const solution = solutions.find((item) => item.id === params.business);
    const title = solution ? `Xclatix for ${solution.label} — Connected Operations` : "Solution not found — Xclatix";
    const description = solution ? solution.intro : "Explore Xclatix business solutions.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        { property: "og:url", content: `/solutions/${params.business}` },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.business}` }],
    };
  },
  component: BusinessPage,
});

function BusinessPage() {
  const { business } = Route.useParams();
  const solution = solutions.find((item) => item.id === business);
  if (!solution) return null;
  return <SolutionPage solution={solution} />;
}