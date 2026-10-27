import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/lib/business-solutions";
import { Button } from "@/components/ui/button";

export function BusinessSolutions() {
  return (
    <section id="solutions" className="scroll-mt-32 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Solutions by business</p>
        <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Different businesses.<br />One connected way to work.</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">Explore a connected approach to your clients, teams, delivery, and billing.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map(({ id, label, icon: Icon, outcome }) => (
            <article key={id} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold">{label}</h3>
              <p className="mb-6 mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{outcome}</p>
              <Button asChild variant="link" className="justify-start p-0">
                <Link to="/solutions/$business" params={{ business: id }}>Explore solution <ArrowRight aria-hidden="true" /></Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const practices = [
  { number: "01", title: "Onboard people into the work—not just the company.", text: "Connect the people context in HR with the projects and colleagues a new starter will work with. Managers can clarify responsibilities and answer questions alongside the relevant work, instead of relying on informal introductions alone.", example: "New hire → Role expectations → Project ownership → Team conversation" },
  { number: "02", title: "Turn operational know-how into shared context.", text: "Client requirements, project decisions, and handoff conversations should not disappear when someone changes roles. Keep that context with the CRM profile or project so the next person has a practical starting point.", example: "Client requirement → Project discussion → Decision → Next owner" },
  { number: "03", title: "Make accountability part of everyday delivery.", text: "A shared operating approach needs more than a list of instructions. Organize work around clear responsibility, visible project progress, and conversations with the people who can resolve the next blocker.", example: "Task → Owner → Progress → Escalation → Resolution" },
  { number: "04", title: "Give each department a place in the same story.", text: "Sales needs to know what was delivered. Operations needs to know what was promised. HR needs people context, and finance needs billing context. Bring those perspectives together instead of rebuilding the story for every department.", example: "CRM + Projects + HR + Invoicing + Contextual collaboration" },
];

export function OperationalPractices() {
  return (
    <section className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">People. Process. Execution.</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Make good operations repeatable.</h2>
          <p className="mt-6 text-lg text-muted-foreground">Growing teams need a shared understanding of how work gets done—and a connected place to actually do it.</p>
        </div>
        <div className="mt-12 grid gap-x-12 md:grid-cols-2">
          {practices.map((practice) => (
            <article key={practice.number} className="border-t border-border py-8">
              <span className="font-display text-sm font-bold text-primary">{practice.number}</span>
              <h3 className="mt-3 text-2xl font-bold leading-snug">{practice.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{practice.text}</p>
              <p className="mt-5 text-sm font-medium leading-relaxed">{practice.example}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}