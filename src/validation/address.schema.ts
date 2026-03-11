import { z } from "zod"

export const AddressSchema = z.object({
  country: z.string().min(2),
  postalCode: z.string().min(3),
  city: z.string().min(2),
  state: z.string().optional()
})