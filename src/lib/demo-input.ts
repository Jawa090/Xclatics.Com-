import { z } from "zod";

export const businessTypes = ["services", "agencies", "bpo", "technology", "field", "locations", "other"] as const;
export const demoInput = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((value) => value.toLowerCase()),
  company: z.string().trim().min(2, "Enter your company name.").max(200),
  businessType: z.enum(businessTypes),
  challenges: z.string().trim().max(3000, "Keep your description under 3,000 characters."),
  website: z.string().max(200).default(""),
}).strict();
export type DemoInput = z.infer<typeof demoInput>;