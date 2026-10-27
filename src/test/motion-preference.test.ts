import { describe, expect, it } from "vitest";
import { resolveReducedMotion } from "@/lib/motion-preference";
describe("Reduced motion", () => {
  it("uses device preference by default", () => { expect(resolveReducedMotion(null, true)).toBe(true); expect(resolveReducedMotion(null, false)).toBe(false); });
  it("lets visitors request a static background", () => { expect(resolveReducedMotion(true, false)).toBe(true); });
});