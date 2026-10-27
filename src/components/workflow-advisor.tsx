import { useEffect, useRef, useState } from "react";
import { Sparkles, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkflowAdvisor() {
  const [business, setBusiness] = useState("");
  const [challenges, setChallenges] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => () => abort.current?.abort(), []);
  async function recommend(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setAnswer(""); setError("");
    const controller = new AbortController(); abort.current = controller;
    try {
      const response = await fetch("/api/public/workflows", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ business, challenges }), signal: controller.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error ?? "The advisor is unavailable."); }
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No recommendations were returned.");
      const decoder = new TextDecoder(); let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n"); buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line);
          if (event.error) throw new Error(event.error);
          if (event.text) setAnswer(previous => previous + event.text);
        }
      }
    } catch (e) {
      setError(controller.signal.aborted ? "Stopped. You can request a new recommendation." : e instanceof Error ? e.message : "The advisor is unavailable.");
    } finally { setLoading(false); abort.current = null; }
  }
  return (
    <section id="advisor" className="border-t border-border py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-semibold uppercase text-primary">AI workflow advisor</p>
        <h2 className="mt-4 text-4xl font-bold">Your business. A clearer way to work.</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2">
          <form onSubmit={recommend} className="space-y-6">
            <div><label htmlFor="business-type" className="block text-sm font-semibold">Business type</label><input id="business-type" required minLength={2} maxLength={200} value={business} onChange={e => setBusiness(e.target.value)} placeholder="e.g. Professional services agency" className="mt-2 w-full rounded-md border border-input bg-card px-4 py-3 text-foreground" /></div>
            <div><label htmlFor="business-challenges" className="block text-sm font-semibold">Operational challenges</label><textarea id="business-challenges" required minLength={10} maxLength={3000} rows={6} value={challenges} onChange={e => setChallenges(e.target.value)} placeholder="Where do handoffs, projects, team coordination or invoicing get stuck?" className="mt-2 w-full resize-y rounded-md border border-input bg-card px-4 py-3 text-foreground" /></div>
            <p className="text-xs text-muted-foreground">AI-generated suggestions. Avoid sharing confidential or personal information.</p>
            <div className="flex gap-3"><Button type="submit" disabled={loading}><Sparkles />Recommend workflows</Button>{loading && <Button type="button" variant="outline" onClick={() => abort.current?.abort()}><Square />Stop</Button>}</div>
          </form>
          <div className="min-h-60 border-l border-border pl-6" aria-busy={loading}>
            <h3 className="text-xl font-semibold">Recommended workflows</h3>
            {loading && !answer && <p role="status" className="mt-6 text-muted-foreground">Considering your business challenges…</p>}
            {answer && <div className="mt-6 whitespace-pre-wrap text-sm leading-7">{answer}</div>}
            {!answer && !loading && !error && <Sparkles aria-hidden="true" className="mt-10 h-10 w-10 text-primary/40" />}
            {error && <p role="alert" className="mt-6 text-sm text-destructive">{error}</p>}
            {answer && !loading && <Button asChild variant="link" className="mt-6 px-0"><a href="https://bitwords.com/products/">Discuss your workflows →</a></Button>}
          </div>
        </div>
      </div>
    </section>
  );
}