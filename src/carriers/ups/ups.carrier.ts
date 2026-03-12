import { Carrier } from "../../domain/carrier.interface"
import { RateRequest } from "../../domain/rate-request"
import { RateQuote } from "../../domain/rate-quote"
import { UPSAuthService } from "./ups.auth"
import { UPSRateClient } from "./ups.client"
export class UPSCarrier implements Carrier {
  private authService = new UPSAuthService();
  private client = new UPSRateClient();

  async getRates(request: RateRequest): Promise<RateQuote[]> {

    const token = await this.authService.getToken()
    const response = await this.client.getRates(token, request)

    console.log("UPS Raw Response:", response)
    console.log("UPS Token:", token)
    console.log("Fetching UPS rates for:", request)

    return []
  }
}