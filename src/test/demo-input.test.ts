import { describe, expect, it } from "vitest";
import { demoInput } from "@/lib/demo-input";

const valid = { name: "Sample Visitor", email: "visitor@example.com", company: "Sample Company", businessType: "services", challenges: "", website: "" };
describe("Demo request validation", () => {
  it("accepts each of the six business types", () => {
    for (const businessType of ["services", "agencies", "bpo", "technology", "field", "locations"]) {
      expect(demoInput.safeParse({ ...valid, businessType }).success).toBe(true);
    }
  });
  it("rejects invalid email addresses", () => {
    expect(demoInput.safeParse({ ...valid, email: "invalid" }).success).toBe(false);
  });
  it("rejects unsupported business types", () => {
    expect(demoInput.safeParse({ ...valid, businessType: "invented" }).success).toBe(false);
  });
  it("rejects excessive input", () => {
    expect(demoInput.safeParse({ ...valid, challenges: "x".repeat(3001) }).success).toBe(false);
  });
});