import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/site-content";

export function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="border-b border-border bg-secondary/40"><div className="mx-auto max-w-6xl px-6 py-16 md:py-20"><p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{intro}</p><Button asChild className="mt-8 h-12 rounded-full px-7"><Link to="/demo">Request a demo <ArrowRight /></Link></Button></div></section>;
}
export function ProductDirectory() {
  return <section className="mx-auto max-w-6xl px-6 py-16"><h2 className="text-3xl font-semibold">One business. Connected capabilities.</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{products.map(p => <article key={p.id} className="rounded-lg border border-border bg-card p-7"><p.icon className="size-7 text-primary" /><h3 className="mt-5 text-xl font-semibold">{p.label}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.intro}</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/product/$module" params={{ module: p.id }}>Explore {p.label} <ArrowRight /></Link></Button></article>)}</div></section>;
}
export function ProductDetail({ product }: { product: typeof products[number] }) {
  return <main><PageIntro eyebrow={product.label} title={product.title} intro={product.intro} /><section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2"><div><h2 className="text-3xl font-semibold">Work with the full picture.</h2><p className="mt-5 leading-relaxed text-muted-foreground">{product.detail}</p><ul className="mt-7 space-y-4">{product.benefits.map(b => <li key={b} className="flex gap-3"><Check className="size-5 shrink-0 text-accent" />{b}</li>)}</ul></div><div><h2 className="text-3xl font-semibold">A connected way to work</h2><ol className="mt-5">{product.workflow.map((step, i) => <li key={step} className="flex items-center gap-5 border-b border-border py-6"><span className="font-display text-2xl text-primary">0{i + 1}</span><h3 className="text-lg font-medium">{step}</h3></li>)}</ol><Button asChild variant="link" className="mt-5 px-0"><Link to="/solutions">Find your industry <ArrowRight /></Link></Button></div></section><ProductDirectory /></main>;
}