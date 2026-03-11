import { Carrier } from "../../domain/carrier.interface"
import { RateRequest } from "../../domain/rate-request"
import { RateQuote } from "../../domain/rate-quote"

export class UPSCarrier implements Carrier {

  async getRates(request: RateRequest): Promise<RateQuote[]> {

    // In later modules this will:
    // 1. Authenticate with UPS
    // 2. Build UPS request payload
    // 3. Call UPS API
    // 4. Map response to RateQuote[]

    console.log("Fetching UPS rates for:", request)

    return []
  }
}