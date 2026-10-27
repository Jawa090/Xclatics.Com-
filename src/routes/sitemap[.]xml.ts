import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { platformPages, products, resources } from "@/lib/site-content";
import { solutions } from "@/lib/business-solutions";

const BASE_URL = "https://www.xclatix.com";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        if (isSitemapRouteIncluded(router.routesById["/product/$module"])) {
          for (const product of products) {
            const location = router.buildLocation({
              to: "/product/$module",
              params: { module: product.id },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, "/product/$module");
            if (path) entries.push({ path });
          }
        }

        if (isSitemapRouteIncluded(router.routesById["/platform/$topic"])) {
          for (const page of platformPages) {
            const location = router.buildLocation({
              to: "/platform/$topic",
              params: { topic: page.id },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, "/platform/$topic");
            if (path) entries.push({ path });
          }
        }

        if (isSitemapRouteIncluded(router.routesById["/resources/$topic"])) {
          for (const resource of resources) {
            const location = router.buildLocation({
              to: "/resources/$topic",
              params: { topic: resource.id },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, "/resources/$topic");
            if (path) entries.push({ path });
          }
        }

        if (isSitemapRouteIncluded(router.routesById["/solutions/$business"])) {
          for (const solution of solutions) {
            const location = router.buildLocation({
              to: "/solutions/$business",
              params: { business: solution.id },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, "/solutions/$business");
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
