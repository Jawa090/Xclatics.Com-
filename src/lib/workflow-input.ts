import { z } from "zod";
export const workflowInput = z.object({
  business: z.string().trim().min(2).max(200),
  challenges: z.string().trim().min(10).max(3000),
});