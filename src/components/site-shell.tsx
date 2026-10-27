import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionControl } from "@/components/motion-control";
import { products, resources, platformPages } from "@/lib/site-content";
import { solutions } from "@/lib/business-solutions";
import xclatixLogo from "@/assets/xclatix-brand-logo.png";
import bitwordsLogo from "@/assets/bitwords-logo-clear.png.asset.json";

const menus = ["Product", "Platform", "Industries", "About", "Resources"];

function MenuContent({ name, close }: { name: string; close: () => void }) {
  const linkClass = "group flex items-start gap-3 rounded-md p-3 text-sm transition-colors hover:bg-secondary focus-visible:outline-primary";
  if (name === "Product") return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{["Business operations", "Communications", "People management", "Add-ons"].map(group => <div key={group}><p className="px-3 pb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group}</p>{products.filter(p => p.group === group).map(p => <Link onClick={close} key={p.id} to="/product/$module" params={{ module: p.id }} className={linkClass}><p.icon className="mt-0.5 size-5 shrink-0 text-primary" /><div><span className="font-semibold">{p.label}</span><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.intro}</p></div></Link>)}</div>)}</div>;
  if (name === "Industries") return <div className="grid gap-2 md:grid-cols-3">{solutions.map(s => <Link onClick={close} key={s.id} to="/solutions/$business" params={{ business: s.id }} className={linkClass}><s.icon className="size-5 shrink-0 text-primary" /><span className="font-semibold">{s.label}</span></Link>)}<Link onClick={close} to="/solutions" className={linkClass}>All industries <ArrowRight className="size-4" /></Link></div>;
  if (name === "Platform") return <div className="grid gap-3 md:grid-cols-3">{platformPages.map(p => <Link onClick={close} key={p.id} to="/platform/$topic" params={{ topic: p.id }} className={linkClass}><p.icon className="size-5 shrink-0 text-primary" /><div><span className="font-semibold">{p.label}</span><p className="mt-2 text-xs text-muted-foreground">{p.intro}</p></div></Link>)}</div>;
  if (name === "Resources") return <div className="grid gap-3 md:grid-cols-2">{resources.map(r => <Link onClick={close} key={r.id} to="/resources/$topic" params={{ topic: r.id }} className={linkClass}><r.icon className="size-5 shrink-0 text-primary" /><div><span className="font-semibold">{r.label}</span><p className="mt-1 text-xs text-muted-foreground">{r.intro}</p></div></Link>)}</div>;
  return <div className="grid gap-3 md:grid-cols-3"><Link onClick={close} to="/about" className={linkClass}>About Xclatix <ArrowRight className="size-4" /></Link><Link onClick={close} to="/why-xclatix" className={linkClass}>Why Xclatix <ArrowRight className="size-4" /></Link><Link onClick={close} to="/contact" className={linkClass}>Contact us <ArrowRight className="size-4" /></Link><Link onClick={close} to="/auth" className={linkClass}>Team inbox <ArrowRight className="size-4" /></Link></div>;
}

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const close = () => { setOpen(null); setMobile(false); };
  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(null); setMobile(false); } };
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  return <header ref={header} className="sticky top-0 z-50 border-b border-border bg-card">
    <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-6">
      <Link to="/" aria-label="Xclatix home" onClick={close} className="flex items-center"><img src={xclatixLogo} alt="Xclatix" className="h-20 md:h-[84px] w-auto object-contain transition-transform hover:scale-105" /></Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">{menus.map(name => <Button key={name} variant="ghost" className={`px-3 hover:bg-secondary hover:text-foreground ${open === name ? "bg-secondary" : ""}`} aria-expanded={open === name} aria-controls="site-mega-menu" onClick={() => setOpen(open === name ? null : name)}>{name}<ChevronDown className={`size-3 transition-transform ${open === name ? "rotate-180" : ""}`} /></Button>)}<Button asChild variant="ghost" className="hover:bg-secondary hover:text-foreground"><Link to="/pricing" onClick={close}>Pricing</Link></Button></nav>
      <div className="flex items-center gap-3"><Button asChild variant="outline" className="hidden rounded-full sm:inline-flex hover:bg-secondary"><a href="https://bitwords.com/products/">Explore Bitwords</a></Button><Button asChild className="rounded-full px-5"><Link to="/demo" onClick={close}>Request a demo</Link></Button><Button size="icon" variant="ghost" aria-label={mobile ? "Close navigation" : "Open navigation"} aria-expanded={mobile} className="lg:hidden" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</Button></div>
    </div>
    {open && !mobile && <div id="site-mega-menu" className="absolute inset-x-0 top-full hidden border-b border-border bg-card shadow-menu lg:block"><div className="mx-auto max-w-6xl px-6 py-8"><MenuContent name={open} close={close} /></div></div>}
    {mobile && <nav aria-label="Mobile navigation" className="max-h-[calc(100dvh-96px)] overflow-y-auto border-t border-border px-6 py-4 lg:hidden">{menus.map(name => <div key={name} className="border-b border-border"><Button variant="ghost" className="h-12 w-full justify-between hover:bg-secondary" aria-expanded={open === name} onClick={() => setOpen(open === name ? null : name)}>{name}<ChevronDown /></Button>{open === name && <div className="py-3"><MenuContent name={name} close={close} /></div>}</div>)}<Button asChild variant="ghost" className="mt-2 w-full justify-start"><Link to="/pricing" onClick={close}>Pricing</Link></Button></nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-card"><div className="mx-auto max-w-7xl px-6 py-14"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5"><div><Link to="/" aria-label="Xclatix home"><img src={xclatixLogo} alt="Xclatix" className="h-20 w-auto object-contain" /></Link><p className="mt-4 text-sm text-muted-foreground">Your entire business. Connected.</p></div><div><h2 className="text-sm font-semibold">Product</h2><div className="mt-5 space-y-3">{products.map(p => <Link key={p.id} to="/product/$module" params={{ module: p.id }} className="block text-sm text-muted-foreground hover:text-primary">{p.label}</Link>)}</div></div><div><h2 className="text-sm font-semibold">Industries</h2><div className="mt-5 space-y-3">{solutions.map(s => <Link key={s.id} to="/solutions/$business" params={{ business: s.id }} className="block text-sm text-muted-foreground hover:text-primary">{s.label}</Link>)}</div></div><div><h2 className="text-sm font-semibold">Company</h2><div className="mt-5 space-y-3"><Link to="/about" className="block text-sm text-muted-foreground">About Xclatix</Link><Link to="/why-xclatix" className="block text-sm text-muted-foreground">Why Xclatix</Link><Link to="/pricing" className="block text-sm text-muted-foreground">Pricing</Link><Link to="/contact" className="block text-sm text-muted-foreground">Contact</Link></div></div><div><h2 className="text-sm font-semibold">Resources</h2><div className="mt-5 space-y-3">{resources.map(r => <Link key={r.id} to="/resources/$topic" params={{ topic: r.id }} className="block text-sm text-muted-foreground hover:text-primary">{r.label}</Link>)}</div></div></div><div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8"><a href="https://bitwords.com/products/" className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span>A product of the Bitwords products family</span><img src={bitwordsLogo.url} alt="Bitwords" className="h-auto w-32 object-contain" /></a><MotionControl /><p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Xclatix</p></div></div></footer>;
}