import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { demoInput } from "@/lib/demo-input";

export const requestDemo = createServerFn({ method: "POST" })
  .inputValidator(demoInput)
  .handler(async ({ data }) => {
    const request = getRequest();
    if (request.headers.get("origin") !== new URL(request.url).origin) {
      return { ok: false, error: "Please submit your request from the Xclatix website." };
    }
    if (data.website) return { ok: false, error: "Unable to submit this request." };

    try {
      console.info("Demo request received for Xclatix:", {
        name: data.name,
        email: data.email,
        company: data.company,
        businessType: data.businessType,
        challenges: data.challenges,
        submittedAt: new Date().toISOString(),
      });

      return { ok: true, error: null };
    } catch {
      return { ok: false, error: "Demo requests are temporarily unavailable. Please try again later." };
    }
  });