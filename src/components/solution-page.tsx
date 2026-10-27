import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { type BusinessSolution } from "@/lib/business-solutions";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/demo-form";

export function SolutionPage({ solution }: { solution: BusinessSolution }) {
  const Icon = solution.icon;
  return (
    <>
      <main>
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" aria-hidden="true" />All business solutions</Link>
          <p className="mt-10 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-primary"><Icon className="size-5" aria-hidden="true" />{solution.label}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Xclatix for {solution.label.toLowerCase()}</h1>
          <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug">{solution.title}</p>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{solution.intro}</p>
          <Button asChild size="lg" className="mt-8"><a href="#demo">Request a demo <ArrowRight aria-hidden="true" /></a></Button>
        </section>
        <section className="border-t border-border py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">The challenge</p>
              <h2 className="mt-4 text-3xl font-bold">Disconnected work creates avoidable handoffs.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{solution.challenge}</p>
              <p className="mt-8 flex gap-2 leading-relaxed"><Check className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />{solution.outcome}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">A connected workflow</h2>
              <ol className="mt-5">
                {solution.steps.map((step, i) => <li key={step.title} className="flex gap-4 border-b border-border py-6"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary font-semibold text-primary">0{i + 1}</span><div><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p></div></li>)}
              </ol>
              <p className="mt-6 text-sm font-medium leading-relaxed">{solution.roles}</p>
            </div>
          </div>
        </section>
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold">The business context, in one place.</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["CRM", "Keep client relationships and requirements accessible."],
                ["Projects", "Organize delivery tasks, ownership, and progress."],
                ["HR", "Connect the people context with day-to-day work."],
                ["Invoicing", "Coordinate billing with the delivery conversation."],
                ["Collaboration", "Keep chat, voice, and video alongside relevant work."],
              ].map(([title, text]) => <article key={title} className="border-t border-border pt-5"><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}
            </div>
          </div>
        </section>
        <DemoForm businessType={solution.id} />
      </main>
    </>
  );
}