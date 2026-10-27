import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import heroTeam from "@/assets/hero-team.jpg";
import { OperationsBackground } from "@/components/operations-background";
import { WorkflowAdvisor } from "@/components/workflow-advisor";
import { BusinessSolutions, OperationalPractices } from "@/components/business-solutions";
import { Button } from "@/components/ui/button";
import { products, pageHead } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => pageHead("Xclatix — Your entire business, connected", "Connect CRM, projects, HR, invoicing, and collaboration. Explore Xclatix for your business and request a guided demo."),
  component: Home,
});

function Home() {
  const [active, setActive] = useState(0);
  const product = products[active] ?? products[0];
  return <main>
    <section className="people-hero relative isolate overflow-hidden">
      <img src={heroTeam} alt="A diverse business team collaborating around laptops in a bright modern office" width={1920} height={1088} fetchPriority="high" className="hero-people absolute inset-0 h-full w-full object-cover" />
      <div className="hero-center relative z-10 mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">The intelligent business OS</p>
        <h1 className="mt-5 text-5xl font-semibold leading-[1.12] md:text-6xl">Xclatix.<br />Your entire business,<br /><span className="text-primary">working as one.</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Clients, projects, people, and billing. Bring it all together in one connected platform—without the everyday chaos.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild className="h-12 rounded-full px-7"><Link to="/demo">Request a demo <ArrowRight /></Link></Button><Button asChild variant="outline" className="h-12 rounded-full px-7 hover:bg-secondary"><Link to="/product">Explore Xclatix</Link></Button></div>
        <p className="mt-5 text-xs text-muted-foreground">Built around your business. Connected across your teams.</p>
      </div>
    </section>
    <section className="border-y border-border bg-card"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-7">{products.map(p => <Link key={p.id} to="/product/$module" params={{module: p.id}} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"><p.icon className="size-5 text-primary" />{p.label}</Link>)}</div></section>
    <section className="relative overflow-hidden py-20"><OperationsBackground /><div className="relative mx-auto max-w-6xl px-6"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Less switching. More doing.</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Every part of your business.<br />Finally on the same page.</h2><p className="mt-5 text-lg text-muted-foreground">A client promise should not get lost between sales, delivery, and finance. Keep the work—and the people behind it—connected.</p></div>
    <div role="tablist" aria-label="Xclatix capabilities" className="mt-10 flex flex-wrap justify-center gap-2">{products.map((p,i) => <Button key={p.id} role="tab" aria-selected={active === i} aria-controls="capability-panel" id={`tab-${p.id}`} variant={active === i ? "default" : "outline"} className="rounded-full hover:bg-secondary hover:text-foreground" onClick={() => setActive(i)}><p.icon />{p.label}</Button>)}</div>
    <div id="capability-panel" role="tabpanel" aria-labelledby={`tab-${product.id}`} className="mt-10 grid items-center gap-12 lg:grid-cols-2"><div><h3 className="text-3xl font-semibold leading-tight">{product.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{product.intro}</p><ul className="mt-6 space-y-3">{product.benefits.map(b => <li key={b} className="flex gap-3 text-sm"><Check className="size-5 shrink-0 text-accent" />{b}</li>)}</ul><Button asChild variant="link" className="mt-6 px-0"><Link to="/product/$module" params={{module: product.id}}>Discover {product.label} <ArrowRight /></Link></Button></div><div className="overflow-hidden rounded-lg border border-border bg-card shadow-menu"><div className="flex items-center justify-between border-b border-border px-5 py-4"><span className="font-semibold">Xclatix / {product.label}</span><span className="text-xs text-muted-foreground">Connected workspace</span></div><div className="p-6"><p className="text-xs uppercase tracking-widest text-muted-foreground">Client engagement</p><h4 className="mt-2 text-xl font-semibold">Acme project rollout</h4><div className="mt-6 space-y-3">{product.workflow.map((step,i) => <div key={step} className="flex items-center gap-4 rounded-md border border-border p-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-sm text-primary">{i+1}</span><span className="flex-1 text-sm font-medium">{step}</span><Check className="size-4 text-accent" /></div>)}</div><div className="mt-5 border-t border-border pt-5 text-xs text-muted-foreground">Sales → Delivery → People → Finance</div><p className="mt-3 text-xs text-muted-foreground">Illustrative workspace</p></div></div></div></div></section>
    <BusinessSolutions /><OperationalPractices />
    <section className="border-t border-border bg-card py-20"><div className="mx-auto max-w-6xl px-6"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-widest text-primary">From first conversation to final invoice</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold">One connected journey.</h2></div><Button asChild variant="link"><Link to="/why-xclatix">Why Xclatix <ArrowRight /></Link></Button></div><div className="mt-10 grid gap-7 md:grid-cols-4">{[["01","Win the relationship","Preserve client needs and agreed scope in CRM."],["02","Deliver the work","Connect tasks, responsibility, and project progress."],["03","Bring people together","Keep HR context and team conversations alongside work."],["04","Close the loop","Coordinate delivery and billing with finance."]].map(([n,title,text]) => <article key={n} className="border-t border-border pt-6"><span className="text-2xl font-semibold text-primary">{n}</span><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div></div></section>
    <WorkflowAdvisor />
    <section className="border-t border-border bg-secondary py-20 text-center"><div className="mx-auto max-w-3xl px-6"><h2 className="text-4xl font-semibold leading-tight md:text-5xl">Bring your business together.</h2><p className="mt-5 text-lg text-muted-foreground">See how Xclatix can connect the way your team works.</p><Button asChild className="mt-8 h-12 rounded-full px-8"><Link to="/demo">Request your guided demo <ChevronRight /></Link></Button></div></section>
  </main>;
}
