import { Carrier } from "../domain/carrier.interface"
import { UPSCarrier } from "./ups/ups.carrier"

export type CarrierType = "UPS"

export function getCarrier(type: CarrierType): Carrier {
  switch (type) {
    case "UPS":
      return new UPSCarrier()
    default:
      throw new Error(`Unsupported carrier: ${type}`)
  }
}