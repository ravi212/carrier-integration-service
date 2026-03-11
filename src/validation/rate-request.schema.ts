import { z } from "zod"
import { AddressSchema } from "./address.schema"
import { PackageSchema } from "./package.schema"

export const RateRequestSchema = z.object({
  origin: AddressSchema,
  destination: AddressSchema,
  package: PackageSchema,
  serviceLevel: z.string().optional()
})