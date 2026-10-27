import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { resolveReducedMotion } from "@/lib/motion-preference";

export function MotionControl() {
  const [override, setOverride] = useState<boolean | null>(null);
  const [device, setDevice] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDevice(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const reduced = resolveReducedMotion(override, device);
  useEffect(() => {
    document.documentElement.dataset['motion'] = reduced ? "reduced" : "full";
    return () => { delete document.documentElement.dataset['motion']; };
  }, [reduced]);
  return <label className="inline-flex items-center gap-3 text-sm text-muted-foreground"><Switch aria-label="Reduce motion" checked={reduced} onCheckedChange={setOverride} />Reduce motion</label>;
}