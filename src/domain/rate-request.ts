import { Address } from "./address"
import { Package } from "./package"

export interface RateRequest {
  origin: Address
  destination: Address
  package: Package
  serviceLevel?: string
}