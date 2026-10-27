import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, ArrowRight, LoaderCircle } from "lucide-react";
import { demoInput, type DemoInput } from "@/lib/demo-input";
import { solutions } from "@/lib/business-solutions";
import { requestDemo } from "@/lib/demo.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function DemoForm({ businessType = "other", headingLevel = "h2" }: { businessType?: DemoInput["businessType"]; headingLevel?: "h1" | "h2" }) {
  const Title: "h1" | "h2" = headingLevel;
  const ResultTitle: "h2" | "h3" = headingLevel === "h1" ? "h2" : "h3";
  const submitDemo = useServerFn(requestDemo);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const parsed = demoInput.safeParse(Object.fromEntries(form.entries()));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }
    setBusy(true); setError("");
    try {
      const result = await submitDemo({ data: parsed.data });
      if (result.ok) setSuccess(true);
      else setError(result.error ?? "Please try again.");
    } catch { setError("We couldn't save your request. Please try again."); }
    finally { setBusy(false); }
  }
  return (
    <section id="demo" className="scroll-mt-32 border-t border-border bg-secondary/40 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Let's talk about your business</p>
          <Title className="mt-4 text-4xl font-bold leading-tight">Request a Xclatix demo.</Title>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Tell us about your team and where work gets stuck. Start a conversation about a connected approach to your operations.</p>
          <p className="mt-8 text-sm text-muted-foreground">Your details are saved for the Xclatix team to review.</p>
        </div>
        {success ? (
          <div role="status" className="self-start border-l-2 border-accent pl-6 py-4">
            <Check className="size-7 text-accent" aria-hidden="true" />
            <ResultTitle className="mt-4 text-2xl font-bold">Demo request received.</ResultTitle>
            <p className="mt-3 text-muted-foreground">Your request has been saved for the Xclatix team to review.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="demo-name">Full name</Label><Input id="demo-name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div>
              <div className="space-y-2"><Label htmlFor="demo-email">Work email</Label><Input id="demo-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="demo-company">Company</Label><Input id="demo-company" name="company" autoComplete="organization" required minLength={2} maxLength={200} /></div>
            <div className="space-y-2">
              <Label htmlFor="demo-business">Business type</Label>
              <select id="demo-business" name="businessType" defaultValue={businessType} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {solutions.map((solution) => <option key={solution.id} value={solution.id}>{solution.label}</option>)}
                <option value="other">Other business</option>
              </select>
            </div>
            <div className="space-y-2"><Label htmlFor="demo-challenges">What would you like to improve? <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="demo-challenges" name="challenges" maxLength={3000} rows={4} /></div>
            <div hidden aria-hidden="true"><label htmlFor="demo-website">Website</label><input id="demo-website" name="website" tabIndex={-1} autoComplete="off" /></div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" size="lg" disabled={busy} className="h-12">{busy ? <><LoaderCircle className="animate-spin" aria-hidden="true" />Saving request…</> : <>Request demo <ArrowRight aria-hidden="true" /></>}</Button>
          </form>
        )}
      </div>
    </section>
  );
}