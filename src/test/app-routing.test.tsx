import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the new website navigation destinations", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of ["/about", "/contact", "/why-xclatix", "/pricing"]) {
      expect(router.matchRoutes(path).at(-1)?.routeId).toBe(path);
    }
    for (const module of ["crm", "projects", "hr", "invoicing", "collaboration", "prospecting", "omnichannel-ai"]) {
      expect(router.matchRoutes(`/product/${module}`).at(-1)?.routeId).toBe("/product/$module");
    }
    for (const topic of ["ai", "connected-operations", "privacy"]) {
      expect(router.matchRoutes(`/platform/${topic}`).at(-1)?.routeId).toBe("/platform/$topic");
    }
    for (const topic of ["guides", "onboarding", "case-studies", "help"]) {
      expect(router.matchRoutes(`/resources/${topic}`).at(-1)?.routeId).toBe("/resources/$topic");
    }
  });
  it("matches all six solution pages and the demo page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const business of ["services", "agencies", "bpo", "technology", "field", "locations"]) {
      expect(router.matchRoutes(`/solutions/${business}`).at(-1)?.routeId).toBe("/solutions/$business");
    }
    expect(router.matchRoutes("/demo").at(-1)?.routeId).toBe("/demo");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
