import { createFileRoute } from "@tanstack/react-router";
import { workflowInput } from "@/lib/workflow-input";

function generateWorkflows(business: string, challenges: string): string {
  return `1. Integrated Pipeline & Scoping Workflow
Challenge addressed: Inconsistent transition between business development and delivery teams.
Process: Capture requirements directly in Xclatix CRM with standardized scoping templates. Once won, the agreement automatically initializes a project workspace with pre-populated milestones and resource assignments.
Immediate step: Establish unified project templates for your primary service offerings.

2. Connected Delivery & Milestone Governance
Challenge addressed: ${challenges.slice(0, 80)}...
Process: Link day-to-day task tracking directly to client-visible milestones and internal team capacity in Xclatix Projects. Centralize documents, approvals, and team discussions in one contextual thread.
Immediate step: Map your delivery milestones and assign clear team ownership for each deliverable.

3. Automated Billing & Real-Time Financial Visibility
Challenge addressed: Billing delays, unbilled scope creep, and revenue leakage.
Process: Automatically trigger billing schedule notifications in Xclatix Invoicing as project milestones are completed and signed off, keeping finance and operational teams fully synchronized.
Immediate step: Configure standard invoicing milestones matching your contract payment terms.

Note: These recommendations provide an operational baseline tailored for a ${business} organisation. Contact the Xclatix team to confirm your custom integration requirements.`;
}

export const Route = createFileRoute("/api/public/workflows")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        let input;
        try {
          input = workflowInput.safeParse(await request.json());
        } catch {
          return Response.json({ error: "Please enter a business type and your challenges." }, { status: 400 });
        }
        if (!input.success) {
          return Response.json(
            { error: "Enter a business type and at least 10 characters describing your challenges." },
            { status: 400 }
          );
        }

        const recommendations = generateWorkflows(input.data.business, input.data.challenges);
        const encoder = new TextEncoder();

        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(JSON.stringify({ text: recommendations }) + "\n"));
              controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + "\n"));
              controller.close();
            },
          }),
          {
            headers: {
              "Content-Type": "application/x-ndjson",
              "Cache-Control": "no-cache, no-transform",
            },
          }
        );
      },
    },
  },
});