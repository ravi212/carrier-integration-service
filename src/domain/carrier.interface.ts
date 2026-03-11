import { RateRequest } from "./rate-request"
import { RateQuote } from "./rate-quote"

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>
}