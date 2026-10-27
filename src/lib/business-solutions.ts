import { BriefcaseBusiness, Building2, Headset, Laptop, Megaphone, Wrench } from "lucide-react";

export const solutions = [
  {
    id: "services", label: "Professional services", icon: BriefcaseBusiness,
    title: "Carry the client promise through to delivery.",
    intro: "Consultancies, accounting firms, and other client-service teams need the scope agreed in sales to stay visible to the people doing the work.",
    challenge: "Client requirements live in a sales conversation. Delivery starts with missing context, responsibilities are unclear, and finance has to chase the team for billing details.",
    steps: [
      { title: "Build a shared client context", text: "Keep the relationship, requirements, and agreed scope in CRM so the delivery team has a clear starting point." },
      { title: "Give delivery a named owner", text: "Organize the engagement in projects with tasks and responsibility. Discuss changes alongside the work rather than in a disconnected chat." },
      { title: "Close the loop with finance", text: "Use delivery status and client context to coordinate invoicing and resolve questions before the next billing conversation." },
    ],
    roles: "Sales → Engagement lead → Delivery team → Finance",
    outcome: "A clearer path from signed engagement to completed work and invoice.",
  },
  {
    id: "agencies", label: "Agencies & creative", icon: Megaphone,
    title: "Keep the brief, the team, and the client aligned.",
    intro: "Marketing, design, and digital agencies balance multiple clients, changing briefs, and specialists who need the same context.",
    challenge: "A revised brief gets buried in chat, account managers repeat updates, and creatives lose time piecing together what the client actually approved.",
    steps: [
      { title: "Start with the relationship", text: "Keep client needs and campaign scope in CRM, then use that context to organize the project and its deliverables." },
      { title: "Coordinate the production work", text: "Bring account managers, designers, and developers into project conversations with clear task ownership and visible progress." },
      { title: "Resolve changes where they happen", text: "Discuss revisions on the relevant work, agree next steps, and keep finance aligned with the engagement as it evolves." },
    ],
    roles: "Account manager → Creative lead → Production team → Finance",
    outcome: "Less repeated briefing and more shared context across client delivery.",
  },
  {
    id: "bpo", label: "BPO & support", icon: Headset,
    title: "Make every client handoff less dependent on memory.",
    intro: "Outsourcing and support operations need account context to travel between managers, team leads, and the people serving each client.",
    challenge: "A new team member or a change in ownership means rebuilding client context. Escalations travel through separate channels with no clear connection to the work.",
    steps: [
      { title: "Keep account expectations visible", text: "Maintain the client relationship in CRM and organize each account’s operational work in projects." },
      { title: "Connect people with responsibilities", text: "Use HR records and project ownership to coordinate the team, while managers clarify the work and expectations in context." },
      { title: "Escalate with the full picture", text: "Discuss operational issues alongside the relevant client or project so the next owner does not have to reconstruct the conversation." },
    ],
    roles: "Account lead → Team lead → Operations team → Client liaison",
    outcome: "More consistent account context when people or responsibilities change.",
  },
  {
    id: "technology", label: "IT & technology", icon: Laptop,
    title: "Bridge the gap between the deal and the technical work.",
    intro: "Software consultancies and IT service businesses need commercial teams and technical teams to work from the same client understanding.",
    challenge: "Sales commits to a scope that engineers have to rediscover. Technical blockers sit in a separate tool, and client-facing teams cannot see what changed.",
    steps: [
      { title: "Preserve the commercial context", text: "Use CRM to keep client requirements and commitments accessible when planning a technical engagement." },
      { title: "Coordinate implementation", text: "Break delivery into project tasks and discuss blockers with the relevant people through contextual chat, voice, or video." },
      { title: "Keep the business side connected", text: "Bring account managers and finance into the delivery conversation so progress, changes, and invoicing are not separate stories." },
    ],
    roles: "Sales → Technical lead → Implementation team → Account manager",
    outcome: "Shared visibility between commercial promises and technical execution.",
  },
  {
    id: "field", label: "Field & project services", icon: Wrench,
    title: "Connect the office to the people delivering the job.",
    intro: "Installation, maintenance, and project-service businesses need client details, job responsibilities, and billing discussions to stay connected.",
    challenge: "The office has one version of the job while the delivery team has another. Changes are relayed informally, and completed work is slow to reach finance.",
    steps: [
      { title: "Establish the job context", text: "Keep the client relationship and requirements in CRM and organize the job as a project with a clear owner." },
      { title: "Keep the team connected", text: "Use project tasks and contextual conversations to coordinate questions, changes, and next steps between the office and delivery team." },
      { title: "Bring completion into billing", text: "Give finance access to the delivery context so the team can coordinate invoicing without starting a separate information chase." },
    ],
    roles: "Office team → Project lead → Delivery team → Finance",
    outcome: "A more connected job lifecycle from client request to invoice.",
  },
  {
    id: "locations", label: "Multi-location teams", icon: Building2,
    title: "Keep local work connected to the wider business.",
    intro: "Growing service groups and multi-location businesses need shared operational context without making every decision depend on head office.",
    challenge: "Each location develops its own habits. Managers repeat instructions, new starters depend on whoever is available, and leadership pieces together updates manually.",
    steps: [
      { title: "Align responsibilities", text: "Use HR records and project ownership to make the people responsible for local work visible to the wider team." },
      { title: "Make recurring work explicit", text: "Organize operational tasks in projects and keep discussions attached to the work, giving managers a shared reference for expectations." },
      { title: "Connect local and central teams", text: "Bring location leads, operations, and finance into relevant conversations so questions are resolved with business context intact." },
    ],
    roles: "Central operations → Location lead → Local team → Finance",
    outcome: "Shared context and clearer ownership across a growing organization.",
  },
] as const;

export type BusinessSolution = (typeof solutions)[number];
