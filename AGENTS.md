# Xclatix Project Guidelines

- Keep decorative business-flow visuals in a browser-safe standalone component with CSS animation and reduced-motion support, so presentation does not add server dependencies.
- Render brand images at their intrinsic aspect ratios with object-contain, so placement never distorts uploaded artwork.
- Keep business-solution data browser-safe and shared between the solution directory and /solutions/$business pages, so each business has a shareable URL and consistent content.
- Store demo submissions in a service-only table through a validated same-origin server function with durable rate limiting, so visitors cannot read other leads and requests reach the owner.
- Send demo owner notifications synchronously after saving through the managed template helper, with submission-based idempotency and fixed template recipients; sending failures must preserve the saved enquiry without requesting duplicate submissions.
- Keep workflow advice as a stateless, same-origin, input-validated streaming server endpoint using request-scoped AI Gateway SDK helpers; never store visitor descriptions or expose server credentials.
- Render the shared website navigation and footer only in the root shell so every page has consistent navigation without duplicate headers.
- Keep product, platform, and resource inventories in browser-safe shared data and validate dynamic page identifiers so navigation and page content stay aligned.
- Keep the support workspace separate from the public website shell; protect all inbox operations through verified membership and RLS, and grant the initial owner only after verified authentication.
- Store customer conversations separately from managed transactional email delivery; Gmail is a connected support mailbox, not a replacement for demo notification infrastructure.
- Make automatic support replies claim-once, request-scoped streaming AI calls with durable pause state and human takeover checks; retain uncertain provider sends for operator review rather than replaying them.
